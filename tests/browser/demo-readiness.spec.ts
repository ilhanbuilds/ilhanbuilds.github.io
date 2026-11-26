import { test, expect } from '@playwright/test';

for (const language of ['tr', 'en']) {
  test(`cube controls wait for their script before accepting the first action in ${language}`, async ({
    page,
  }) => {
    let releaseScript!: () => void;
    let scriptRequested!: () => void;
    const scriptGate = new Promise<void>((resolve) => {
      releaseScript = resolve;
    });
    const requested = new Promise<void>((resolve) => {
      scriptRequested = resolve;
    });
    await page.route('**/demos/cube.js', async (route) => {
      scriptRequested();
      await scriptGate;
      await route.continue();
    });
    try {
      await page.goto(`/demos/cube.html?lang=${language}`, {
        waitUntil: 'commit',
      });
      await requested;
      const controls = page.locator('button');
      await expect(controls).toHaveCount(6);
      for (const control of await controls.all())
        await expect(control).toBeDisabled();
      await expect(page.locator('.cube')).not.toHaveAttribute('data-solved');
      releaseScript();
      const shuffle = page.getByRole('button', {
        name: language === 'en' ? 'Shuffle' : 'Karıştır',
        exact: true,
      });
      await expect(shuffle).toBeEnabled();
      await expect(page.locator('.cube')).toHaveAttribute(
        'data-solved',
        'true',
      );
      await shuffle.click();
      await expect(page.locator('.cube')).toHaveAttribute(
        'data-solved',
        'false',
      );
      await page
        .getByRole('button', {
          name: language === 'en' ? 'Reset' : 'Sıfırla',
          exact: true,
        })
        .click();
      await expect(page.locator('.cube')).toHaveAttribute(
        'data-solved',
        'true',
      );
    } finally {
      releaseScript();
    }
  });
}
