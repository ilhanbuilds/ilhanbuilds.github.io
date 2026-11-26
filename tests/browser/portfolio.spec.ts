import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const paths = [
  '',
  'work/',
  'about/',
  ...[
    'idleoyun',
    'calculator',
    'hcjeditor',
    'dinocore',
    'kutlumi',
    'lina',
    'racker',
    'bilekten',
    'deepfake-detection',
    'secureface',
    'rubikrl',
  ].map((slug) => `work/${slug}/`),
];

test('every public page has localized metadata, matching language routes and valid internal links', async ({
  page,
  request,
}) => {
  test.setTimeout(120_000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const internalLinks = new Set<string>();
  for (const prefix of ['/', '/en/']) {
    for (const path of paths) {
      const url = `${prefix}${path}`;
      const response = await page.goto(url);
      expect(response?.status(), url).toBe(200);
      await expect(page.locator('html')).toHaveAttribute(
        'lang',
        prefix === '/en/' ? 'en' : 'tr',
      );
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page).toHaveTitle(/ilhanbuilds$/);
      await expect(
        page.locator('meta[property="og:site_name"]'),
      ).toHaveAttribute('content', 'ilhanbuilds');
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
        'content',
        'https://ilhanbuilds.github.io/branding/og-image.png',
      );
      await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        'content',
        /.+/,
      );
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `https://ilhanbuilds.github.io${url}`,
      );
      const other = prefix === '/' ? `/en/${path}` : `/${path}`;
      await expect(page.locator('.language')).toHaveAttribute('href', other);
      const links = await page
        .locator('a[href^="/"]')
        .evaluateAll((elements) =>
          elements.map((element) => element.getAttribute('href')!),
        );
      links.forEach((link) => internalLinks.add(link));
      for (const img of await page.locator('img:visible').all()) {
        await img.scrollIntoViewIfNeeded();
        await expect
          .poll(() =>
            img.evaluate(
              (element) =>
                element instanceof HTMLImageElement &&
                element.complete &&
                element.naturalWidth > 0,
            ),
          )
          .toBe(true);
      }
      expect(
        await page
          .locator('img:visible')
          .evaluateAll((imgs) =>
            imgs.every(
              (img) =>
                img instanceof HTMLImageElement &&
                img.complete &&
                img.naturalWidth > 0,
            ),
          ),
      ).toBe(true);
      expect(await page.locator('img:not([alt])').count()).toBe(0);
    }
  }
  for (const href of internalLinks)
    expect((await request.get(href)).status(), href).toBe(200);
});

test('project images have intrinsic dimensions, preserve their ratio and open at full size', async ({
  page,
  request,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const path of [
    '/work/racker/',
    '/work/idleoyun/',
    '/work/calculator/',
    '/journey/',
    '/about/',
  ]) {
    await page.goto(path);
    for (const image of await page
      .locator('img:visible:not(.about-portrait img)')
      .all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate(
            (element) =>
              element instanceof HTMLImageElement &&
              element.complete &&
              element.naturalWidth > 0,
          ),
        )
        .toBe(true);
      const result = await image.evaluate((element) => {
        if (!(element instanceof HTMLImageElement))
          throw new Error('Expected image');
        const rect = element.getBoundingClientRect();
        return {
          intrinsic:
            element.width > 0 &&
            element.height > 0 &&
            element.hasAttribute('width') &&
            element.hasAttribute('height'),
          distortion: Math.abs(
            rect.width /
              rect.height /
              (element.naturalWidth / element.naturalHeight) -
              1,
          ),
          objectFit: getComputedStyle(element).objectFit,
        };
      });
      expect(result.intrinsic).toBe(true);
      // Contain canvases deliberately differ from the source ratio; CSS preserves all pixels.
      if (result.objectFit !== 'contain')
        expect(result.distortion).toBeLessThan(0.02);
      expect(result.objectFit).not.toBe('cover');
    }
    for (const href of await page
      .locator('.gallery-image-link')
      .evaluateAll((links) =>
        links.map((link) => link.getAttribute('href')!),
      )) {
      const response = await request.get(href);
      expect(response.status()).toBe(200);
      expect(response.headers()['content-type']).toMatch(/^image\//);
    }
  }
});

test('Racker uses the official icon and verified Google Play link in both languages', async ({
  page,
}) => {
  for (const path of ['/', '/en/', '/work/racker/', '/en/work/racker/']) {
    await page.goto(path);
    await expect(
      page.locator(
        'a[href="https://play.google.com/store/apps/details?id=com.ilhanki.titanlog"]',
      ),
    ).toHaveCount(1);
    await expect(
      page.locator('.project-logo img, .detail-logo img'),
    ).toHaveCount(1);
  }
});

test('project timeline replaces Journey without the separate game comparison', async ({
  page,
}) => {
  await page.goto('/journey/');
  await expect(page).toHaveURL('/work/');
  await expect(page.locator('.game-comparison')).toHaveCount(0);
  await expect(page.locator('.project-card')).toHaveCount(11);
  await expect(page.locator('.project-chronology h2').first()).toHaveText(
    '2026',
  );
  await expect(page.locator('.about-portrait')).toHaveCount(0);
});

test('loading images stays within the layout shift budget', async ({
  page,
  browserName,
}) => {
  test.skip(
    browserName !== 'chromium',
    'The Layout Instability API is measured in Chromium; WebKit image dimensions and ratios are covered separately.',
  );
  await page.addInitScript(() => {
    const shifts: number[] = [];
    Object.defineProperty(window, '__portfolioShifts', { value: shifts });
    if (PerformanceObserver.supportedEntryTypes.includes('layout-shift')) {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const shift = entry as PerformanceEntry & {
            hadRecentInput: boolean;
            value: number;
          };
          if (!shift.hadRecentInput) shifts.push(shift.value);
        }
      }).observe({ type: 'layout-shift', buffered: true });
    }
  });
  for (const path of [
    '/',
    '/work/',
    '/journey/',
    '/work/racker/',
    '/work/hcjeditor/',
  ]) {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    for (const image of await page.locator('img:visible').all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate((element) =>
        element instanceof HTMLImageElement
          ? element.decode()
          : Promise.resolve(),
      );
    }
    const cls = await page.evaluate(() => {
      const shifts =
        (window as Window & { __portfolioShifts?: number[] })
          .__portfolioShifts ?? [];
      return shifts.reduce((sum, value) => sum + value, 0);
    });
    expect(cls, path).toBeLessThan(0.1);
  }
});

test('theme follows system preference and keeps an explicit choice through navigation and reload', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/en/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  const toggle = page.locator('.theme-toggle');
  await expect(toggle).toHaveAccessibleName('Use light theme');
  await toggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe(
    'light',
  );
  await page.goto('/work/racker/');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.locator('.theme-toggle')).toHaveAccessibleName(
    'Koyu temayı kullan',
  );
});

test('storage-disabled visitors can still use the theme', async ({ page }) => {
  await page.addInitScript(() =>
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new Error('Storage disabled');
      },
    }),
  );
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  await page.locator('.theme-toggle').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('mobile navigation works by keyboard, closes with Escape, and navigates', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menu = page.locator('.menu-toggle');
  await expect(menu).toHaveAccessibleName('Menü');
  await menu.focus();
  await page.keyboard.press('Enter');
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await expect(menu).toHaveAccessibleName('Menüyü kapat');
  await expect(
    page.getByRole('navigation', { name: 'Ana navigasyon' }),
  ).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await menu.click();
  await page.getByRole('link', { name: 'Projeler', exact: true }).click();
  await expect(page).toHaveURL('/work/');
});

test('keyboard skip link reaches main content', async ({
  page,
  browserName,
}) => {
  await page.goto('/en/');
  // Windows WebKit defaults to tabbing only to form controls. Verify activation
  // there; Chromium also verifies that the skip link is first in the tab order.
  if (browserName === 'webkit') {
    await page.getByRole('link', { name: 'Skip to content' }).focus();
  } else {
    await page.keyboard.press('Tab');
  }
  await expect(
    page.getByRole('link', { name: 'Skip to content' }),
  ).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
});

test('projects preserve approved chronology and team attribution', async ({
  page,
}) => {
  await page.goto('/en/journey/');
  const headings = await page.locator('.project-card h3').allTextContents();
  expect(headings).toEqual([
    'RubikRL',
    'SecureFace',
    'Deepfake Detection',
    'Bilekten',
    'Racker',
    'Lina',
    'Kutlumi',
    'DinoCore: Evolution Idle',
    'HCJEditor',
    'Calculator',
    'IdleOyun',
  ]);
  for (const name of ['Deepfake Detection', 'SecureFace']) {
    await expect(
      page
        .locator('.project-card')
        .filter({ has: page.getByRole('heading', { name, exact: true }) }),
    ).toContainText('Team project');
  }
});

for (const width of [360, 390, 412, 768, 1024, 1440, 1920]) {
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    for (const path of [
      '/',
      '/en/',
      '/work/',
      '/journey/',
      '/about/',
      '/work/racker/',
      '/work/dinocore/',
    ]) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        path,
      ).toBe(true);
    }
  });
}

for (const theme of ['light', 'dark'] as const) {
  test(`WCAG automated checks in ${theme} mode`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
    for (const path of [
      '/',
      '/en/',
      '/work/',
      '/journey/',
      '/about/',
      '/work/secureface/',
      '/work/racker/',
      '/404.html',
    ]) {
      await page.goto(path);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(results.violations, `${path} ${theme}`).toEqual([]);
    }
  });
}

test('custom error pages and screenshot evidence', async ({
  page,
}, testInfo) => {
  for (const path of ['/404.html', '/en/404/']) {
    await page.goto(path);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex',
    );
    await expect(page.locator('h1')).toHaveCount(1);
  }
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({
    path: testInfo.outputPath('home.png'),
    fullPage: true,
  });
  await page.goto('/journey/');
  await page.screenshot({
    path: testInfo.outputPath('journey-tr.png'),
    fullPage: true,
  });
});
