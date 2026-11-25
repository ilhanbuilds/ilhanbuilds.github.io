import { test, expect } from '@playwright/test';

test('Bilekten is newer than Racker, unpublished and paused with real media but no private source or simulated controller', async ({
  page,
}) => {
  for (const prefix of ['', '/en']) {
    await page.goto(`${prefix}/work/`);
    const titles = await page.locator('.project-card h3').allTextContents();
    expect(titles.indexOf('Bilekten') + 1).toBe(titles.indexOf('Racker'));
    await page.goto(`${prefix}/work/bilekten/`);
    await expect(page.locator('h1')).toHaveText('Bilekten');
    await expect(page.locator('.status')).toHaveText(
      prefix ? 'On hold' : 'Ara verildi',
    );
    await expect(page.locator('.detail-summary')).toContainText(
      prefix ? 'unpublished' : 'yayınlanmamış',
    );
    await expect(page.locator('.detail-technologies li')).toContainText([
      'Kotlin',
      'Jetpack Compose',
      'Wear OS',
    ]);
    await expect(
      page.locator('[data-gallery] .gallery-image-link'),
    ).toHaveCount(5);
    await expect(page.locator('[data-demo], iframe')).toHaveCount(0);
    await expect(
      page.locator('a[href*="github.com/ilhanbuilds/Bilekten"]'),
    ).toHaveCount(0);
    await expect(page.locator('.detail-links')).toContainText(
      prefix ? 'Private source' : 'Kapalı kaynak',
    );
  }
});

test('covers use a common complete 2:1 canvas, localized compositions and honest fallbacks', async ({
  page,
}) => {
  for (const prefix of ['', '/en']) {
    await page.goto(`${prefix}/work/`);
    await expect(page.locator('.project-cover')).toHaveCount(11);
    await expect(page.locator('#main-nav a[href$="/journey/"]')).toHaveCount(0);
    await expect(
      page.locator('.project-card[data-project="rubikrl"]'),
    ).toContainText(prefix ? 'In development' : 'Geliştiriliyor');
    for (const cover of await page.locator('.project-cover').all()) {
      await cover.scrollIntoViewIfNeeded();
      const geometry = await cover
        .locator('.cover-canvas')
        .evaluate((element) => {
          const bounds = element.getBoundingClientRect();
          const image = element.querySelector('img');
          return {
            ratio: bounds.width / bounds.height,
            fit: image ? getComputedStyle(image).objectFit : null,
          };
        });
      expect(geometry.ratio).toBeCloseTo(2, 2);
      if (geometry.fit) expect(geometry.fit).toBe('contain');
    }
    for (const slug of [
      'bilekten',
      'idleoyun',
      'calculator',
      'hcjeditor',
      'kutlumi',
      'lina',
    ]) {
      const cover = page.locator(`[data-project="${slug}"] .project-cover`);
      await expect(cover).toHaveAttribute('data-cover-kind', 'composition');
      await expect(cover.locator('img')).toHaveAttribute(
        'src',
        new RegExp(`${slug}${prefix ? '-en' : ''}\\.`),
      );
      await expect(cover.locator('figcaption')).toHaveText(
        prefix ? 'Promotional composition' : 'Tanıtım kompozisyonu',
      );
    }
    for (const slug of ['rubikrl', 'secureface', 'dinocore'])
      await expect(
        page.locator(`[data-project="${slug}"] .project-cover`),
      ).toHaveAttribute('data-cover-kind', 'screenshot');
    await expect(
      page.locator('[data-project="deepfake-detection"] img'),
    ).toHaveCount(0);
    await expect(
      page.locator('[data-project="deepfake-detection"] .project-cover'),
    ).toHaveAttribute('data-cover-kind', 'typography');
    await expect(page.locator('[data-project="racker"] img')).toHaveAttribute(
      'src',
      /overview\./,
    );
  }
});

test('all legacy Journey URLs preserve locale, query and fragment and leave the project timeline canonical', async ({
  page,
  browser,
  baseURL,
}) => {
  for (const [source, target, locale] of [
    ['/journey/', '/work/', 'tr'],
    ['/en/journey/', '/en/work/', 'en'],
    ['/tr/journey/', '/work/', 'tr'],
  ]) {
    await page.goto(`${source}?from=journey#projects-2024`);
    await expect(page).toHaveURL(`${target}?from=journey#projects-2024`);
    await expect(page.locator('html')).toHaveAttribute('lang', locale!);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://ilhanbuilds.github.io${target}`,
    );
    await expect(page.locator('.language')).toHaveAttribute(
      'href',
      locale === 'tr' ? '/en/work/' : '/work/',
    );
    await expect(page.locator('.project-card')).toHaveCount(11);
    expect(await page.evaluate(() => localStorage.getItem('locale'))).toBe(
      locale,
    );
  }
  if (!baseURL) throw new Error('Expected configured baseURL');
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
  });
  try {
    const noJS = await context.newPage();
    await noJS.goto('/en/journey/');
    await expect(noJS).toHaveURL('/en/work/');
    await expect(noJS.locator('html')).toHaveAttribute('lang', 'en');
  } finally {
    await context.close();
  }
});
