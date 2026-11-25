import { test, expect } from '@playwright/test';

const order = [
  'RubikRL',
  'SecureFace',
  'Deepfake Detection',
  'Racker',
  'Lina',
  'Kutlumi',
  'DinoCore: Evolution Idle',
  'HCJEditor',
  'Calculator',
  'IdleOyun',
];

test('home identifies the person and offers CV, projects and approved social contacts', async ({
  page,
}) => {
  for (const prefix of ['', '/en']) {
    await page.goto(`${prefix}/`);
    await expect(page.locator('h1')).toHaveText('İlhan Kılıç');
    await expect(page.locator('.home-portrait img')).toBeVisible();
    await expect(page.locator('.hero-actions a[download]')).toHaveAttribute(
      'href',
      prefix
        ? '/documents/Ilhan_Kilic_CV_EN_Portfolyo.pdf'
        : '/documents/Ilhan_Kilic_CV_Portfolyo.pdf',
    );
    await expect(
      page.locator('.hero-actions a:not([download])'),
    ).toHaveAttribute('href', `${prefix}/work/`);
    for (const href of [
      'https://github.com/ilhanbuilds',
      'https://www.linkedin.com/in/ilhan-kilic',
      'mailto:ilhanbuilds@gmail.com',
    ])
      await expect(page.locator(`.hero a[href="${href}"]`)).toBeVisible();
    await expect(
      page.locator('.featured-project h3').filter({ hasText: 'SecureFace' }),
    ).toHaveCount(1);
    await expect(page.locator('.currently')).not.toContainText('SecureFace');
    await expect(page.locator('.currently img')).toBeVisible();
    await expect(page.locator('.featured-project h3').first()).toHaveText(
      'Racker',
    );
  }
});

test('project cards and Journey follow verified newest-first chronology with no nested anchors', async ({
  page,
}) => {
  for (const prefix of ['', '/en']) {
    await page.goto(`${prefix}/work/`);
    expect(await page.locator('.project-card h3').allTextContents()).toEqual(
      order,
    );
    await expect(page.locator('a a')).toHaveCount(0);
    await expect(page.locator('.project-card img').first()).toHaveAttribute(
      'loading',
      'eager',
    );
    await expect(page.locator('.project-card img').nth(1)).toHaveAttribute(
      'loading',
      'lazy',
    );
    for (const card of await page.locator('.project-card').all()) {
      await expect(card.locator('.card-actions a').first()).toBeVisible();
      expect(await card.locator('.project-tags').first().innerText()).not.toBe(
        '',
      );
    }
    const first = page.locator('.project-card').first();
    const expected = await first
      .locator('.card-main-link')
      .getAttribute('href');
    await first.locator('.project-summary').scrollIntoViewIfNeeded();
    const summary = await first.locator('.project-summary').boundingBox();
    await page.mouse.click(
      summary!.x + summary!.width / 2,
      summary!.y + summary!.height / 2,
    );
    await expect(page).toHaveURL(expected!);
    await page.goto(`${prefix}/journey/`);
    expect(await page.locator('.timeline-entry h3').allTextContents()).toEqual(
      order,
    );
    await expect(page.locator('.game-comparison img')).toHaveCount(2);
  }
});

test('demo resources load only on request, stay sandboxed and can be released', async ({
  page,
}) => {
  for (const [slug, file] of [
    ['idleoyun', 'idleoyun'],
    ['calculator', 'calculator'],
    ['hcjeditor', 'hcjeditor'],
    ['rubikrl', 'cube'],
  ]) {
    const requests: string[] = [];
    const listener = (request: { url(): string }) => {
      if (request.url().includes('/demos/')) requests.push(request.url());
    };
    page.on('request', listener);
    await page.goto(`/work/${slug}/`);
    await expect(page.locator('[data-demo-host] iframe')).toHaveCount(0);
    expect(requests).toEqual([]);
    await page.locator('[data-demo-start]').click();
    const frame = page.locator('[data-demo-host] iframe');
    await expect(frame).toHaveAttribute(
      'src',
      new RegExp(`/demos/${file}\\.html`),
    );
    const sandbox = await frame.getAttribute('sandbox');
    expect(sandbox).toContain('allow-scripts');
    expect(sandbox).not.toContain('allow-same-origin');
    await expect
      .poll(() =>
        page
          .frames()
          .some((item) => item.url().includes(`/demos/${file}.html`)),
      )
      .toBe(true);
    const preview = frame.contentFrame();
    if (slug === 'rubikrl') {
      await preview
        .getByRole('button', { name: 'Karıştır', exact: true })
        .click();
      await expect(preview.locator('.cube')).toHaveAttribute(
        'data-solved',
        'false',
      );
    } else if (slug === 'calculator') {
      await preview.locator('#display').fill('6×7');
      await preview.getByRole('button', { name: '=', exact: true }).click();
      await expect(preview.locator('#display')).toHaveValue('42');
    } else if (slug === 'hcjeditor') {
      await preview.locator('#html-code').fill('<h1>Portfolio sandbox</h1>');
      await expect(
        preview.frameLocator('#preview').getByRole('heading'),
      ).toHaveText('Portfolio sandbox');
    } else {
      await expect(
        preview.getByRole('heading', { name: 'Efsanevi Oyun!' }),
      ).toBeVisible();
    }
    await page.locator('[data-demo-close]').click();
    await expect(frame).toHaveCount(0);
    await expect(page.locator('[data-demo-start]')).toBeFocused();
    page.off('request', listener);
  }
});

test('recorded SecureFace comparison and Racker image preview disclose their real behavior', async ({
  page,
}) => {
  await page.goto('/work/secureface/');
  const comparison = page.locator('[data-compare]');
  await comparison.locator('summary').click();
  const slider = comparison.getByRole('slider');
  await slider.fill('25');
  expect(
    await comparison
      .locator('.compare-stage')
      .evaluate((element) => element.style.getPropertyValue('--reveal')),
  ).toBe('25%');
  await slider.focus();
  await page.keyboard.press('ArrowRight');
  await expect(slider).toHaveValue('26');
  await expect(page.locator('.secure-comparison')).toContainText(
    'Canlı yüz tespiti veya şifreleme çalıştırmaz',
  );
  await page.goto('/en/work/racker/');
  const preview = page.locator('[data-product-preview]');
  await expect(preview.locator('[data-slides] figure')).toHaveCount(0);
  await preview.locator('summary').click();
  await expect(preview.locator('[data-slides] figure')).toHaveCount(3);
  await expect(preview.locator('[data-count]')).toHaveText('1 / 3');
  await preview.locator('[data-next]').click();
  await expect(preview.locator('[data-count]')).toHaveText('2 / 3');
  await expect(preview.locator('[data-slides] figure').nth(1)).toBeVisible();
  await preview.locator('[data-prev]').click();
  await expect(preview.locator('[data-count]')).toHaveText('1 / 3');
});

for (const theme of ['light', 'dark'] as const) {
  for (const width of [390, 1440]) {
    test(`all localized pages render in ${theme} at ${width}px`, async ({
      page,
    }) => {
      test.setTimeout(180_000);
      await page.setViewportSize({ width, height: 1000 });
      await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      for (const prefix of ['', '/en']) {
        for (const path of [
          '',
          'about/',
          'journey/',
          'work/',
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
        ]) {
          const response = await page.goto(`${prefix}/${path}`);
          expect(response?.status()).toBe(200);
          await expect(page.locator('html')).toHaveAttribute(
            'data-theme',
            theme,
          );
          await expect(page.locator('h1')).toHaveCount(1);
          expect(
            await page.evaluate(
              () => document.documentElement.scrollWidth <= window.innerWidth,
            ),
          ).toBe(true);
          for (const image of await page.locator('img').all()) {
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
          }
        }
      }
      expect(errors).toEqual([]);
    });
  }
}
