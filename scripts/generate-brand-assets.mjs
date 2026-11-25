/* global document */
import { chromium } from '@playwright/test';
import { readFile, writeFile, mkdir } from 'node:fs/promises';

// Flat vector geometry follows the blue slash in the owner-approved wordmark.
const slash = '<path fill="#007aff" d="M34 10h10L24 54H14z"/>';
await mkdir('public/icons', { recursive: true });
await mkdir('public/branding', { recursive: true });
await writeFile(
  'public/icons/favicon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${slash}</svg>\n`,
);
const browser = await chromium.launch();
try {
  for (const [name, size] of [
    ['favicon-32', 32],
    ['apple-touch-icon', 180],
    ['icon-192', 192],
    ['icon-512', 512],
  ]) {
    const page = await browser.newPage({
      viewport: { width: size, height: size },
      deviceScaleFactor: 1,
    });
    await page.setContent(
      `<style>html,body{margin:0;background:#f5f4f0}svg{display:block;width:100vw;height:100vh}</style><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${slash}</svg>`,
    );
    await page.screenshot({ path: `public/icons/${name}.png` });
    await page.close();
  }
  const font = await readFile(
    'node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2',
  );
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.setContent(`<meta charset="utf-8"><style>
  @font-face{font-family:Manrope;src:url(data:font/woff2;base64,${font.toString('base64')}) format('woff2');font-weight:200 800}
  *{box-sizing:border-box}body{margin:0;background:#f5f4f0;color:#171717;font-family:Manrope,sans-serif;width:1200px;height:630px;padding:72px 80px;position:relative}
  body:before{content:'';position:absolute;right:0;top:0;width:320px;height:630px;background-image:linear-gradient(#deddd7 1px,transparent 1px),linear-gradient(90deg,#deddd7 1px,transparent 1px);background-size:40px 40px;opacity:.5}
  .logo{position:relative;font-size:88px;font-weight:800;letter-spacing:-.065em;line-height:1.2;display:flex;align-items:baseline}.slash{color:#007aff;font-size:1.2em;margin-right:.12em}.blue{color:#007aff}
  h1{font-size:44px;letter-spacing:-.035em;font-weight:550;margin:75px 0 16px}p{font-size:25px;color:#626262;margin:0}.bottom{position:absolute;left:80px;right:80px;bottom:52px;border-top:1px solid #deddd7;padding-top:24px;display:flex;justify-content:space-between;font-size:18px;color:#626262}
  </style><div class="logo"><span class="slash">/</span><span>ilhan<span class="blue">builds</span></span></div><h1>İlhan Kılıç</h1><p>Yazılım geliştirme · Yazılım testi</p><div class="bottom"><span>Projeler / Yolculuk / Hakkımda</span><span>ilhanbuilds.github.io</span></div>`);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: 'public/branding/og-image.png' });
  await page.close();
} finally {
  await browser.close();
}
await writeFile(
  'public/site.webmanifest',
  JSON.stringify(
    {
      name: 'ilhanbuilds',
      short_name: 'ilhanbuilds',
      icons: [
        { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      theme_color: '#f5f4f0',
      background_color: '#f5f4f0',
      display: 'browser',
    },
    null,
    2,
  ) + '\n',
);
console.log('Created slash icons and 1200 × 630 Open Graph image.');
