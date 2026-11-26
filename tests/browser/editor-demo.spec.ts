import { test, expect, type Page, type Request } from '@playwright/test';

async function openEditor(page: Page, language: 'tr' | 'en' = 'tr') {
  await page.goto('/');
  await page.evaluate((language) => {
    localStorage.setItem('editor-isolation-proof', 'host-only');
    const frame = document.createElement('iframe');
    frame.dataset.editorTest = 'true';
    frame.title = 'HCJEditor test';
    frame.sandbox.add('allow-scripts');
    frame.src = `/demos/hcjeditor.html?lang=${language}`;
    frame.style.cssText = `width:100%;height:${innerWidth <= 600 ? 720 : 600}px`;
    document.body.prepend(frame);
  }, language);
  return page.frameLocator('[data-editor-test]');
}

test('HCJEditor preserves live HTML/CSS/JS, original keyboard shortcuts', async ({
  page,
}) => {
  const editor = await openEditor(page);
  await expect(
    editor.getByRole('textbox', { name: 'HTML', exact: true }),
  ).toBeVisible();
  await editor
    .locator('#html-code')
    .fill(
      '<h1>Merhaba</h1><button id="action">Tıkla</button><p id="result"></p>',
    );
  await editor.locator('#css-code').fill('h1 { color: rgb(20, 70, 160); }');
  await editor
    .locator('#js-code')
    .fill(
      'document.querySelector("#action").onclick = () => { document.querySelector("#result").textContent = "Çalıştı"; };',
    );
  const preview = editor.frameLocator('#preview');
  await expect(preview.locator('h1')).toHaveText('Merhaba');
  await expect(preview.locator('h1')).toHaveCSS('color', 'rgb(20, 70, 160)');
  await preview.getByRole('button', { name: 'Tıkla' }).click();
  await expect(preview.locator('#result')).toHaveText('Çalıştı');
  await editor.locator('#html-code').fill('section.card');
  await editor.locator('#html-code').press('Tab');
  await expect(editor.locator('#html-code')).toHaveValue(
    '<section class="card"></section>',
  );
  await editor.locator('#html-code').press('Escape');
  await editor.locator('#html-code').press('Tab');
  await expect(editor.locator('#css-code')).toBeFocused();
  await editor.locator('#css-code').fill('p {');
  await editor.locator('#css-code').press('Enter');
  await expect(editor.locator('#css-code')).toHaveValue('p {\n  \n}');
  expect(
    await page.evaluate(() => localStorage.getItem('htmlCode')),
  ).toBeNull();
});

for (const language of ['tr', 'en'] as const) {
  test(`HCJEditor ${language} file buttons show accessible notices without file operations`, async ({
    page,
    isMobile,
  }) => {
    let chooserCount = 0;
    let downloadCount = 0;
    page.on('filechooser', () => chooserCount++);
    page.on('download', () => downloadCount++);
    const editor = await openEditor(page, language);
    const notice = editor.getByRole('status');
    const noticeText =
      language === 'en'
        ? 'File operations are disabled in this demo.'
        : 'Bu demoda dosya işlemleri devre dışı.';
    await expect(
      editor.locator('input[type="file"], a[download], [role="dialog"]'),
    ).toHaveCount(0);
    await expect(page.locator('[data-editor-test]')).toHaveAttribute(
      'sandbox',
      'allow-scripts',
    );
    await expect(editor.locator('html')).toHaveAttribute('lang', language);
    for (const name of language === 'en'
      ? ['Open file', 'Save file']
      : ['Dosya Yükle', 'Dosyayı indir']) {
      const button = editor.getByRole('button', { name, exact: true });
      if (!isMobile) {
        await button.hover();
        await expect(notice).toBeVisible();
        await expect(notice).toHaveText(noticeText);
        await editor.locator('h3').first().hover();
        await expect(notice).toBeHidden();
      }
      await button.focus();
      await expect(notice).toBeVisible();
      await expect(notice).toHaveText(noticeText);
      await expect(button).toHaveAttribute('aria-describedby', 'file-notice');
      await button.press('Escape');
      await expect(notice).toBeHidden();
      if (isMobile) await button.tap();
      else await button.click();
      await expect(notice).toBeVisible();
      await expect(notice).toHaveText(noticeText);
      await expect(button).toBeFocused();
      await button.evaluate(
        () =>
          new Promise<void>((resolve) =>
            requestAnimationFrame(() => resolve()),
          ),
      );
      expect(chooserCount).toBe(0);
      expect(downloadCount).toBe(0);
    }
    await editor
      .locator('#html-code')
      .fill('<p id="still-live">Live editing remains available</p>');
    await expect(
      editor.frameLocator('#preview').locator('#still-live'),
    ).toHaveText('Live editing remains available');
  });
}

test('HCJEditor fits its compact frame with usable panes, preview and original controls', async ({
  page,
}) => {
  const editor = await openEditor(page);
  const bounds = await editor.locator('body').evaluate((body) => ({
    viewportHeight: innerHeight,
    viewportWidth: innerWidth,
    documentHeight: document.documentElement.scrollHeight,
    documentWidth: document.documentElement.scrollWidth,
    areas: [...body.querySelectorAll('textarea, #preview, footer button')].map(
      (area) => {
        const { top, bottom, left, right, width, height } =
          area.getBoundingClientRect();
        return { top, bottom, left, right, width, height };
      },
    ),
  }));
  expect(bounds.documentHeight).toBeLessThanOrEqual(bounds.viewportHeight);
  expect(bounds.documentWidth).toBeLessThanOrEqual(bounds.viewportWidth);
  for (const area of bounds.areas) {
    expect(area.width).toBeGreaterThanOrEqual(44);
    expect(area.height).toBeGreaterThanOrEqual(44);
    expect(area.top).toBeGreaterThanOrEqual(0);
    expect(area.bottom).toBeLessThanOrEqual(bounds.viewportHeight);
    expect(area.left).toBeGreaterThanOrEqual(0);
    expect(area.right).toBeLessThanOrEqual(bounds.viewportWidth);
  }
});

test('HCJEditor isolates user code from host DOM/storage and restricts preview network APIs/assets', async ({
  page,
}) => {
  const requests: Request[] = [];
  page.on('request', (request) => {
    if (request.url().includes('editor-leak-proof')) requests.push(request);
  });
  const editor = await openEditor(page);
  await expect(editor.locator('#preview')).toHaveAttribute(
    'sandbox',
    'allow-scripts',
  );
  await editor
    .locator('#html-code')
    .fill(
      '<p id="proof"></p><img alt="blocked remote asset" src="https://example.invalid/editor-leak-proof-image">',
    );
  await editor.locator('#js-code').fill(`
    const blocked = [];
    try { parent.document.body.dataset.editorLeak = 'bad'; } catch { blocked.push('parent'); }
    try { top.document.body.dataset.editorLeak = 'bad'; } catch { blocked.push('top'); }
    try { localStorage.setItem('editor-isolation-proof', 'bad'); } catch { blocked.push('storage'); }
    fetch('https://example.invalid/editor-leak-proof-fetch').catch(() => {
      blocked.push('fetch'); document.querySelector('#proof').textContent = blocked.join(',');
    });
  `);
  const preview = editor.frameLocator('#preview');
  await expect(preview.locator('#proof')).toHaveText(
    'parent,top,storage,fetch',
  );
  // Chromium emits a request event even when CSP blocks before network I/O;
  // WebKit omits those events. Every emitted attempt must fail specifically by CSP.
  await expect
    .poll(() =>
      requests.every((request) =>
        /csp|content security policy/i.test(request.failure()?.errorText ?? ''),
      ),
    )
    .toBe(true);
  await expect(preview.locator('img')).toHaveJSProperty('naturalWidth', 0);
  expect(
    await page.evaluate(() => document.body.dataset.editorLeak),
  ).toBeUndefined();
  expect(
    await page.evaluate(() => localStorage.getItem('editor-isolation-proof')),
  ).toBe('host-only');
  await expect(
    preview.locator('meta[http-equiv="Content-Security-Policy"]').first(),
  ).toHaveAttribute('content', /connect-src 'none'/);
});
