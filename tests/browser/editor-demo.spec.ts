import { test, expect, type Page, type Request } from '@playwright/test';

async function openEditor(page: Page) {
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.setItem('editor-isolation-proof', 'host-only');
    const frame = document.createElement('iframe');
    frame.dataset.editorTest = 'true';
    frame.title = 'HCJEditor test';
    frame.sandbox.add('allow-scripts', 'allow-downloads');
    frame.src = '/demos/hcjeditor.html';
    frame.style.cssText = 'width:100%;height:850px';
    document.body.prepend(frame);
  });
  return page.frameLocator('[data-editor-test]');
}

test('HCJEditor preserves live HTML/CSS/JS, original shortcuts and local file import', async ({
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
  await editor
    .getByRole('button', { name: 'Dosya Yükle', exact: true })
    .click();
  await editor.locator('#full-html-file').setInputFiles({
    name: 'sample.html',
    mimeType: 'text/html',
    buffer: Buffer.from(
      '<!doctype html><html><head><style>h2{color:rgb(80,20,130)}</style></head><body><h2>Dosyadan</h2><script>document.body.dataset.loaded="yes";</script></body></html>',
    ),
  });
  await expect(editor.locator('#load-modal')).toBeHidden();
  await expect(preview.locator('h2')).toHaveText('Dosyadan');
  await expect(preview.locator('body')).toHaveAttribute('data-loaded', 'yes');
  await expect(preview.locator('h2')).toHaveCSS('color', 'rgb(80, 20, 130)');
  await editor
    .getByRole('button', { name: 'Dosya Yükle', exact: true })
    .click();
  await editor.locator('#css-file').setInputFiles({
    name: 'sample.css',
    mimeType: 'text/css',
    buffer: Buffer.from('h2{color:rgb(30,110,70)}'),
  });
  await expect(preview.locator('h2')).toHaveCSS('color', 'rgb(30, 110, 70)');
  await editor
    .getByRole('button', { name: 'Dosya Yükle', exact: true })
    .click();
  await editor.locator('#js-file').setInputFiles({
    name: 'sample.js',
    mimeType: 'text/javascript',
    buffer: Buffer.from('document.body.dataset.loaded="separate";'),
  });
  await expect(preview.locator('body')).toHaveAttribute(
    'data-loaded',
    'separate',
  );
  expect(
    await page.evaluate(() => localStorage.getItem('htmlCode')),
  ).toBeNull();
});

test('HCJEditor downloads the composed page as a real HTML file', async ({
  page,
}) => {
  const editor = await openEditor(page);
  await editor.locator('#html-code').fill('<h1>İndirilen çalışma</h1>');
  await editor.locator('#css-code').fill('h1 { color: blue; }');
  await editor
    .locator('#js-code')
    .fill('document.body.dataset.downloaded = "yes";');
  const waiting = page.waitForEvent('download');
  await editor.getByRole('button', { name: 'Dosyayı indir' }).click();
  const download = await waiting;
  expect(download.suggestedFilename()).toBe('index.html');
  const stream = await download.createReadStream();
  const chunks: Buffer[] = [];
  for await (const chunk of stream) chunks.push(Buffer.from(chunk));
  const source = Buffer.concat(chunks).toString('utf8');
  expect(source).toContain('<h1>İndirilen çalışma</h1>');
  expect(source).toContain('color: blue');
  expect(source).toContain('dataset.downloaded');
  expect(source).toContain('</script>');
  expect(source).not.toContain('editor-isolation-proof');
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
