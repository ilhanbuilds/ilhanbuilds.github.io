/* global document, window */
import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';

const output = resolve(process.argv[2] ?? '.tools/PortfolioReview');
const baseURL = process.env.PORTFOLIO_PREVIEW_URL ?? 'http://127.0.0.1:4321';
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
const captures = [
  ['home-desktop-light', '/', 1440, 1000, 'light'],
  ['home-desktop-dark', '/', 1440, 1000, 'dark'],
  ['home-mobile-light', '/', 390, 844, 'light'],
  ['home-mobile-dark', '/', 390, 844, 'dark'],
  ['journey-desktop', '/journey/', 1440, 1000, 'light'],
  ['journey-mobile', '/journey/', 390, 844, 'light'],
  ['projects-desktop', '/work/', 1440, 1000, 'light'],
  ['racker-detail', '/work/racker/', 1440, 1000, 'light'],
  ['secureface-detail', '/work/secureface/', 1440, 1000, 'light'],
  ['about-desktop', '/about/', 1440, 1000, 'light'],
  ['home-en-desktop', '/en/', 1440, 1000, 'light'],
  ['home-en-mobile', '/en/', 390, 844, 'light'],
  ['about-en-desktop', '/en/about/', 1440, 1000, 'light'],
  ['racker-en-detail', '/en/work/racker/', 1440, 1000, 'light'],
];
const manifest = [];
try {
  for (const [name, path, width, height, colorScheme] of captures) {
    const page = await browser.newPage({
      viewport: { width, height },
      colorScheme,
      reducedMotion: 'reduce',
    });
    const response = await page.goto(`${baseURL}${path}`);
    if (response?.status() !== 200)
      throw new Error(`Preview did not serve ${path}`);
    await page.evaluate(() => document.fonts.ready);
    for (const image of await page.locator('img').all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate((element) => element.decode());
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: join(output, `${name}.png`),
      fullPage: true,
    });
    manifest.push({ name, path, width, height, colorScheme, fullPage: true });
    await page.close();
  }
  await writeFile(
    join(output, 'captures.json'),
    JSON.stringify(
      { capturedAt: new Date().toISOString(), baseURL, captures: manifest },
      null,
      2,
    ),
  );
  const items = manifest
    .map(
      (item) =>
        `<section><h2>${item.name}</h2><p>${item.path} · ${item.width}px · ${item.colorScheme}</p><a href="${item.name}.png"><img src="${item.name}.png" loading="lazy" alt="${item.name}"></a></section>`,
    )
    .join('');
  await writeFile(
    join(output, 'index.html'),
    `<!doctype html><html lang="tr"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Portfolio — Görsel inceleme</title><style>body{font:16px system-ui;margin:40px auto;max-width:1100px;padding:0 20px;background:#f5f4f0;color:#171717}section{border-top:1px solid #ddd;padding:25px 0}img{display:block;max-width:100%;max-height:700px;object-fit:contain;object-position:top;cursor:zoom-in}p{color:#626262}</style><h1>Portfolio — Görsel inceleme</h1><p>Tüm görüntüler gerçek Chromium tarayıcısından tam sayfa alındı. Tam boy incelemek için bir görsele tıklayın.</p>${items}</html>`,
  );
  console.log(`Saved ${manifest.length} full-page screenshots to ${output}`);
} finally {
  await browser.close();
}
