import { test, expect } from '@playwright/test';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

test('Turkish is the default; the language switch remembers an explicit choice and preserves the page', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'tr');
  await expect(page.locator('.language')).toHaveAttribute('href', '/en/');
  await page.locator('.language').click();
  await expect(page).toHaveURL('/en/');
  expect(await page.evaluate(() => localStorage.getItem('locale'))).toBe('en');
  await page.goto('/?source=cv#main');
  await expect(page).toHaveURL('/en/?source=cv#main');
  await page.goto('/en/work/secureface/');
  await page.locator('.language').click();
  await expect(page).toHaveURL('/work/secureface/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'tr');
  await page.goto('/');
  await expect(page).toHaveURL('/');
  expect(await page.evaluate(() => localStorage.getItem('locale'))).toBe('tr');
});

test('explicit localized links win over a saved preference and legacy links preserve query and hash', async ({
  page,
}) => {
  await page.goto('/en/');
  await page.goto('/work/racker/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'tr');
  for (const path of [
    '',
    'work/',
    'journey/',
    'about/',
    'work/idleoyun/',
    'work/calculator/',
    'work/hcjeditor/',
    'work/dinocore/',
    'work/kutlumi/',
    'work/lina/',
    'work/racker/',
    'work/bilekten/',
    'work/deepfake-detection/',
    'work/secureface/',
    'work/rubikrl/',
  ]) {
    await page.goto(`/tr/${path}?from=old#main`);
    await expect(page).toHaveURL(
      `/${path === 'journey/' ? 'work/' : path}?from=old#main`,
    );
    await expect(page.locator('html')).toHaveAttribute('lang', 'tr');
  }
});

test('storage-disabled and JavaScript-disabled visitors retain working language links', async ({
  browser,
  page: storagePage,
}) => {
  await storagePage.addInitScript(() =>
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new Error('Storage disabled');
      },
    }),
  );
  await storagePage.goto('/');
  await storagePage.locator('.language').click();
  await expect(storagePage).toHaveURL('/en/');
  await storagePage.locator('.language').click();
  await expect(storagePage).toHaveURL('/');
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto('/');
    await page.locator('.language').click();
    await expect(page).toHaveURL('/en/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await page.goto('/tr/work/racker/');
    await expect(page).toHaveURL('/work/racker/');
  } finally {
    await context.close();
  }
});

for (const locale of ['tr', 'en'] as const) {
  test(`${locale} pages download the correct unchanged CV and expose confirmed contact links`, async ({
    page,
  }, testInfo) => {
    const prefix = locale === 'tr' ? '/' : '/en/';
    const filename =
      locale === 'tr'
        ? 'Ilhan_Kilic_CV_Portfolyo.pdf'
        : 'Ilhan_Kilic_CV_EN_Portfolyo.pdf';
    for (const suffix of ['', 'work/', 'journey/', 'about/', 'work/racker/']) {
      await page.goto(`${prefix}${suffix}`);
      await expect(page.locator('.site-header a[download]')).toHaveAttribute(
        'href',
        `/documents/${filename}`,
      );
      await expect(
        page.locator('.site-footer a[href="mailto:ilhanbuilds@gmail.com"]'),
      ).toHaveCount(1);
      await expect(
        page.locator(
          '.site-footer a[href="https://www.linkedin.com/in/ilhan-kilic"]',
        ),
      ).toHaveCount(1);
    }
    if (await page.locator('.menu-toggle').isVisible()) {
      await page.locator('.menu-toggle').click();
    }
    await expect(page.locator('.site-header a[download]')).toBeVisible();
    const downloadPromise = page.waitForEvent('download');
    await page.locator('.site-header a[download]').click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe(filename);
    const destination = testInfo.outputPath(filename);
    await download.saveAs(destination);
    const downloaded = await readFile(destination);
    const original = await readFile(`public/documents/${filename}`);
    expect(createHash('sha256').update(downloaded).digest('hex')).toBe(
      createHash('sha256').update(original).digest('hex'),
    );
    expect(await download.failure()).toBeNull();
  });
}

test('canonical language alternatives and shared team descriptions match the new URLs', async ({
  page,
}) => {
  for (const locale of ['tr', 'en'] as const) {
    for (const slug of ['secureface', 'deepfake-detection']) {
      const suffix = `work/${slug}/`;
      await page.goto(`${locale === 'tr' ? '/' : '/en/'}${suffix}`);
      await expect(page.locator('link[hreflang="tr"]')).toHaveAttribute(
        'href',
        `https://ilhanbuilds.github.io/${suffix}`,
      );
      await expect(page.locator('link[hreflang="en"]')).toHaveAttribute(
        'href',
        `https://ilhanbuilds.github.io/en/${suffix}`,
      );
      await expect(page.locator('link[hreflang="x-default"]')).toHaveAttribute(
        'href',
        `https://ilhanbuilds.github.io/${suffix}`,
      );
      await expect(page.locator('h2')).not.toContainText([
        locale === 'tr' ? 'Benim katkım' : 'My contribution',
      ]);
      await expect(page.locator('.project-facts')).toContainText(
        locale === 'tr' ? 'Ekip projesi' : 'Team project',
      );
    }
  }
});
