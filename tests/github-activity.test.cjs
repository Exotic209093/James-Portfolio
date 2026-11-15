const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const ts = require('typescript')

// Execute the real TypeScript module with Node's test runner; no extra test dependency.
require.extensions['.ts'] = (module, filename) => {
  const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  })
  module._compile(compiled.outputText, filename)
}
const { fetchLatestActivity } = require('../lib/github-activity.ts')

const event = (type, repo, created_at = '2026-11-14T10:00:00Z', extra = {}) => ({
  type, created_at, public: true, repo: { name: repo }, ...extra,
})
const respond = (events) => async () => Response.json(events)

test('the latest work event wins; stars and forks are skipped', async () => {
  const activity = await fetchLatestActivity(respond([
    event('WatchEvent', 'someone/else', '2026-11-15T09:00:00Z'),
    event('ForkEvent', 'someone/else', '2026-11-15T08:00:00Z'),
    event('PushEvent', 'Exotic209093/WaveLink', '2026-11-14T10:00:00Z'),
    event('PullRequestEvent', 'pingdotgg/t3code', '2026-11-13T10:00:00Z'),
  ]))
  assert.deepEqual(activity, {
    action: 'pushed to',
    repository: 'WaveLink',
    url: 'https://github.com/Exotic209093/WaveLink',
    at: '2026-11-14T10:00:00Z',
  })
})

test('upstream repositories keep their owner in the name', async () => {
  const activity = await fetchLatestActivity(respond([event('PullRequestEvent', 'pingdotgg/t3code')]))
  assert.equal(activity.repository, 'pingdotgg/t3code')
  assert.equal(activity.action, 'opened a pull request in')
})

test('no qualifying public event returns null instead of inventing one', async () => {
  assert.equal(await fetchLatestActivity(respond([])), null)
  assert.equal(await fetchLatestActivity(respond([event('WatchEvent', 'a/b')])), null)
  assert.equal(await fetchLatestActivity(respond([event('PushEvent', 'a/b', undefined, { public: false })])), null)
})

test('failed or malformed responses reject so a good cached value survives', async () => {
  await assert.rejects(fetchLatestActivity(async () => new Response('rate limited', { status: 403 })))
  await assert.rejects(fetchLatestActivity(respond([{ type: 'PushEvent', repo: { name: '../../evil' }, created_at: 'soon' }])))
})

test('requests only my public events feed and sends no credentials', async () => {
  let seen
  await fetchLatestActivity(async (url, init) => {
    seen = { url: String(url), headers: init.headers }
    return Response.json([])
  })
  assert.equal(seen.url, 'https://api.github.com/users/Exotic209093/events/public?per_page=30')
  assert.ok(!('Authorization' in seen.headers) && !('authorization' in seen.headers))
})
