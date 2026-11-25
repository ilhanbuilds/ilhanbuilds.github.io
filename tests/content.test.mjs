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
    'bilekten',
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
  assert.equal(xml.includes('/journey/'), false);
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
    assert.ok(
      html.includes(
        `href="https://ilhanbuilds.github.io/${path === 'journey/' ? 'work/' : path}"`,
      ),
    );
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
      /https:\/\/github\.com\/ilhanbuilds\/(?:Racker["'/]|SecureFace|RubikRL|kutlumi|Bilekten)/i.test(
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
    'bilekten/phone-overview.webp',
    'bilekten/watch-controls.webp',
    'bilekten/watch-media.webp',
    'bilekten/watch-apps.webp',
    'bilekten/watch-camera.webp',
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
    ...(await files('src/assets/covers')),
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

test('only reviewed truthful promotional covers are imported; withheld face and claim artwork stays excluded', async () => {
  const approved = JSON.parse(
    await readFile('tests/fixtures/approved-covers.json', 'utf8'),
  );
  assert.deepEqual(
    (await readdir('src/assets/covers')).sort(),
    Object.keys(approved).sort(),
  );
  for (const [name, hash] of Object.entries(approved)) {
    const bytes = await readFile(`src/assets/covers/${name}`);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), hash, name);
    assert.equal(bytes.toString('ascii', 12, 16), 'VP8 ', name);
    assert.equal(bytes.readUInt16LE(26) & 0x3fff, 1440, name);
    assert.equal(bytes.readUInt16LE(28) & 0x3fff, 720, name);
  }
  for (const [path, target, lang] of [
    ['journey', '/work/', 'tr'],
    ['en/journey', '/en/work/', 'en'],
    ['tr/journey', '/work/', 'tr'],
  ]) {
    const html = await readFile(`dist/${path}/index.html`, 'utf8');
    assert.match(html, /name="robots" content="noindex"/);
    assert.ok(html.includes(`href="https://ilhanbuilds.github.io${target}"`));
    assert.ok(html.includes(`<html lang="${lang}">`));
    assert.ok(
      html.includes('location.search') && html.includes('location.hash'),
    );
  }
});

test('brand browser assets have exact dimensions and approved slash geometry', async () => {
  const svg = await readFile('public/icons/favicon.svg', 'utf8');
  assert.match(svg, /viewBox="0 0 64 64"/);
  assert.match(svg, /fill="#007aff"/);
  assert.doesNotMatch(svg, /IB|gradient|filter|image/);
  for (const [name, width, height] of [
    ['icons/favicon-32.png', 32, 32],
    ['icons/apple-touch-icon.png', 180, 180],
    ['icons/icon-192.png', 192, 192],
    ['icons/icon-512.png', 512, 512],
    ['branding/og-image.png', 1200, 630],
  ]) {
    const source = await readFile(`public/${name}`);
    assert.equal(source.subarray(1, 4).toString(), 'PNG');
    assert.equal(source.readUInt32BE(16), width);
    assert.equal(source.readUInt32BE(20), height);
    assert.deepEqual(await readFile(`dist/${name}`), source);
  }
  const manifest = JSON.parse(
    await readFile('public/site.webmanifest', 'utf8'),
  );
  assert.equal(manifest.name, 'ilhanbuilds');
  assert.deepEqual(
    manifest.icons.map((icon) => icon.sizes),
    ['192x192', '512x512'],
  );
});

test('interactive demos publish only reviewed static files and no accounts or model artifacts', async () => {
  const approved = [
    'calculator.css',
    'calculator.html',
    'calculator.js',
    'cube.html',
    'cube.js',
    'hcjeditor.html',
    'idleoyun.css',
    'idleoyun.engine.js',
    'idleoyun.html',
    'idleoyun.js',
  ];
  assert.deepEqual((await readdir('public/demos')).sort(), approved.sort());
  for (const name of approved) {
    assert.deepEqual(
      await readFile(`public/demos/${name}`),
      await readFile(`dist/demos/${name}`),
    );
    if (name.endsWith('.html'))
      assert.match(
        await readFile(`public/demos/${name}`, 'utf8'),
        /name="robots" content="noindex"/,
      );
  }
  for (const path of await files('dist')) {
    assert.doesNotMatch(path, /\.(?:pt|pth|onnx|sqlite|db|zip|enc)$/i);
    assert.doesNotMatch(path, /Oyuncular\.txt|\.env/i);
  }
});
