import { chromium } from '@playwright/test';
import { writeFile, mkdir } from 'node:fs/promises';

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
  // Social cards are owner-approved raster artwork under versioned paths.
  // This icon generator deliberately never regenerates or overwrites them.
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
console.log(
  'Created slash icons; approved social sharing images were left unchanged.',
);
