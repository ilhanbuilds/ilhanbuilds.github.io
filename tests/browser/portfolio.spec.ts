import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const paths = [
  '',
  'work/',
  'journey/',
  'about/',
  ...[
    'idleoyun',
    'calculator',
    'hcjeditor',
    'dinocore',
    'kutlumi',
    'lina',
    'racker',
    'deepfake-detection',
    'secureface',
    'rubikrl',
  ].map((slug) => `work/${slug}/`),
];

test('every public page has localized metadata, matching language routes and valid internal links', async ({
  page,
  request,
}) => {
  const internalLinks = new Set<string>();
  for (const prefix of ['/', '/tr/']) {
    for (const path of paths) {
      const url = `${prefix}${path}`;
      const response = await page.goto(url);
      expect(response?.status(), url).toBe(200);
      await expect(page.locator('html')).toHaveAttribute(
        'lang',
        prefix === '/' ? 'en' : 'tr',
      );
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        'content',
        /.+/,
      );
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `https://ilhanbuilds.github.io${url}`,
      );
      const other = prefix === '/' ? `/tr/${path}` : `/${path}`;
      await expect(page.locator('.language')).toHaveAttribute('href', other);
      const links = await page
        .locator('a[href^="/"]')
        .evaluateAll((elements) =>
          elements.map((element) => element.getAttribute('href')!),
        );
      links.forEach((link) => internalLinks.add(link));
      expect(
        await page
          .locator('img')
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

test('theme follows system preference and keeps an explicit choice through navigation and reload', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  const toggle = page.locator('.theme-toggle');
  await expect(toggle).toHaveAccessibleName('Use light theme');
  await toggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  expect(await page.evaluate(() => localStorage.getItem('theme'))).toBe(
    'light',
  );
  await page.goto('/tr/work/racker/');
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
  await page.goto('/tr/');
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
  await page.getByRole('link', { name: 'Yolculuk', exact: true }).click();
  await expect(page).toHaveURL('/tr/journey/');
});

test('keyboard skip link reaches main content', async ({
  page,
  browserName,
}) => {
  await page.goto('/');
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

test('journey preserves approved chronology and team attribution', async ({
  page,
}) => {
  await page.goto('/journey/');
  const headings = await page.locator('.timeline-entry h3').allTextContents();
  expect(headings).toEqual([
    'IdleOyun',
    'Calculator',
    'HCJEditor',
    'DinoCore: Evolution Idle',
    'Kutlumi',
    'Lina',
    'Racker',
    'Deepfake Detection',
    'SecureFace',
    'RubikRL',
  ]);
  for (const name of ['Deepfake Detection', 'SecureFace']) {
    await expect(
      page
        .locator('.timeline-entry')
        .filter({ has: page.getByRole('heading', { name, exact: true }) }),
    ).toContainText('Team project');
  }
});

for (const width of [360, 390, 412, 768, 1024, 1440, 1920]) {
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    for (const path of [
      '/',
      '/tr/',
      '/work/',
      '/tr/journey/',
      '/about/',
      '/tr/work/racker/',
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
      '/tr/',
      '/work/',
      '/journey/',
      '/about/',
      '/tr/work/secureface/',
      '/work/racker/',
      '/404.html',
    ]) {
      await page.goto(path);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(results.violations, `${path} ${theme}`).toEqual([]);
    }
  });
}

test('custom error pages and screenshot evidence', async ({
  page,
}, testInfo) => {
  for (const path of ['/404.html', '/tr/404/']) {
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
  await page.goto('/tr/journey/');
  await page.screenshot({
    path: testInfo.outputPath('journey-tr.png'),
    fullPage: true,
  });
});
