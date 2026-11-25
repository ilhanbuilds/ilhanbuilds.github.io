import { test, expect } from '@playwright/test';

type IdleState = {
  money: number;
  rebirth: number;
  prestige: number;
  power: number;
  rebirthMultiplier: number;
  prestigeMultiplier: number;
  powerPrice: number;
  rebirthPrice: number;
  prestigePrice: number;
  powerStock: number;
  rebirthStock: number;
};
type IdleRules = {
  createPlayer(): IdleState;
  click(state: IdleState): IdleState;
  buyPower(state: IdleState): { state: IdleState; message: string };
  buyRebirth(state: IdleState): { state: IdleState; message: string };
  buyPrestige(state: IdleState): { state: IdleState; message: string };
};

test('Calculator preserves WinForms integer arithmetic, sequential evaluation and delete', async ({
  page,
}) => {
  await page.goto('/demos/calculator.html');
  const display = page.getByRole('textbox', { name: 'İşlem' });
  for (const [expression, expected] of [
    ['128+256', '384'],
    ['9/2', '4'],
    ['2+3×4', '20'],
    ['3–8', '-5'],
    ['9×8/3–4+2', '22'],
    ['9', '0'],
    ['9+', '9'],
    ['2147483647+1', '-2147483648'],
  ]) {
    await display.fill(expression!);
    await page.getByRole('button', { name: '=', exact: true }).click();
    await expect(display).toHaveValue(expected!);
  }
  await display.fill('12');
  await page.getByRole('button', { name: 'delete', exact: true }).click();
  await expect(display).toHaveValue('1');
  await page.getByRole('button', { name: '+', exact: true }).click();
  await page.getByRole('button', { name: '×', exact: true }).click();
  await expect(display).toHaveValue('1+');
  await page.getByRole('button', { name: '2', exact: true }).click();
  await page.getByRole('button', { name: '=', exact: true }).click();
  await expect(display).toHaveValue('3');
});

test('Calculator reports zero division and invalid input without script execution or crashes', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/demos/calculator.html');
  const display = page.getByRole('textbox', { name: 'İşlem' });
  await display.fill('7/0');
  await page.getByRole('button', { name: '=', exact: true }).click();
  await expect(display).toHaveValue('7/0');
  await expect(page.getByRole('status')).toContainText('Sıfıra bölme');
  await display.fill('globalThis.alert(1)');
  await page.getByRole('button', { name: '=', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('tam sayı');
  await display.fill('');
  await page.getByRole('button', { name: 'delete', exact: true }).click();
  await page.getByRole('button', { name: '+', exact: true }).click();
  await expect(display).toHaveValue('');
  expect(errors).toEqual([]);
});

test('IdleOyun keeps menu, local registration/login, click earnings, store and session-only saving', async ({
  page,
}) => {
  await page.goto('/demos/idleoyun.html');
  await page.getByRole('button', { name: 'Kayıt Ol', exact: true }).click();
  await page.locator('#register-name').fill('YeniOyuncu');
  await page.locator('#register-password').fill('ornek');
  await page.getByRole('button', { name: 'KAYIT OL', exact: true }).click();
  await expect(page.locator('#register-message')).toHaveText('Kayıt başarılı!');
  await page.getByRole('button', { name: 'Geri', exact: true }).click();
  await page
    .getByRole('button', { name: 'Kullanici girisi', exact: true })
    .click();
  await page.locator('#login-password').fill('yanlis');
  await page.getByRole('button', { name: 'Giriş', exact: true }).click();
  await expect(page.locator('#login-message')).toContainText('1. deneme');
  await page.locator('#login-password').fill('ornek');
  await page.getByRole('button', { name: 'Giriş', exact: true }).click();
  await expect(page.locator('#game')).toBeVisible();
  for (let index = 0; index < 10; index++)
    await page.getByRole('button', { name: 'TIKLA', exact: true }).click();
  await expect(page.locator('#game [data-stat="money"]')).toHaveText(
    'Para = 100',
  );
  await page.getByRole('button', { name: 'MARKET', exact: true }).click();
  await page.locator('#rebirth').click();
  await expect(page.locator('#market-message')).toHaveText(
    'Güc fullenmeden Rebirth satın alamazsın!',
  );
  await page.locator('#power').click();
  await expect(page.locator('#market [data-stat="money"]')).toHaveText(
    'Para = 0',
  );
  await expect(page.locator('#power')).toContainText('1/10 - Güc');
  await expect(page.locator('#power')).toContainText('150 Para');
  await page.getByRole('button', { name: 'geri', exact: true }).click();
  await page.getByRole('button', { name: 'TIKLA', exact: true }).click();
  await expect(page.locator('#game [data-stat="money"]')).toHaveText(
    'Para = 20',
  );
  await page.getByRole('button', { name: 'Çıkış', exact: true }).click();
  await page
    .getByRole('button', { name: 'Kullanici girisi', exact: true })
    .click();
  await page.getByRole('button', { name: 'Giriş', exact: true }).click();
  // Original game saves only when leaving Market, not on every click.
  await expect(page.locator('#game [data-stat="money"]')).toHaveText(
    'Para = 0',
  );
  await page.reload();
  await page
    .getByRole('button', { name: 'Kullanici girisi', exact: true })
    .click();
  await page.locator('#login-name').fill('YeniOyuncu');
  await page.locator('#login-password').fill('ornek');
  await page.getByRole('button', { name: 'Giriş', exact: true }).click();
  await expect(page.locator('#login-message')).toContainText('yanlis');
});

test('IdleOyun economy matches original power stock, rounding, rebirth and prestige boundaries', async ({
  page,
}) => {
  await page.goto('/demos/idleoyun.html');
  const result = await page.evaluate(() => {
    const rules = (globalThis as typeof globalThis & { IdleRules: IdleRules })
      .IdleRules;
    const fresh = rules.createPlayer();
    const poor = rules.buyPower(fresh);
    let powered = { ...fresh, money: 100000 };
    const prices: number[] = [];
    for (let index = 0; index < 10; index++) {
      prices.push(powered.powerPrice);
      powered = rules.buyPower(powered).state;
    }
    const stockEnded = rules.buyPower(powered);
    const rebirth = rules.buyRebirth({ ...powered, money: 5000 });
    const click = rules.click(rebirth.state);
    const blockedPrestige = rules.buyPrestige({
      ...fresh,
      money: 50000,
      rebirthStock: 1,
    });
    const prestige = rules.buyPrestige({
      ...fresh,
      money: 50000,
      powerStock: 0,
      rebirthStock: 0,
      rebirth: 25,
    });
    const noMoney = rules.buyPrestige({
      ...fresh,
      money: 49999,
      powerStock: 0,
      rebirthStock: 0,
    });
    return {
      fresh,
      poor,
      prices,
      powered,
      stockEnded,
      rebirth,
      click,
      blockedPrestige,
      prestige,
      noMoney,
    };
  });
  expect(result.fresh.power).toBe(10);
  expect(result.poor.message).toBe('Para yetersiz!');
  expect(result.prices).toEqual([
    100, 150, 225, 337, 505, 757, 1135, 1702, 2553, 3829,
  ]);
  expect(result.powered.powerStock).toBe(0);
  expect(result.powered.power).toBe(110);
  expect(result.stockEnded.message).toBe('Bu esyanin stogu bitti!');
  expect(result.rebirth.state).toMatchObject({
    money: 0,
    rebirth: 1,
    power: 10,
    rebirthMultiplier: 1.1,
    rebirthPrice: 10000,
    powerStock: 10,
    rebirthStock: 24,
  });
  expect(result.click.money).toBe(11);
  expect(result.blockedPrestige.state.prestige).toBe(0);
  expect(result.prestige.state).toMatchObject({
    money: 0,
    rebirth: 0,
    prestige: 1,
    power: 10,
    prestigeMultiplier: 2,
    rebirthMultiplier: 1,
    powerPrice: 100,
    rebirthPrice: 5000,
    prestigePrice: 250000,
    powerStock: 10,
    rebirthStock: 25,
  });
  expect(result.noMoney.message).toBe('Para yetersiz!');
});

test('legacy adaptations remain functional inside opaque-origin sandbox frames and fit mobile', async ({
  page,
}) => {
  await page.goto('/');
  for (const demo of ['calculator', 'idleoyun']) {
    await page.evaluate((name) => {
      document.querySelector('#legacy-test')?.remove();
      const frame = document.createElement('iframe');
      frame.id = 'legacy-test';
      frame.sandbox.add('allow-scripts');
      frame.src = `/demos/${name}.html`;
      frame.style.width = '320px';
      frame.style.height = '760px';
      document.body.append(frame);
    }, demo);
    const frame = page.frameLocator('#legacy-test');
    if (demo === 'calculator') {
      await frame.getByRole('button', { name: '7', exact: true }).click();
      await expect(frame.getByRole('textbox')).toHaveValue('7');
    } else {
      await frame
        .getByRole('button', { name: 'Kullanici girisi', exact: true })
        .click();
      await frame.getByRole('button', { name: 'Giriş', exact: true }).click();
      await frame.getByRole('button', { name: 'TIKLA', exact: true }).click();
      await expect(frame.locator('#game [data-stat="money"]')).toHaveText(
        'Para = 10',
      );
    }
    expect(
      await frame
        .locator('body')
        .evaluate(() => document.documentElement.scrollWidth <= innerWidth),
    ).toBe(true);
  }
});
