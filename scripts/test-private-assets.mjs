import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import ts from 'typescript'

const root = fileURLToPath(new URL('../', import.meta.url))

// Read distinctive values without evaluating the private modules. Never log
// values or include them in assertion messages, including on a failed check.
export async function readPrivateJobMarkers() {
  const markers = new Set()
  for (const filename of ['lib/jobs.ts', 'lib/job-run-data.ts']) {
    const source = ts.createSourceFile(
      filename,
      await readFile(path.join(root, filename), 'utf8'),
      ts.ScriptTarget.Latest,
      true
    )
    function visit(node) {
      if (ts.isStringLiteral(node) && node.text.length >= 80) markers.add(node.text)
      ts.forEachChild(node, visit)
    }
    visit(source)
  }
  assert.ok(markers.size > 0, 'Private-data check requires source markers')
  return [...markers]
}

export function countPrivateValues(content, markers) {
  return markers.filter((value) => (
    content.includes(value) || content.includes(JSON.stringify(value).slice(1, -1))
  )).length
}

async function checkPrivateAssets() {
  // Exercise both plain and escaped string representations using public,
  // synthetic text before checking the real built artifacts.
  const synthetic = 'PRIVATE-ASSET-REGRESSION: "synthetic fixture"\nnever customer data'
  assert.equal(countPrivateValues(`prefix ${synthetic} suffix`, [synthetic]), 1)
  assert.equal(countPrivateValues(JSON.stringify(synthetic), [synthetic]), 1)
  assert.equal(countPrivateValues('public presentation code', [synthetic]), 0)

  const markers = await readPrivateJobMarkers()
  const staticRoot = path.join(root, '.next/static')
  let filesChecked = 0
  let matchingFiles = 0
  let privateValueMatches = 0

  async function walk(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const filename = path.join(directory, entry.name)
      if (entry.isDirectory()) {
        await walk(filename)
      } else if (entry.isFile()) {
        filesChecked += 1
        const count = countPrivateValues(await readFile(filename, 'utf8'), markers)
        if (count > 0) matchingFiles += 1
        privateValueMatches += count
      }
    }
  }

  await walk(staticRoot)
  assert.ok(filesChecked > 0, 'Build the application before checking private assets')
  console.log(JSON.stringify({ filesChecked, sourceMarkers: markers.length, matchingFiles, privateValueMatches }))
  assert.equal(matchingFiles, 0, 'Private job values must not appear in public static assets')

  const manifest = JSON.parse(await readFile(path.join(root, '.next/prerender-manifest.json'), 'utf8'))
  const privateRoutes = [...Object.keys(manifest.routes), ...Object.keys(manifest.dynamicRoutes)]
    .filter((route) => route === '/jobs' || route.startsWith('/jobs/'))
  assert.equal(privateRoutes.length, 0, 'Private job routes must not be prerendered')
  console.log('PASS: private job values absent from public assets; job routes rendered per request')
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  await checkPrivateAssets()
}
