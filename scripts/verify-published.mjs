import { request } from '@playwright/test';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
const baseURL =
  process.env.PORTFOLIO_BASE_URL ?? 'https://ilhanbuilds.github.io';
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
const content = [
  '',
  'work/',
  'journey/',
  'about/',
  ...slugs.map((slug) => `work/${slug}/`),
];
const routes = [
  ...content.map((path) => `/${path}`),
  ...content.map((path) => `/en/${path}`),
  '/404.html',
  '/en/404/',
  ...content.map((path) => `/tr/${path}`),
  '/tr/404/',
];
const api = await request.newContext({ baseURL });
const evidence = {
  baseURL,
  verifiedAt: new Date().toISOString(),
  routes: [],
  assets: [],
  hashes: {},
};
const assets = new Set([
  '/icons/favicon.svg',
  '/icons/favicon-32.png',
  '/icons/apple-touch-icon.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/branding/og-image.png',
  '/site.webmanifest',
  '/robots.txt',
  '/sitemap-index.xml',
  '/sitemap-0.xml',
  '/documents/Ilhan_Kilic_CV_Portfolyo.pdf',
  '/documents/Ilhan_Kilic_CV_EN_Portfolyo.pdf',
]);
try {
  for (const route of routes) {
    const response = await api.get(route);
    assert.equal(response.status(), 200, route);
    const html = await response.text();
    assert.doesNotMatch(
      html,
      /github_pat_\w+|ghp_[A-Za-z0-9]{30,}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
    );
    if (!route.startsWith('/tr/')) assert.match(html, /ilhanbuilds/);
    for (const match of html.matchAll(
      /\/(?:_astro|icons|branding|documents)\/[A-Za-z0-9_.-]+\.(?:js|css|webp|png|svg|pdf)/g,
    ))
      assets.add(match[0]);
    evidence.routes.push({ path: route, status: response.status() });
  }
  for (const name of [
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
  ])
    assets.add(`/demos/${name}`);
  for (const path of assets) {
    const response = await api.get(path);
    assert.equal(response.status(), 200, path);
    const bytes = await response.body();
    evidence.assets.push({
      path,
      status: response.status(),
      bytes: bytes.length,
    });
    if (
      path.startsWith('/demos/') ||
      path.startsWith('/documents/') ||
      path.startsWith('/icons/') ||
      path === '/branding/og-image.png'
    ) {
      const local = await readFile(`public${path}`);
      const hash = createHash('sha256').update(bytes).digest('hex');
      assert.equal(
        hash,
        createHash('sha256').update(local).digest('hex'),
        path,
      );
      evidence.hashes[path] = hash;
    }
  }
  const og = await api.get('/branding/og-image.png');
  const png = await og.body();
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
  await mkdir('.tools', { recursive: true });
  await writeFile(
    '.tools/production-verification.json',
    JSON.stringify(evidence, null, 2) + '\n',
  );
  console.log(
    `Verified ${evidence.routes.length} HTML routes and ${evidence.assets.length} assets; CV/demo/icon hashes match the release source.`,
  );
} finally {
  await api.dispose();
}
