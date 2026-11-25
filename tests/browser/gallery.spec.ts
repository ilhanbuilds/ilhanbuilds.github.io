import { test, expect } from '@playwright/test';

for (const locale of ['tr', 'en'] as const) {
  for (const theme of ['light', 'dark'] as const) {
    test(`screenshot lightbox supports keyboard, captions and focus return in ${locale} ${theme}`, async ({
      page,
    }) => {
      await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
      await page.goto(`${locale === 'en' ? '/en' : ''}/work/idleoyun/`);
      const gallery = page.locator('[data-gallery]');
      const link = gallery.locator('.gallery-image-link').first();
      const thumbnail = link.locator('img');
      const expectedSource = await link.getAttribute('href');
      const expectedAlt = await thumbnail.getAttribute('alt');
      await link.focus();
      await page.keyboard.press('Enter');
      const dialog = gallery.getByRole('dialog');
      await expect(dialog).toBeVisible();
      await expect(dialog.locator('[data-gallery-image]')).toHaveAttribute(
        'src',
        new RegExp(
          `${expectedSource!.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`,
        ),
      );
      await expect(dialog.locator('[data-gallery-image]')).toHaveAttribute(
        'alt',
        expectedAlt!,
      );
      await expect(dialog.locator('[data-gallery-caption]')).toHaveText(
        expectedAlt!,
      );
      await expect(dialog.locator('[data-gallery-count]')).toHaveText('1 / 5');
      await expect(dialog.locator('[data-gallery-close]')).toBeFocused();
      await page.keyboard.press('Shift+Tab');
      await expect(dialog.locator('[data-gallery-next]')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(dialog.locator('[data-gallery-close]')).toBeFocused();
      await page.keyboard.press('ArrowRight');
      await expect(dialog.locator('[data-gallery-count]')).toHaveText('2 / 5');
      await page.keyboard.press('ArrowLeft');
      await expect(dialog.locator('[data-gallery-count]')).toHaveText('1 / 5');
      await expect
        .poll(() =>
          page.locator('body').evaluate((body) => body.style.overflow),
        )
        .toBe('hidden');
      await page.keyboard.press('Escape');
      await expect(dialog).not.toBeVisible();
      await expect(link).toBeFocused();
      await expect
        .poll(() =>
          page.locator('body').evaluate((body) => body.style.overflow),
        )
        .not.toBe('hidden');
      await expect(dialog.locator('img')).toHaveCount(0);
    });
  }
}

test('gallery cards preserve complete images and lightbox fits a narrow touch viewport', async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/work/racker/');
  const links = page.locator('[data-gallery] .gallery-image-link');
  expect(await links.count()).toBeGreaterThan(1);
  for (const link of await links.all()) {
    await link.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        link
          .locator('img')
          .evaluate((image) => (image as HTMLImageElement).complete),
      )
      .toBe(true);
    const geometry = await link.evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      const image = element.querySelector('img')!;
      const imageBounds = image.getBoundingClientRect();
      return {
        ratio: bounds.width / bounds.height,
        fit: getComputedStyle(image).objectFit,
        contained:
          imageBounds.width <= bounds.width &&
          imageBounds.height <= bounds.height,
      };
    });
    expect(geometry.ratio).toBeCloseTo(4 / 3, 1);
    expect(geometry.fit).toBe('contain');
    expect(geometry.contained).toBe(true);
  }
  await links.first().click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect
    .poll(() =>
      dialog
        .locator('[data-gallery-image]')
        .evaluate(
          (image) =>
            (image as HTMLImageElement).complete &&
            (image as HTMLImageElement).naturalWidth > 0,
        ),
    )
    .toBe(true);
  const layout = await dialog.evaluate((element) => {
    const bounds = element.getBoundingClientRect();
    const close = element
      .querySelector('[data-gallery-close]')!
      .getBoundingClientRect();
    return {
      left: bounds.left,
      right: bounds.right,
      top: bounds.top,
      bottom: bounds.bottom,
      viewportWidth: innerWidth,
      viewportHeight: innerHeight,
      buttonWidth: close.width,
      buttonHeight: close.height,
    };
  });
  expect(layout.left).toBeGreaterThanOrEqual(0);
  expect(layout.right).toBeLessThanOrEqual(layout.viewportWidth);
  expect(layout.top).toBeGreaterThanOrEqual(0);
  expect(layout.bottom).toBeLessThanOrEqual(layout.viewportHeight);
  expect(layout.buttonWidth).toBeGreaterThanOrEqual(44);
  expect(layout.buttonHeight).toBeGreaterThanOrEqual(44);
  await dialog.locator('[data-gallery-next]').click();
  await expect(dialog.locator('[data-gallery-count]')).toHaveText('2 / 4');
  await dialog.locator('[data-gallery-close]').click();
  await expect(dialog).not.toBeVisible();
});

test('gallery remains a full-size image link when JavaScript is unavailable', async ({
  browser,
  baseURL,
}) => {
  if (!baseURL) throw new Error('Gallery tests require a base URL');
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
  });
  const page = await context.newPage();
  await page.goto('/work/calculator/');
  const link = page.locator('[data-gallery] .gallery-image-link').first();
  const href = await link.getAttribute('href');
  expect(href).toMatch(/\.webp$/);
  const response = await page.request.get(href!);
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toMatch(/^image\//);
  await link.click();
  await expect(page).toHaveURL(
    new RegExp(`${href!.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`),
  );
  await context.close();
});
