import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const theme of ['light', 'dark'] as const)
  for (const prefix of ['', '/en']) {
    test(`single compact header stays stable and accessible in ${prefix || 'tr'} ${theme}`, async ({
      page,
    }) => {
      test.setTimeout(120_000);
      await page.emulateMedia({
        colorScheme: theme,
        reducedMotion:
          theme === 'light' && !prefix ? 'no-preference' : 'reduce',
      });
      for (const width of [360, 390, 412, 768, 1024, 1440, 1920]) {
        await page.setViewportSize({ width, height: 800 });
        await page.goto(`${prefix}/work/`);
        await page.evaluate(() => document.fonts.ready);
        const header = page.locator('.site-header'),
          bar = page.locator('[data-header-bar]');
        await expect(page.getByRole('banner')).toHaveCount(1);
        const measure = () =>
          page.evaluate(() => ({
            main:
              document.querySelector('main')!.getBoundingClientRect().top +
              scrollY,
            height: document.documentElement.scrollHeight,
          }));
        const initial = await measure();
        for (const y of [0, 88, 94, 96, 90, 95, 95, 0]) {
          await page.evaluate(
            (y) => scrollTo({ top: y, behavior: 'instant' }),
            y,
          );
          await expect(bar).toHaveAttribute('data-compact', String(y > 92));
          await expect(header).toHaveCSS(
            'min-height',
            y > 92 ? '64px' : width < 768 ? '80px' : '104px',
          );
          expect((await header.boundingBox())!.y).toBe(0);
          const current = await measure();
          expect(current.main).toBeCloseTo(initial.main, 1);
          expect(current.height).toBe(initial.height);
        }
        for (const position of ['middle', 'bottom']) {
          await page.evaluate(
            (position) =>
              scrollTo({
                top:
                  position === 'middle'
                    ? document.documentElement.scrollHeight / 2
                    : document.documentElement.scrollHeight,
                behavior: 'instant',
              }),
            position,
          );
          await expect(bar).toHaveAttribute('data-compact', 'true');
          await expect(page.locator('.wordmark')).toBeInViewport();
          await expect(page.locator('.language')).toBeInViewport();
          await expect(page.locator('.theme-toggle')).toBeInViewport();
          if (width < 768) {
            await page.locator('.menu-toggle').click();
            await expect(page.locator('#main-nav')).toBeVisible();
            await expect(
              page.locator('#main-nav a[download]'),
            ).toBeInViewport();
            await page.keyboard.press('Escape');
            await expect(page.locator('.menu-toggle')).toBeFocused();
            await expect(page.locator('.menu-toggle')).toHaveAttribute(
              'aria-expanded',
              'false',
            );
          } else
            await expect(page.locator('#main-nav a').first()).toBeInViewport();
        }
        await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
        await expect(bar).toHaveAttribute('data-compact', 'false');
      }
    });

    test(`Racker product, official gallery and compact store CTA in ${prefix || 'tr'} ${theme}`, async ({
      page,
    }) => {
      await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
      const store =
        'https://play.google.com/store/apps/details?id=com.ilhanki.titanlog';
      for (const width of [360, 1024, 1440, 1920]) {
        await page.setViewportSize({ width, height: 720 });
        await page.goto(`${prefix}/work/racker/`);
        const cta = page.locator('.detail-identity [data-store-cta]');
        await expect(cta).toHaveAttribute('href', store);
        await expect(cta).toHaveAccessibleName(
          prefix ? 'View on Google Play' : "Google Play'de görüntüle",
        );
        const box = await cta.boundingBox();
        expect(box!.height).toBeGreaterThanOrEqual(42);
        expect(box!.height).toBeLessThanOrEqual(46);
        expect(box!.width).toBeLessThan(260);
        if (width >= 768) expect(box!.y + box!.height).toBeLessThan(720);
        await expect(page.locator('[data-store-cta]')).toHaveCount(1);
        await expect(page.locator('[data-product-features] h3')).toHaveCount(4);
        await expect(page.locator('main')).not.toContainText(
          /nutrition|beslenme/i,
        );
        await expect(page.locator('.detail-technologies li')).toContainText([
          'React Native',
          'Expo',
          'TypeScript',
          'Kotlin',
          'Wear OS',
          'SQLite',
        ]);
        const images = page.locator('.gallery-image-link img');
        await expect(images).toHaveCount(13);
        for (let index = 0; index < 9; index++)
          await expect(images.nth(index)).toHaveAttribute(
            'src',
            /workout-start|program-builder|set-tracking|phone-watch|wear-/,
          );
        await expect(images.nth(9)).toHaveAttribute('src', /overview\./);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
      }
      const a11y = await new AxeBuilder({ page }).analyze();
      expect(a11y.violations).toEqual([]);
      await page.goto(`${prefix}/work/`);
      const card = page.locator('[data-project="racker"]');
      const cta = card.locator('[data-store-cta]');
      await expect(cta).toHaveAttribute('href', store);
      await cta.scrollIntoViewIfNeeded();
      expect(
        await cta.evaluate((e) => {
          const r = e.getBoundingClientRect();
          return (
            document
              .elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)
              ?.closest('a') === e
          );
        }),
      ).toBe(true);
      await card.locator('h3 a').click();
      await expect(page).toHaveURL(`${prefix}/work/racker/`);
      await page.goto(`${prefix}/`);
      await expect(
        page.locator('.primary-project [data-store-cta]'),
      ).toHaveCount(1);
      await expect(
        page.locator('.primary-project [data-store-cta]'),
      ).toHaveAttribute('href', store);
      await expect(page.locator('a a')).toHaveCount(0);
    });
  }

test('sticky navigation stays below the native modal and keeps focused anchors clear', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/work/racker/');
  const link = page.locator('.gallery-image-link').first();
  await link.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  expect(
    await dialog.locator('[data-gallery-close]').evaluate((e) => {
      const r = e.getBoundingClientRect();
      return (
        document
          .elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)
          ?.closest('dialog') !== null
      );
    }),
  ).toBe(true);
  await page.keyboard.press('Escape');
  await expect(link).toBeFocused();
  await page.goto('/work/#projects-2024');
  const heading = page.locator('#projects-2024');
  await expect(heading).toBeInViewport();
  expect((await heading.boundingBox())!.y).toBeGreaterThanOrEqual(
    (await page.locator('.site-header').boundingBox())!.height,
  );
});
