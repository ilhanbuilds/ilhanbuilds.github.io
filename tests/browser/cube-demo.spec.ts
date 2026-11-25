import { test, expect } from '@playwright/test';

async function cubeState(page: import('@playwright/test').Page) {
  return (await page.locator('.cube').getAttribute('data-state'))!;
}

test('cube uses legal quarter turns, inverse moves and stable face centers', async ({
  page,
}) => {
  await page.goto('/demos/cube.html');
  const initial = await cubeState(page);
  expect(initial).toHaveLength(54);
  for (const face of ['U', 'D', 'L', 'R', 'F', 'B']) {
    await page.locator(`[data-move="${face}"]`).click();
    expect(await cubeState(page), face).not.toBe(initial);
    await page.locator(`[data-move="${face}'"]`).click();
    expect(await cubeState(page), `${face} inverse`).toBe(initial);
    for (let turn = 0; turn < 4; turn++) {
      await page.locator(`[data-move="${face}"]`).click();
    }
    expect(await cubeState(page), `${face} four turns`).toBe(initial);
  }
  await page.locator('[data-move="F"]').click();
  const frontTurn = await cubeState(page);
  // Standard clockwise F: L -> U -> R -> D -> L on the front layer.
  for (const index of [2, 5, 8]) expect(frontTurn[index]).toBe('2');
  for (const index of [29, 32, 35]) expect(frontTurn[index]).toBe('0');
  for (const index of [11, 14, 17]) expect(frontTurn[index]).toBe('3');
  for (const index of [20, 23, 26]) expect(frontTurn[index]).toBe('1');
  await page.locator('#shuffle').click();
  const mixed = await cubeState(page);
  for (let color = 0; color < 6; color++) {
    expect([...mixed].filter((value) => value === String(color))).toHaveLength(
      9,
    );
    expect(mixed[color * 9 + 4]).toBe(initial[color * 9 + 4]);
  }
  await expect(page.locator('.cube')).toHaveAttribute('data-solved', 'false');
  await expect(page.locator('#notation')).not.toBeEmpty();
  await page.locator('#reset').click();
  expect(await cubeState(page)).toBe(initial);
  await expect(page.locator('#state')).toHaveText('Düzenli · 0 hamle');
});

test('cube view controls, keyboard turns and mobile layout work without a model', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 850 });
  await page.goto('/demos/cube.html?lang=en&theme=dark');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('header')).toContainText(
    'No AI model or automatic solver',
  );
  const initial = await cubeState(page);
  const view = await page
    .locator('.cube')
    .evaluate((cube) => cube.getAttribute('style'));
  await page.getByRole('button', { name: 'Left', exact: true }).click();
  expect(await page.locator('.cube').getAttribute('style')).not.toBe(view);
  expect(await cubeState(page)).toBe(initial);
  await page.keyboard.press('r');
  expect(await cubeState(page)).not.toBe(initial);
  await page.keyboard.press('Shift+R');
  expect(await cubeState(page)).toBe(initial);
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await expect(page.locator('#state')).toHaveText('Solved · 0 moves');
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await expect(page.locator('.sticker')).toHaveCount(54);
});

test('cube works in an opaque sandbox while host DOM and storage stay inaccessible', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/about/');
  await page.evaluate(() => {
    const frame = document.createElement('iframe');
    frame.id = 'cube-sandbox-test';
    frame.title = 'Cube sandbox test';
    frame.setAttribute('sandbox', 'allow-scripts');
    frame.src = '/demos/cube.html?lang=en';
    frame.style.cssText = 'width:100%;height:900px;border:0';
    document.body.append(frame);
  });
  const preview = page.frameLocator('#cube-sandbox-test');
  await expect(preview.locator('.cube')).toHaveAttribute('data-solved', 'true');
  await preview.getByRole('button', { name: 'Shuffle', exact: true }).click();
  await expect(preview.locator('.cube')).toHaveAttribute(
    'data-solved',
    'false',
  );
  const isolation = await preview.locator('body').evaluate(() => {
    let hostBlocked = false;
    let storageBlocked = false;
    try {
      void window.parent.document.body;
    } catch {
      hostBlocked = true;
    }
    try {
      void window.localStorage.length;
    } catch {
      storageBlocked = true;
    }
    return { hostBlocked, storageBlocked };
  });
  expect(isolation).toEqual({ hostBlocked: true, storageBlocked: true });
  expect(errors).toEqual([]);
});
