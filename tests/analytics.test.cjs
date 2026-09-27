const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const ts = require('typescript')
require.extensions['.ts'] = (module, filename) => {
  module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, filename)
}
const { analyticsPath, redactAnalyticsUrl, engagementForLink } = require('../lib/analytics.ts')

test('only known public routes can be measured; private and arbitrary paths are excluded', () => {
  for (const path of ['/jobs', '/jobs/private-company', '/jobs.txt', '/lab', '/api/test', '/projects/apexhq', '/projects/unknown', '/contact?email=private']) {
    assert.equal(analyticsPath(path), null)
    assert.equal(engagementForLink('mailto:example@example.com', path), null)
  }
  assert.equal(analyticsPath('/projects/docify'), '/projects/docify')
})

test('analytics strips queries and fragments and rejects other origins and private paths', () => {
  assert.equal(redactAnalyticsUrl('https://james-c.app/projects/docify?private=value#secret'), 'https://james-c.app/projects/docify')
  for (const url of ['https://james-c.app/jobs?private=value', 'https://preview.vercel.app/projects/docify', 'https://james-c.app.evil.test/', 'not-a-url']) {
    assert.equal(redactAnalyticsUrl(url), null)
  }
})

test('click events report intent without email contents, destinations or completed-enquiry claims', () => {
  assert.deepEqual(engagementForLink('mailto:someone@example.com?subject=private', '/contact'), { name: 'email_link_click', page: '/contact' })
  assert.deepEqual(engagementForLink('/resume.pdf?private=value', '/about'), { name: 'cv_download_click', page: '/about' })
  assert.equal(engagementForLink('https://other.example/resume.pdf', '/'), null)
  assert.equal(engagementForLink('/contact', '/'), null)
})

test('the isolated tag accepts only a validated ID and known public page', () => {
  const { analyticsFrame } = require('../lib/analytics.ts')
  for (const [id, path] of [['G-TEST123456', '/jobs'], ['G-TEST123456', '/contact?private=secret'], ['</script>', '/']]) {
    assert.equal(analyticsFrame(id, path), '')
  }
  const html = analyticsFrame('G-TEST123456', '/projects/docify')
  assert.ok(html.includes('"send_page_view":false'))
  assert.ok(html.includes('"page_referrer":""'))
  assert.ok(html.includes("event.source !== parent"))
  assert.ok(!html.includes('location.href'))
})
