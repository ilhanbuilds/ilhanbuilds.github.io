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

test('published text and metadata exclude secrets', async () => {
  const forbidden = [
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

test('only reviewed local images are published without identifying metadata', async () => {
  const allowed = new Set([
    'idleoyun/menu.webp',
    'idleoyun/login.webp',
    'idleoyun/gameplay.webp',
    'idleoyun/market.webp',
    'idleoyun/upgrade.webp',
    'calculator/calculation.webp',
    'hcjeditor/live-preview.webp',
    'dinocore/gameplay.webp',
    'lina/dark-chat.webp',
    'lina/light-chat.webp',
    'lina/appearance.webp',
    'lina/welcome.webp',
    'rubikrl/solved-state.webp',
    'rubikrl/scrambled-state.webp',
    'rubikrl/interface.webp',
    'personal/portrait.webp',
    'racker/overview.webp',
    'racker/android-planning.webp',
    'racker/android-tracking.webp',
    'racker/wear-os.webp',
    'racker/logo.webp',
    'kutlumi/home.webp',
    'kutlumi/create.webp',
    'kutlumi/themes.webp',
    'kutlumi/envelopes.webp',
    'secureface/upload.webp',
    'secureface/anonymization.webp',
  ]);
  const actual = await files('src/assets/images');
  assert.deepEqual(
    actual
      .map((path) => path.replace(/\\/g, '/').replace('src/assets/images/', ''))
      .sort(),
    [...allowed].sort(),
  );
  for (const path of [
    ...actual,
    ...(await files('dist')).filter((path) => path.endsWith('.webp')),
  ]) {
    const data = await readFile(path);
    assert.equal(data.toString('ascii', 0, 4), 'RIFF', path);
    assert.equal(data.toString('ascii', 8, 12), 'WEBP', path);
    for (let offset = 12; offset + 8 <= data.length;) {
      const chunk = data.toString('ascii', offset, offset + 4);
      assert.equal(
        ['EXIF', 'XMP ', 'ICCP'].includes(chunk),
        false,
        `${path}: ${chunk}`,
      );
      const size = data.readUInt32LE(offset + 4);
      offset += 8 + size + (size % 2);
    }
  }
  assert.equal(
    (await files('public')).some((path) => /\.pdf$/i.test(path)),
    false,
    'Unapproved CV must stay outside public assets',
  );
});
