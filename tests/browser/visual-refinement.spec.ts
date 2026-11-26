import { test, expect } from '@playwright/test';

for (const theme of ['light', 'dark'] as const) {
  test(`project cards form a compact two-column desktop timeline and one mobile column in ${theme}`, async ({
    page,
  }) => {
    test.setTimeout(90_000);
    await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
    for (const prefix of ['', '/en'])
      for (const width of [360, 768, 1440, 1920]) {
        await page.setViewportSize({ width, height: 1000 });
        await page.goto(`${prefix}/work/`);
        await page.evaluate(() => document.fonts.ready);
        const main = await page.locator('main').boundingBox();
        expect(main!.width).toBeLessThanOrEqual(1200);
        for (const year of await page.locator('.chronology-year').all()) {
          const grid = year.locator('.chronology-cards');
          const columns = await grid.evaluate(
            (e) => getComputedStyle(e).gridTemplateColumns.split(' ').length,
          );
          expect(columns).toBe(width < 768 ? 1 : 2);
          const cards = grid.locator('.project-card');
          const first = await cards.first().boundingBox();
          if (width >= 768) {
            expect(first!.height).toBeLessThan(600);
            const heading = await year.locator('h2').boundingBox();
            expect(heading!.x + heading!.width).toBeLessThan(first!.x);
          }
          if ((await cards.count()) > 1) {
            const second = await cards.nth(1).boundingBox();
            expect(Math.abs(first!.width - second!.width)).toBeLessThan(1);
            if (width >= 768) {
              expect(Math.abs(first!.y - second!.y)).toBeLessThan(1);
              expect(Math.abs(first!.height - second!.height)).toBeLessThan(1);
              expect(second!.x).toBeGreaterThan(first!.x + first!.width);
            } else expect(second!.y).toBeGreaterThan(first!.y + first!.height);
          }
        }
        for (const summary of await page
          .locator('.project-card .project-summary')
          .all())
          expect((await summary.innerText()).length).toBeLessThanOrEqual(100);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
      }
    await page.locator('.project-card').first().hover();
    await expect(page.locator('.project-card').first()).toHaveCSS(
      'transform',
      'none',
    );
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('/');
    expect(
      (await page.locator('.primary-project').boundingBox())!.width,
    ).toBeGreaterThan(1200);
    await expect(page.locator('.primary-project img').first()).toHaveAttribute(
      'src',
      /overview\./,
    );
    await expect(page.locator('.project-cover figcaption')).toHaveCount(0);
    await page.goto('/work/deepfake-detection/');
    await expect(page.locator('[data-gallery], [data-demo], img')).toHaveCount(
      0,
    );
  });
}

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
      'rubikrl',
      'secureface',
      'dinocore',
      'deepfake-detection',
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
      await expect(cover.locator('figcaption')).toHaveCount(0);
      await expect(cover.locator('img')).toHaveAttribute(
        'alt',
        /tanıtım|promotional/i,
      );
    }
    await expect(
      page.locator('[data-project="deepfake-detection"] img'),
    ).toHaveAttribute('alt', /temsili|illustrative/i);
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
