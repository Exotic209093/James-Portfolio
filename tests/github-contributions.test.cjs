const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const ts = require('typescript')

// Execute the real TypeScript loader with Node's test runner; no extra test dependency.
require.extensions['.ts'] = (module, filename) => {
  const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  })
  module._compile(compiled.outputText, filename)
}
const { fetchContributions, loadContributionFeeds } = require('../lib/github-contributions.ts')
const { contributionProjects, contributionsReviewedAt } = require('../lib/contributions.ts')
const project = contributionProjects[0]
const now = () => new Date('2026-09-14T12:00:00.000Z')
const item = (number, overrides = {}) => ({
  number, title: `Contribution ${number}`,
  html_url: `https://github.com/${project.repository}/pull/${number}`,
  state: 'open', draft: false, user: { login: 'Exotic209093' },
  updated_at: '2026-09-13T12:00:00Z', pull_request: { merged_at: null },
  ...overrides,
})
const response = (items, overrides = {}) => Response.json({
  total_count: items.length, incomplete_results: false, items, ...overrides,
})

test('new upstream PRs appear and existing titles/statuses update without a curated entry', async () => {
  const before = await fetchContributions(project, async () => response([item(9000)]), now)
  const after = await fetchContributions(project, async () => response([
    item(9001, { updated_at: '2026-09-14T11:00:00Z' }),
    item(9000, { title: 'Reviewed title', state: 'closed', pull_request: { merged_at: '2026-09-14T10:00:00Z' } }),
  ]), now)
  assert.equal(before.items[0].status, 'open')
  assert.deepEqual(after.items.map((pr) => pr.number), [9001, 9000])
  assert.equal(after.items[1].title, 'Reviewed title')
  assert.equal(after.items[1].status, 'merged')
  assert.equal(after.syncedAt, now().toISOString())
})

test('closed, merged and draft are distinct; a closed draft is closed', async () => {
  const result = await fetchContributions(project, async () => response([
    item(1, { state: 'closed' }),
    item(2, { state: 'closed', pull_request: { merged_at: '2026-09-14T10:00:00Z' } }),
    item(3, { draft: true }),
    item(4, { state: 'closed', draft: true }),
  ]), now)
  const states = Object.fromEntries(result.items.map((pr) => [pr.number, pr.status]))
  assert.deepEqual(states, { 1: 'closed', 2: 'merged', 3: 'draft', 4: 'closed' })
})

test('requests only the intended public upstream PRs and sends no credentials', async () => {
  await fetchContributions(project, async (url, options) => {
    assert.equal(url.origin, 'https://api.github.com')
    assert.equal(url.searchParams.get('q'), 'repo:pingdotgg/t3code author:Exotic209093 is:pr is:public')
    assert.equal(options.headers.Authorization, undefined)
    assert.ok(options.signal instanceof AbortSignal)
    return response([])
  }, now)
})

test('an empty successful search stays empty rather than resurrecting old contributions', async () => {
  const result = await loadContributionFeeds((p) => fetchContributions(p, async () => response([]), now))
  assert.ok(result.every((feed) => feed.source === 'github' && feed.items.length === 0))
})

test('a failed project falls back independently without mislabelling the saved date', async () => {
  const result = await loadContributionFeeds(async (p) => {
    if (p.id === project.id) throw new Error('rate limited')
    return fetchContributions(p, async () => response([]), now)
  })
  assert.equal(result[0].source, 'snapshot')
  assert.equal(result[0].syncedAt, `${contributionsReviewedAt}T00:00:00.000Z`)
  assert.ok(result[0].items.length > 0)
  assert.equal(result[1].source, 'github')
  assert.equal(result[1].syncedAt, now().toISOString())
})

for (const status of [403, 429, 500]) {
  test(`HTTP ${status} rejects instead of producing a cacheable empty success`, async () => {
    await assert.rejects(fetchContributions(project, async () => new Response('', { status }), now))
  })
}

test('partial or malformed results are rejected before entering the success cache', async () => {
  for (const result of [
    { total_count: 1, incomplete_results: true, items: [item(1)] },
    { total_count: 2, incomplete_results: false, items: [item(1)] },
    { total_count: 1, incomplete_results: false, items: [item(1, { pull_request: undefined })] },
    { total_count: 2, incomplete_results: false, items: [item(1), item(1)] },
  ]) {
    await assert.rejects(fetchContributions(project, async () => Response.json(result), now))
  }
})

test('unrelated authors, forks and unsafe links are rejected', async () => {
  for (const overrides of [
    { user: { login: 'someone-else' } },
    { html_url: 'https://github.com/Exotic209093/t3code/pull/1' },
    { html_url: 'https://example.com/pull/1' },
  ]) {
    await assert.rejects(fetchContributions(project, async () => response([item(1, overrides)]), now))
  }
})

test('the bounded recent feed retains the actual total for the overflow notice', async () => {
  const result = await fetchContributions(project, async () => response(
    Array.from({ length: 100 }, (_, i) => item(i + 1)), { total_count: 150 },
  ), now)
  assert.equal(result.items.length, 100)
  assert.equal(result.totalCount, 150)
})
