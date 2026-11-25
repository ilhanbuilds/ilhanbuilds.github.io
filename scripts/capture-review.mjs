/* global document, window */
import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';

const output = resolve(process.argv[2] ?? '.tools/PortfolioReview');
const baseURL = process.env.PORTFOLIO_PREVIEW_URL ?? 'http://127.0.0.1:4321';
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
const captures = [];
// Every content/error page is reviewed in both languages, themes and viewports.
for (const prefix of ['', '/en']) {
  for (const path of [
    '',
    'work/',
    'about/',
    ...[
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
    ].map((slug) => `work/${slug}/`),
    prefix ? '404/' : '404.html',
  ]) {
    const url = `${prefix}/${path}`;
    for (const [device, width, height] of [
      ['desktop', 1440, 1000],
      ['mobile', 390, 844],
    ]) {
      for (const theme of ['light', 'dark']) {
        if (
          !captures.some(
            (capture) =>
              capture[1] === url &&
              capture[2] === width &&
              capture[4] === theme,
          )
        ) {
          captures.push([
            `page-${prefix ? 'en' : 'tr'}-${path.replaceAll('/', '-').replace(/-$/, '') || 'home'}-${device}-${theme}`,
            url,
            width,
            height,
            theme,
          ]);
        }
      }
    }
  }
}
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
    for (const image of await page.locator('img:visible').all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate((element) => element.decode());
    }
    const demo = page.locator('[data-demo]');
    if (await demo.count()) {
      await demo.locator('[data-demo-host]').scrollIntoViewIfNeeded();
      await page.locator('[data-demo][data-loaded="true"]').waitFor();
      const kind = await demo.getAttribute('data-kind');
      const ready =
        kind === 'rubikrl'
          ? '.sticker'
          : kind === 'hcjeditor'
            ? '#html-code'
            : kind === 'calculator'
              ? '#display'
              : '#menu';
      await demo.frameLocator('iframe').locator(ready).first().waitFor();
    }
    // Full-document viewport makes Chromium paint off-screen opaque frames too.
    const fullHeight = await page.evaluate(
      () => document.documentElement.scrollHeight,
    );
    await page.setViewportSize({ width, height: fullHeight });
    await page.evaluate(
      () =>
        new Promise((resolve) =>
          window.requestAnimationFrame(() =>
            window.requestAnimationFrame(resolve),
          ),
        ),
    );
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
