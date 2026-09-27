import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { createServer } from 'node:net'
import { readFile } from 'node:fs/promises'
import { setTimeout as delay } from 'node:timers/promises'
import { readPrivateJobMarkers, countPrivateValues } from './test-private-assets.mjs'

// Exercise the built server, including Next's route/proxy integration. These
// credentials are synthetic local fixtures and never read deployment secrets.
const fixtureUser = 'portfolio-qa'
const fixturePassword = 'synthetic-local-password'
const authorization = `Basic ${Buffer.from(`${fixtureUser}:${fixturePassword}`).toString('base64')}`
const privateMarkers = await readPrivateJobMarkers()
const buildId = (await readFile('.next/BUILD_ID', 'utf8')).trim()
const prerenderManifest = JSON.parse(await readFile('.next/prerender-manifest.json', 'utf8'))
assert.ok(prerenderManifest.routes['/opengraph-image'], 'Social image is generated at build time')
const edgeManifest = JSON.parse(await readFile('.next/server/middleware-manifest.json', 'utf8'))
assert.ok(!Object.keys(edgeManifest.functions).some((route) => route.includes('opengraph-image')), 'Social image must not produce an oversized Edge function')

async function withServer(password, check) {
  const reservation = createServer()
  await new Promise((resolve) => reservation.listen(0, '127.0.0.1', resolve))
  const { port } = reservation.address()
  await new Promise((resolve) => reservation.close(resolve))
  const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', String(port)], {
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1', JOBS_DASHBOARD_USER: fixtureUser, JOBS_DASHBOARD_PASSWORD: password },
    stdio: 'ignore',
  })
  const origin = `http://127.0.0.1:${port}`
  const request = (path, options = {}) => fetch(origin + path, { ...options, signal: AbortSignal.timeout(15000) })
  try {
    let ready = false
    for (let attempt = 0; attempt < 100; attempt++) {
      if (child.exitCode !== null) throw new Error('Production server exited during startup')
      try { ready = (await request('/resume.pdf')).ok } catch {}
      if (ready) break
      await delay(100)
    }
    assert.ok(ready, 'Production server started')
    await check(request)
  } finally {
    if (child.exitCode === null) {
      const exited = once(child, 'exit')
      child.kill('SIGTERM')
      await exited
    }
  }
}

async function assertLocked(request, headers = {}) {
  for (const path of ['/jobs', '/jobs/', '/jobs/unknown-qa-job', '/jobs/unknown-qa-job?_rsc=qa']) {
    const response = await request(path, { headers })
    assert.equal(response.status, 401, `${path} must require authentication`)
    assert.match(response.headers.get('www-authenticate'), /^Basic /)
    assert.match(response.headers.get('cache-control'), /private.*no-store/)
    const body = await response.text()
    assert.equal(countPrivateValues(body, privateMarkers), 0, 'Unauthenticated response contains no private values')
    assert.equal(body, 'Authentication required.')
  }
}

await withServer('', async (request) => {
  await assertLocked(request)
  await assertLocked(request, { authorization })
  console.log('PASS: absent password fails closed, including nested/RSC requests')
})

await withServer(fixturePassword, async (request) => {
  await assertLocked(request)
  await assertLocked(request, { authorization: 'Basic malformed' })
  await assertLocked(request, { authorization: `Basic ${Buffer.from('wrong:wrong').toString('base64')}` })
  await assertLocked(request, { 'x-middleware-subrequest': 'middleware:middleware:middleware:middleware:middleware', rsc: '1' })
  const dashboard = await request('/jobs', { headers: { authorization } })
  assert.equal(dashboard.status, 200)
  assert.match(dashboard.headers.get('cache-control'), /private.*no-store/)
  const dashboardHtml = await dashboard.text()
  assert.ok(countPrivateValues(dashboardHtml, privateMarkers) > 0, 'Authorized dashboard is a positive control for private-value detection')
  const jobRoute = dashboardHtml.match(/href="(\/jobs\/[^"?#]+)"/)?.[1]
  assert.ok(jobRoute, 'The dashboard contains a dynamic job route')
  const jobDetail = await request(jobRoute, { headers: { authorization } })
  assert.equal(jobDetail.status, 200)
  assert.match(jobDetail.headers.get('cache-control'), /private.*no-store/)
  assert.equal((await request('/jobs/unknown-qa-job', { headers: { authorization } })).status, 404)
  for (const path of ['/jobs.rsc', '/jobs.txt', '/jobs.html', `/_next/data/${encodeURIComponent(buildId)}/jobs.json`]) {
    const response = await request(path)
    assert.ok([401, 404].includes(response.status), 'Internal-looking route must not expose private data')
    assert.equal(countPrivateValues(await response.text(), privateMarkers), 0, 'Internal-looking route contains no private values')
  }
  for (const path of ['/', '/projects', '/projects/galacia-vault', '/galacia', '/contact', '/about', '/certifications']) {
    assert.equal((await request(path)).status, 200, path)
  }
  for (const path of ['/projects/unknown-qa-project', '/certifications/unknown-qa-certification', '/blog/unknown-qa-post']) {
    assert.equal((await request(path)).status, 404, path)
  }
  const certificates = await (await request('/certifications')).text()
  const certificateRoute = certificates.match(/href="(\/certifications\/[^"?#]+)"/)?.[1]
  assert.ok(certificateRoute, 'Published certification links are present')
  assert.equal((await request(certificateRoute)).status, 200)
  const pdf = await request('/resume.pdf')
  assert.equal(pdf.status, 200)
  assert.match(pdf.headers.get('content-type'), /application\/pdf/)
  assert.ok((await pdf.arrayBuffer()).byteLength > 1000)
  const socialImage = await request('/opengraph-image')
  assert.equal(socialImage.status, 200)
  assert.match(socialImage.headers.get('content-type'), /image\/png/)
  const socialImageBytes = Buffer.from(await socialImage.arrayBuffer())
  assert.ok(socialImageBytes.byteLength > 1000)
  assert.equal(socialImageBytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a')
  assert.equal(socialImageBytes.readUInt32BE(16), 1200)
  assert.equal(socialImageBytes.readUInt32BE(20), 630)
  console.log('PASS: configured authentication, public/dynamic routes and PDF download')
})
