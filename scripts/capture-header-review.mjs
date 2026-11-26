/* global document, window */
import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';

const output = resolve(process.argv[2] ?? '.tools/PortfolioReview');
const baseURL = process.env.PORTFOLIO_PREVIEW_URL ?? 'http://127.0.0.1:4321';
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
const captures = [];
async function decodeVisible(page) {
  for (const image of await page.locator('img').all()) {
    if (
      await image.evaluate((element) => {
        const bounds = element.getBoundingClientRect();
        return bounds.bottom > 0 && bounds.top < window.innerHeight;
      })
    )
      await image.evaluate((element) => element.decode());
  }
}
try {
  for (const locale of ['tr', 'en'])
    for (const theme of ['light', 'dark']) {
      for (const [device, width, height] of [
        ['desktop', 1440, 900],
        ['mobile', 390, 844],
      ]) {
        const page = await browser.newPage({
          viewport: { width, height },
          colorScheme: theme,
          reducedMotion: 'reduce',
        });
        await page.goto(`${baseURL}${locale === 'en' ? '/en' : ''}/work/`);
        await page.evaluate(() => document.fonts.ready);
        for (const state of ['top', 'middle', 'bottom']) {
          await page.evaluate(
            (state) =>
              window.scrollTo({
                top:
                  state === 'top'
                    ? 0
                    : state === 'middle'
                      ? document.documentElement.scrollHeight / 2
                      : document.documentElement.scrollHeight,
                behavior: 'instant',
              }),
            state,
          );
          await page.waitForFunction(
            (state) =>
              document
                .querySelector('[data-header-bar]')
                ?.getAttribute('data-compact') === String(state !== 'top'),
            state,
          );
          await decodeVisible(page);
          const name = `header-work-${locale}-${device}-${theme}-${state}`;
          await page.screenshot({ path: join(output, `${name}.png`) });
          captures.push({
            name,
            locale,
            theme,
            device,
            state,
            url: page.url(),
            width,
            height,
          });
        }
        await page.close();
      }
      const page = await browser.newPage({
        viewport: { width: 1440, height: 720 },
        colorScheme: theme,
        reducedMotion: 'reduce',
      });
      await page.goto(`${baseURL}${locale === 'en' ? '/en' : ''}/work/racker/`);
      await page.evaluate(() => document.fonts.ready);
      await decodeVisible(page);
      const name = `racker-product-${locale}-desktop-short-${theme}`;
      await page.screenshot({ path: join(output, `${name}.png`) });
      captures.push({
        name,
        locale,
        theme,
        device: 'desktop-short',
        state: 'top',
        url: page.url(),
        width: 1440,
        height: 720,
      });
      await page.close();
    }
  await writeFile(
    join(output, 'header-captures.json'),
    JSON.stringify(
      { capturedAt: new Date().toISOString(), baseURL, captures },
      null,
      2,
    ) + '\n',
  );
  await writeFile(
    join(output, 'header.html'),
    `<!doctype html><html lang="tr"><meta charset="utf-8"><title>v1.1.1 Header ve Racker incelemesi</title><style>body{font:16px system-ui;margin:32px;background:#f5f4f0}img{max-width:100%;max-height:700px;object-fit:contain;object-position:top}section{padding:20px;border-top:1px solid #ccc}</style><h1>Header ve Racker ilk görünüm</h1>${captures.map((item) => `<section><h2>${item.name}</h2><a href="${item.name}.png"><img src="${item.name}.png" alt="${item.name}" loading="lazy"></a></section>`).join('')}</html>`,
  );
  console.log(
    `Saved ${captures.length} header/product viewport screenshots from ${baseURL}.`,
  );
} finally {
  await browser.close();
}
