import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory()
          ? files(join(dir, entry.name))
          : join(dir, entry.name),
      ),
    )
  ).flat();
}

test('build contains only the approved project routes in both languages', async () => {
  const slugs = [
    'idleoyun',
    'calculator',
    'hcjeditor',
    'dinocore',
    'kutlumi',
    'lina',
    'racker',
    'deepfake-detection',
    'secureface',
    'rubikrl',
  ];
  for (const base of ['dist/work', 'dist/tr/work']) {
    const dirs = (await readdir(base, { withFileTypes: true }))
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);
    assert.deepEqual(dirs.sort(), [...slugs].sort());
  }
});

test('published text and metadata exclude unapproved projects and secrets', async () => {
  const forbidden = [
    /pedisim/i,
    /kuduzllm/i,
    /bilekten/i,
    /github_pat_\w+/,
    /ghp_[a-zA-Z0-9]{30,}/,
    /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  ];
  const paths = await files('dist');
  for (const path of paths.filter((path) =>
    /\.(html|xml|js|json|txt|css)$/.test(path),
  )) {
    const text = await readFile(path, 'utf8');
    for (const pattern of forbidden)
      assert.equal(pattern.test(text), false, `${path}: ${pattern}`);
    assert.equal(
      /(?:href|src)=["'](?:undefined|null|#["'])/.test(text),
      false,
      path,
    );
  }
});

test('sitemap has all 28 indexable pages and excludes error pages', async () => {
  const xml = await readFile('dist/sitemap-0.xml', 'utf8');
  assert.equal((xml.match(/<loc>/g) ?? []).length, 28);
  assert.equal(xml.includes('404'), false);
  assert.ok(xml.includes('https://ilhanbuilds.github.io/tr/work/racker/'));
});

test('no analytics, trackers, remote fonts or private source links in HTML', async () => {
  for (const path of (await files('dist')).filter((path) =>
    path.endsWith('.html'),
  )) {
    const html = await readFile(path, 'utf8');
    assert.equal(
      /google-analytics|googletagmanager|fonts\.googleapis|plausible\.io|hotjar/.test(
        html,
      ),
      false,
      path,
    );
    assert.equal(
      /https:\/\/github\.com\/ilhanbuilds\/(?:Racker["'/]|SecureFace|RubikRL|kutlumi)/i.test(
        html,
      ),
      false,
      path,
    );
  }
});
