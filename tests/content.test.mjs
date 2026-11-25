import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

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
  for (const base of ['dist/work', 'dist/en/work', 'dist/tr/work']) {
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
  assert.equal(xml.includes('https://ilhanbuilds.github.io/tr/'), false);
  assert.ok(xml.includes('https://ilhanbuilds.github.io/en/work/racker/'));
});

test('approved CVs are byte-identical to the reviewed one-page phone-free originals', async () => {
  const approved = {
    'Ilhan_Kilic_CV_Portfolyo.pdf':
      '60d6a3bf3bc22cb599927dc81789ad7b9ed32dbbc85455751767d3d8b69192ce',
    'Ilhan_Kilic_CV_EN_Portfolyo.pdf':
      '870acbf5a2c0e6ba5c4625d6541ff8232944459445aa6e4beb98b1107c586b1e',
  };
  for (const [name, hash] of Object.entries(approved)) {
    for (const root of ['public', 'dist']) {
      const bytes = await readFile(`${root}/documents/${name}`);
      assert.equal(bytes.toString('ascii', 0, 5), '%PDF-');
      assert.equal(
        createHash('sha256').update(bytes).digest('hex'),
        hash,
        `${root}/${name}`,
      );
    }
  }
});

test('legacy Turkish routes are noindex aliases with canonical root destinations', async () => {
  for (const path of [
    '',
    'work/',
    'journey/',
    'about/',
    'work/racker/',
    'work/secureface/',
  ]) {
    const html = await readFile(`dist/tr/${path}index.html`, 'utf8');
    assert.match(html, /name="robots" content="noindex"/);
    assert.ok(html.includes(`href="https://ilhanbuilds.github.io/${path}"`));
    assert.ok(html.includes('location.search'));
    assert.ok(html.includes('location.hash'));
  }
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
  const pdfs = (await files('public'))
    .filter((path) => /\.pdf$/i.test(path))
    .map((path) => path.replace(/\\/g, '/'));
  assert.deepEqual(pdfs.sort(), [
    'public/documents/Ilhan_Kilic_CV_EN_Portfolyo.pdf',
    'public/documents/Ilhan_Kilic_CV_Portfolyo.pdf',
  ]);
});
