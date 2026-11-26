/* global document, window */
import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
const output = resolve(process.argv[2] ?? '.tools/PortfolioReview');
const baseURL = process.env.PORTFOLIO_PREVIEW_URL ?? 'http://127.0.0.1:4321';
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
const manifest = [];
try {
  for (const locale of ['tr', 'en'])
    for (const theme of ['light', 'dark'])
      for (const [device, width, height] of [
        ['desktop', 1440, 1000],
        ['mobile', 390, 844],
      ]) {
        for (const slug of [
          'idleoyun',
          'calculator',
          'hcjeditor',
          'rubikrl',
          'secureface',
          'racker',
          'bilekten',
        ]) {
          const name = `demo-${slug}-${locale}-${device}-${theme}`;
          const page = await browser.newPage({
            viewport: { width, height },
            colorScheme: theme,
            reducedMotion: 'reduce',
          });
          await page.goto(
            `${baseURL}${locale === 'en' ? '/en' : ''}/work/${slug}/`,
          );
          await page.evaluate(() => document.fonts.ready);
          if (['secureface', 'racker', 'bilekten'].includes(slug)) {
            await page
              .locator(
                slug === 'secureface' ? '[data-compare]' : '[data-sync-demo]',
              )
              .scrollIntoViewIfNeeded();
          } else {
            await page.locator('[data-demo-host]').scrollIntoViewIfNeeded();
            const frame = page.locator('.demo-frame').contentFrame();
            const ready =
              slug === 'rubikrl'
                ? '.sticker'
                : slug === 'hcjeditor'
                  ? '#html-code'
                  : slug === 'calculator'
                    ? '#display'
                    : '#menu';
            await frame.locator(ready).first().waitFor();
          }
          for (const image of await page.locator('img').all()) {
            if (await image.isVisible()) {
              await image.scrollIntoViewIfNeeded();
              await image.evaluate((element) => element.decode());
            }
          }
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
          manifest.push({ name, locale, theme, device, slug });
          await page.close();
        }
      }
  await writeFile(
    join(output, 'demo-captures.json'),
    JSON.stringify(manifest, null, 2) + '\n',
  );
  await writeFile(
    join(output, 'demos.html'),
    `<!doctype html><html lang="tr"><meta charset="utf-8"><title>v1.1 Demo incelemesi</title><style>body{font:16px system-ui;margin:40px;background:#f5f4f0}img{max-width:100%;max-height:650px;object-fit:contain;object-position:top}section{padding:20px;border-top:1px solid #ddd}</style><h1>Çalışan demolar / ön izlemeler</h1>${manifest.map((item) => `<section><h2>${item.name}</h2><a href="${item.name}.png"><img loading="lazy" src="${item.name}.png" alt="${item.name}"></a></section>`).join('')}</html>`,
  );
  console.log(`Saved ${manifest.length} open demo screenshots.`);
} finally {
  await browser.close();
}
