// Visual regression checks against the production build, in headless Chrome.
// Run `npm run build` first. Screenshots for review land in `.visual/`.
//
// These are behavioural assertions rather than pixel diffs, so they stay
// stable across font rendering differences:
// - no horizontal overflow and no console errors at desktop, laptop and phone sizes
// - the pinned exhibition centres each room on the page's content edge
// - the hero name finishes its render pass
// - the phone menu is an opaque, full-height sheet
// - the command palette opens with Ctrl K and closes with Escape
// - calm motion (reduced motion) turns the pinned exhibition off
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { createServer } from 'node:net'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'

const chromeCandidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean)
const chromePath = chromeCandidates.find((candidate) => existsSync(candidate))
if (!chromePath) {
  console.log('SKIP: no Chrome or Edge found. Set CHROME_PATH to run the visual checks.')
  process.exit(0)
}

const outDir = '.visual'
rmSync(outDir, { recursive: true, force: true })
mkdirSync(outDir, { recursive: true })

async function freePort() {
  const server = createServer()
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  const { port } = server.address()
  await new Promise((resolve) => server.close(resolve))
  return port
}

// ---------- production server ----------
const appPort = await freePort()
const app = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', String(appPort)], {
  env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' },
  stdio: 'ignore',
})
const base = `http://127.0.0.1:${appPort}`
for (let attempt = 0; attempt < 150; attempt++) {
  try { if ((await fetch(base)).ok) break } catch {}
  await delay(100)
}

// ---------- headless Chrome over the DevTools protocol ----------
const debugPort = await freePort()
const profile = join(tmpdir(), `portfolio-visual-${debugPort}`)
const chrome = spawn(chromePath, [
  '--headless=new', `--remote-debugging-port=${debugPort}`, `--user-data-dir=${profile}`,
  '--hide-scrollbars', '--no-first-run', '--no-default-browser-check', '--disable-extensions', 'about:blank',
], { stdio: 'ignore' })

let targets
for (let attempt = 0; attempt < 100 && !targets; attempt++) {
  try { targets = await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json() } catch { await delay(200) }
}
const socket = new WebSocket(targets.find((target) => target.type === 'page').webSocketDebuggerUrl)
await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject })

let nextId = 1
const pending = new Map()
const listeners = new Set()
let consoleErrors = []
socket.onmessage = (message) => {
  const data = JSON.parse(message.data)
  if (data.id && pending.has(data.id)) {
    const { resolve, reject } = pending.get(data.id)
    pending.delete(data.id)
    if (data.error) reject(new Error(JSON.stringify(data.error)))
    else resolve(data.result)
    return
  }
  if (data.method === 'Runtime.exceptionThrown') consoleErrors.push(data.params.exceptionDetails.exception?.description ?? data.params.exceptionDetails.text)
  if (data.method === 'Runtime.consoleAPICalled' && data.params.type === 'error') consoleErrors.push(data.params.args.map((arg) => arg.value ?? arg.description).join(' '))
  listeners.forEach((listener) => listener(data))
}
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = nextId++
  pending.set(id, { resolve, reject })
  socket.send(JSON.stringify({ id, method, params }))
})
const evaluate = async (expression) => {
  const { result, exceptionDetails } = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })
  if (exceptionDetails) throw new Error(exceptionDetails.exception?.description ?? exceptionDetails.text)
  return result.value
}

await send('Page.enable')
await send('Runtime.enable')

const viewports = {
  desktop: { width: 1440, height: 900, mobile: false },
  laptop: { width: 1024, height: 700, mobile: false },
  phone: { width: 390, height: 844, mobile: true },
}

async function open(path, viewport, { reducedMotion = false } = {}) {
  consoleErrors = []
  expectedWidth = viewport.width
  await send('Emulation.setDeviceMetricsOverride', { width: viewport.width, height: viewport.height, deviceScaleFactor: 1, mobile: viewport.mobile })
  await send('Emulation.setTouchEmulationEnabled', { enabled: viewport.mobile })
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: reducedMotion ? 'reduce' : 'no-preference' }] })
  const loaded = new Promise((resolve) => {
    const listener = (data) => { if (data.method === 'Page.loadEventFired') { listeners.delete(listener); resolve() } }
    listeners.add(listener)
  })
  await send('Page.navigate', { url: base + path })
  await loaded
  await evaluate('document.fonts.ready.then(() => true)')
  await delay(2800) // let the hero's render pass finish
}

async function screenshot(name) {
  const { data } = await send('Page.captureScreenshot', { format: 'jpeg', quality: 70 })
  writeFileSync(join(outDir, `${name}.jpg`), Buffer.from(data, 'base64'))
}

async function scrollTo(expression) {
  await evaluate(`window.scrollTo({ top: ${expression}, behavior: 'instant' }); true`)
  await delay(600)
}

// On a phone, content wider than the screen silently widens the layout
// viewport instead of scrolling, so compare against the requested width too.
let expectedWidth = 0
const overflow = () =>
  evaluate(`Math.max(document.documentElement.scrollWidth, window.innerWidth) - ${expectedWidth}`)
const failures = []
async function check(name, fn) {
  try {
    await fn()
    console.log(`PASS: ${name}`)
  } catch (error) {
    failures.push(name)
    console.log(`FAIL: ${name}\n  ${error.message.split('\n')[0]}`)
  }
}

try {
  for (const [label, viewport] of Object.entries(viewports)) {
    await open('/', viewport)

    await check(`${label}: hero name finishes its render pass`, async () => {
      const progress = await evaluate(`getComputedStyle(document.getElementById('hero-name')).getPropertyValue('--p').trim()`)
      assert.equal(progress, '100%')
    })
    await screenshot(`${label}-home-hero`)

    await check(`${label}: exhibition rooms line up with the header`, async () => {
      const pinned = await evaluate(`getComputedStyle(document.querySelector('#work [class*="stage"]')).position === 'sticky'`)
      assert.ok(pinned, 'the exhibition should pin when motion is allowed')
      const logoLeft = await evaluate(`document.querySelector('header a[href="/"]').getBoundingClientRect().left`)
      for (const room of [0, 1, 2, 3]) {
        await scrollTo(`(() => { const r = document.querySelector('#work [class*="runway"]'); return r.getBoundingClientRect().top + scrollY + (r.offsetHeight - innerHeight) * ${room} / 3 })()`)
        const artLeft = await evaluate(`document.querySelector('#work [data-room="${room}"] [class*="roomArt"]').getBoundingClientRect().left`)
        assert.ok(Math.abs(artLeft - logoLeft) <= 3, `room ${room}: art at ${artLeft.toFixed(1)}px, header at ${logoLeft.toFixed(1)}px`)
        await screenshot(`${label}-home-room${room}`)
      }
    })

    await check(`${label}: no horizontal overflow down the homepage`, async () => {
      for (const target of ['#history', '#company-community-title', '#merge']) {
        await scrollTo(`document.querySelector('${target}').getBoundingClientRect().top + scrollY - 80`)
        assert.ok((await overflow()) <= 0, `overflow at ${target}`)
        await screenshot(`${label}-home${target.replace(/[#-]/g, '_')}`)
      }
    })

    await check(`${label}: homepage has no console errors`, async () => {
      assert.deepEqual(consoleErrors, [])
    })
  }

  await open('/', viewports.phone)
  await check('phone: menu is an opaque full-height sheet', async () => {
    await evaluate(`document.getElementById('mobile-menu-toggle').click(); true`)
    await delay(400)
    const sheet = await evaluate(`(() => {
      const nav = document.getElementById('mobile-navigation')
      const rect = nav.getBoundingClientRect()
      return { background: getComputedStyle(nav).backgroundColor, bottom: rect.bottom }
    })()`)
    assert.match(sheet.background, /^rgb\(/, `background should be opaque, got ${sheet.background}`)
    assert.ok(sheet.bottom >= viewports.phone.height - 1, `sheet ends at ${sheet.bottom}px`)
    await screenshot('phone-menu')
  })

  await open('/', viewports.desktop)
  await check('desktop: Ctrl K opens the palette and Escape closes it', async () => {
    const press = (key, ctrlKey = false) => evaluate(`window.dispatchEvent(new KeyboardEvent('keydown', { key: '${key}', ctrlKey: ${ctrlKey}, bubbles: true })); true`)
    await press('k', true)
    await delay(400)
    assert.ok(await evaluate(`Boolean(document.querySelector('[role="dialog"][aria-modal="true"]'))`), 'palette did not open')
    assert.ok(await evaluate(`document.activeElement?.getAttribute('role') === 'combobox'`), 'focus should move to the search field')
    await screenshot('desktop-palette')
    await evaluate(`document.activeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); true`)
    await delay(300)
    assert.ok(!(await evaluate(`Boolean(document.querySelector('[role="dialog"][aria-modal="true"]'))`)), 'palette did not close')
  })

  await check('desktop: a showcase room switches between artwork and its real screenshot', async () => {
    await scrollTo(`(() => { const r = document.querySelector('#work [class*="runway"]'); return r.getBoundingClientRect().top + scrollY })()`)
    const view = () => evaluate(`document.querySelector('#work [data-room="0"] [data-view]').dataset.view`)
    assert.equal(await view(), 'art')
    await evaluate(`[...document.querySelectorAll('#work [data-room="0"] [aria-pressed]')].find((b) => b.getAttribute('aria-pressed') === 'false').click(); true`)
    await delay(500)
    assert.equal(await view(), 'evidence')
    await screenshot('desktop-room0-screenshot')
  })

  await open('/', viewports.desktop, { reducedMotion: true })
  await check('reduced motion: calm motion is on and the exhibition does not pin', async () => {
    assert.ok(await evaluate(`document.documentElement.classList.contains('calm-motion')`))
    assert.ok(await evaluate(`getComputedStyle(document.querySelector('#work [class*="stage"]')).position !== 'sticky'`))
    await scrollTo(`document.getElementById('work').getBoundingClientRect().top + scrollY`)
    await screenshot('desktop-calm-work')
  })

  for (const path of ['/projects', '/about', '/contact', '/open-source', '/projects/wave-link']) {
    for (const label of ['desktop', 'phone']) {
      await open(path, viewports[label])
      await check(`${label}: ${path} has no overflow or console errors`, async () => {
        assert.ok((await overflow()) <= 0, 'horizontal overflow')
        assert.deepEqual(consoleErrors, [])
      })
      await screenshot(`${label}-page${path.replaceAll('/', '_')}`)
    }
  }
} finally {
  socket.close()
  chrome.kill()
  app.kill('SIGTERM')
  await delay(500)
  try { rmSync(profile, { recursive: true, force: true }) } catch {}
}

console.log(`\nScreenshots saved to ${outDir}/`)
if (failures.length) {
  console.log(`${failures.length} visual check(s) failed`)
  process.exit(1)
}
