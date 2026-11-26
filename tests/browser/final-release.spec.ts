import { test, expect } from '@playwright/test';

for (const prefix of ['', '/en']) {
  test(`local device simulations synchronize, clamp and reset in ${prefix || 'tr'}`, async ({
    page,
  }) => {
    await page.goto(`${prefix}/work/bilekten/`);
    const demo = page.locator('[data-sync-demo]');
    const phone = demo.locator('[data-phone-value]');
    await expect(phone).toHaveText('50%');
    for (let i = 0; i < 5; i++) await demo.locator('[data-plus]').click();
    await expect(phone).toHaveText('100%');
    await expect(demo.locator('[data-plus]')).toBeDisabled();
    for (let i = 0; i < 10; i++) await demo.locator('[data-minus]').click();
    await expect(phone).toHaveText('0%');
    await expect(demo.locator('[data-minus]')).toBeDisabled();
    await page.reload();
    await expect(phone).toHaveText('50%');
    await page.goto(`${prefix}/work/racker/`);
    await demo.locator('[data-plus]').click();
    await expect(phone).toHaveText(prefix ? '75.1 kg' : '75,1 kg');
    await expect(demo.locator('[data-watch-value]')).toHaveText(
      await phone.innerText(),
    );
    await demo.locator('[data-minus]').click();
    await expect(phone).toHaveText(prefix ? '75.0 kg' : '75,0 kg');
    await expect(demo.locator('iframe,input,a')).toHaveCount(0);
  });

  test(`bounded project neighbors and list position restore in ${prefix || 'tr'}`, async ({
    page,
  }) => {
    await page.goto(`${prefix}/work/rubikrl/`);
    const nav = page.locator('.project-navigation');
    await expect(nav.locator('a')).toHaveCount(1);
    await expect(nav.locator('[aria-current]')).toHaveText('RubikRL');
    await expect(nav.locator('a')).toHaveAttribute(
      'href',
      `${prefix}/work/secureface/`,
    );
    await page.goto(`${prefix}/work/idleoyun/`);
    await expect(nav.locator('a')).toHaveCount(1);
    await expect(nav.locator('a')).toHaveAttribute(
      'href',
      `${prefix}/work/calculator/`,
    );
    await page.goto(`${prefix}/work/`);
    const card = page.locator('[data-project="lina"] h3 a');
    await card.scrollIntoViewIfNeeded();
    const y = await page.evaluate(() => scrollY);
    await card.click();
    await expect(nav.locator('a')).toHaveCount(2);
    await expect(nav.locator('[aria-current]')).toHaveText('Lina');
    await page.locator('[data-project-back]').click();
    await expect(page).toHaveURL(`${prefix}/work/`);
    await expect
      .poll(() => page.evaluate(() => scrollY))
      .toBeGreaterThan(y - 10);
  });
}

test('recorded comparison supports direct pointer drag, touch and keyboard', async ({
  page,
  isMobile,
}) => {
  await page.goto('/work/secureface/');
  const slider = page.getByRole('slider');
  await slider.scrollIntoViewIfNeeded();
  const stage = await page.locator('.compare-stage').boundingBox();
  const handle = await slider.boundingBox();
  await page.mouse.move(
    handle!.x + handle!.width / 2,
    handle!.y + handle!.height / 2,
  );
  await page.mouse.down();
  await page.mouse.move(
    stage!.x + stage!.width * 0.75,
    stage!.y + stage!.height / 2,
    { steps: 8 },
  );
  await page.mouse.up();
  expect(Number(await slider.getAttribute('aria-valuenow'))).toBeCloseTo(75, 0);
  if (isMobile) await slider.tap();
  await slider.focus();
  await slider.press('Home');
  await expect(slider).toHaveAttribute('aria-valuenow', '0');
  await slider.press('End');
  await expect(slider).toHaveAttribute('aria-valuenow', '100');
  await expect(page.locator('input[type=range]')).toHaveCount(0);
});

for (const width of [360, 390, 412, 768, 1024, 1440, 1920]) {
  test(`all interactive surfaces fit without document scrollbars at ${width}`, async ({
    page,
  }) => {
    test.setTimeout(90_000);
    await page.setViewportSize({ width, height: 1000 });
    for (const slug of [
      'rubikrl',
      'hcjeditor',
      'calculator',
      'idleoyun',
      'bilekten',
      'racker',
      'secureface',
    ]) {
      await page.goto(`/en/work/${slug}/`);
      const surface = page.locator('.demo-surface');
      await surface.scrollIntoViewIfNeeded();
      const bounds = await surface.boundingBox();
      expect(Math.abs(bounds!.x + bounds!.width / 2 - width / 2)).toBeLessThan(
        2,
      );
      expect(
        await surface.evaluate((e) => getComputedStyle(e).borderTopColor),
      ).toBe('rgb(0, 122, 255)');
      await expect
        .poll(() =>
          page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        )
        .toBe(true);
      if (await page.locator('.demo-frame').count()) {
        const locator = page.locator('.demo-frame');
        await expect(locator).toHaveAttribute('sandbox', 'allow-scripts');
        const frame = locator.contentFrame();
        await expect
          .poll(() =>
            frame.locator('body').evaluate(() => ({
              h: document.documentElement.scrollHeight - innerHeight,
              w: document.documentElement.scrollWidth - innerWidth,
            })),
          )
          .toEqual({ h: 0, w: 0 });
      } else
        for (const button of await surface.locator('button').all()) {
          const box = await button.boundingBox();
          expect(box!.width).toBeGreaterThanOrEqual(44);
          expect(box!.height).toBeGreaterThanOrEqual(44);
        }
    }
  });
}

test('gallery keeps two cube states, anonymized Deepfake UI and chevrons outside images', async ({
  page,
}) => {
  await page.goto('/work/rubikrl/');
  await expect(page.locator('.gallery-image-link')).toHaveCount(2);
  await page.locator('.gallery-image-link').first().click();
  await expect(page.locator('[data-gallery-previous] svg')).toBeVisible();
  const left = await page.locator('[data-gallery-previous]').boundingBox();
  const image = await page.locator('[data-gallery-media]').boundingBox();
  expect(left!.x + left!.width).toBeLessThanOrEqual(image!.x);
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('[data-gallery-count]')).toHaveText('2 / 2');
  await page.keyboard.press('Escape');
  await expect(page.locator('.gallery-image-link').first()).toBeFocused();
  await page.goto('/work/deepfake-detection/');
  await expect(page.locator('.gallery-image-link')).toHaveCount(1);
  await page.locator('.gallery-image-link').click();
  await expect(
    page.locator('[data-gallery-next], [data-gallery-previous]'),
  ).toHaveCount(0);
  await expect(page.locator('[data-gallery-image]')).toHaveAttribute(
    'src',
    /interface-anonymized/,
  );
});
