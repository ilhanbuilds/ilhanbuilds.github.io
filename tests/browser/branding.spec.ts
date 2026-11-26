import { test, expect } from '@playwright/test';

for (const theme of ['light', 'dark'] as const) {
  test(`brand and square portrait render responsively in ${theme}`, async ({
    page,
    request,
  }) => {
    await page.emulateMedia({ colorScheme: theme });
    for (const width of [360, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const prefix of ['', '/en']) {
        await page.goto(`${prefix}/about/`);
        await page.evaluate(() => document.fonts.ready);
        await expect(page.locator('.wordmark')).toHaveText('/ilhanbuilds');
        await expect(page.locator('.wordmark')).toHaveAccessibleName(
          /\/ilhanbuilds/,
        );
        await expect(page.locator('.wordmark')).toHaveAttribute(
          'href',
          `${prefix}/`,
        );
        await expect(page).toHaveTitle(/ilhanbuilds$/);
        await expect(
          page.locator('meta[property="og:site_name"]'),
        ).toHaveAttribute('content', 'ilhanbuilds');
        const portrait = page.locator('.about-portrait img');
        const geometry = await portrait.evaluate((image) => {
          const rect = image.getBoundingClientRect();
          const style = getComputedStyle(image);
          const frame = getComputedStyle(image.parentElement!, '::before');
          return {
            ratio: rect.width / rect.height,
            fit: style.objectFit,
            position: style.objectPosition,
            frame: frame.borderTopWidth,
            offset: frame.top,
          };
        });
        expect(geometry.ratio).toBeCloseTo(1, 2);
        expect(geometry.fit).toBe('cover');
        expect(geometry.position).toBe('50% 45%');
        expect(geometry.frame).toBe('1px');
        expect(geometry.offset).toBe('12px');
        const picture = await page.locator('.about-portrait').boundingBox();
        const copy = await page.locator('.about-copy').boundingBox();
        expect(picture).not.toBeNull();
        expect(copy).not.toBeNull();
        if (width < 768)
          expect(copy!.y).toBeGreaterThan(picture!.y + picture!.height);
        else expect(copy!.x).toBeGreaterThan(picture!.x + picture!.width);
        const mark = page.locator('.wordmark-builds');
        await expect(mark).toHaveCSS(
          'color',
          theme === 'dark' ? 'rgb(21, 157, 255)' : 'rgb(0, 122, 255)',
        );
        for (const [email, purpose] of [
          [
            'ilhanbuilds@gmail.com',
            prefix
              ? 'Development & projects'
              : 'Geliştirici iletişimi ve projeler',
          ],
          [
            'kilicilhan.75@gmail.com',
            prefix
              ? 'Professional contact & careers'
              : 'Profesyonel iletişim ve kariyer',
          ],
        ] as const) {
          const block = page
            .locator('.contact-purpose')
            .filter({ hasText: purpose });
          await expect(block.locator('a')).toHaveAttribute(
            'href',
            `mailto:${email}`,
          );
        }
        const brand = await page.locator('.wordmark').boundingBox();
        const controls = await page.locator('.header-controls').boundingBox();
        expect(brand!.x + brand!.width).toBeLessThanOrEqual(controls!.x);
      }
    }
    await page.goto('/');
    await expect(
      page.locator('.hero a[href="mailto:ilhanbuilds@gmail.com"]'),
    ).toHaveCount(1);
    await expect(
      page.locator('.site-footer a[href="mailto:ilhanbuilds@gmail.com"]'),
    ).toHaveCount(1);
    await expect(page.locator('.site-footer')).toContainText('ilhanbuilds');
    const socialLocale = await page.locator('html').getAttribute('lang');
    for (const selector of [
      'meta[property="og:image"]',
      'meta[name="twitter:image"]',
    ]) {
      await expect(page.locator(selector)).toHaveAttribute(
        'content',
        `https://ilhanbuilds.github.io/branding/v1.1.1/og-${socialLocale}.png`,
      );
    }
    await expect(
      page.locator('meta[property="og:image:width"]'),
    ).toHaveAttribute('content', '1200');
    await expect(
      page.locator('meta[property="og:image:height"]'),
    ).toHaveAttribute('content', '630');
    for (const icon of await page
      .locator(
        'link[rel="icon"], link[rel="apple-touch-icon"], link[rel="manifest"]',
      )
      .all()) {
      expect(
        (await request.get((await icon.getAttribute('href'))!)).status(),
      ).toBe(200);
    }
  });
}
