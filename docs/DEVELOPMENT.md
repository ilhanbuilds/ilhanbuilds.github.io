# Development

## Runtime

Use Node.js 24 LTS and npm 10 or newer. Astro 7.4.13 requires Node.js 22.23.4 or newer. Dependencies are exact-pinned and the lockfile is committed. CI uses Node 24.

During initial development the machine’s system Node was 22.16.0, so Node 24.22.3 was installed only under ignored `.tools/`. The operating-system installation was left unchanged. If working in that checkout before upgrading system Node, use PowerShell:

```powershell
$env:Path = "$PWD\.tools\node_modules\node\bin;$env:Path"
$env:ASTRO_TELEMETRY_DISABLED = '1'
& '.\.tools\node_modules\node\bin\node.exe' 'C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js' run dev
```

Replace `run dev` with other npm commands as needed. The local runtime is an environment convenience, not a production dependency. Fresh installations should use a normal Node 24 LTS installation and `npm ci`.

## Architecture

All HTML is generated at build time. The root page and catch-all static route use the same typed page components. A single approved project inventory generates showcase, archive, detail and timeline content in both languages. Optional fields are rendered only when supplied. Team descriptions cover shared work; there is no separate personal contribution field. No external service is needed at runtime.

The content contract supports additional screenshots and detail sections without changing route code. Future technical articles can use a separate Astro content collection without changing the project model. Do not publish empty sections in advance.

## Checks

`npm run check` checks Astro and strict TypeScript. ESLint uses the current Astro plugin and TypeScript rules. Prettier handles Astro, TypeScript, CSS, JSON, Markdown and workflow formatting.

Build first, then run `npm run test:content`. This inspects generated output for the exact approved project route inventory, sitemap counts, common secret patterns, tracking services and private source URLs. It is a regression guard; manual review of any new public content remains necessary. Keep excluded project names out of public content and test fixtures as well.

`npm test` uses Playwright Chromium and WebKit. It checks all canonical English/Turkish content routes and legacy redirects, internal links, metadata, language pairing, fully loaded images, native project-image ratios, the explicitly cropped square portrait, brand/theme colors, favicon and Open Graph assets, purpose-labeled contacts, gallery lightbox and full-size image fallback, theme persistence, blocked storage, mobile menu, keyboard skip navigation, chronology, seven responsive widths and automated WCAG checks in both themes. The layout-shift budget is measured in Chromium because WebKit does not expose the same Layout Instability API. Tests also save home and Turkish project timeline screenshots into ignored `test-results/`. Reports are available with `npx playwright show-report`. CI uploads test reports and screenshots for seven days.

`node scripts/capture-review.mjs <output-directory>` captures 120 full-page views: every canonical/error page in both languages, themes and desktop/mobile viewports. The preview must be running first. The default destination is ignored `.tools/PortfolioReview`; delivery review output is saved to the desktop `PortfolioReview` folder when requested. The script writes screenshots and a local HTML index, not public website content.

These are browser emulations, not acceptance tests on physical Samsung or iPhone devices. Chromium verifies that the skip link is first in the tab order. Windows WebKit defaults to tabbing to form controls, so its skip-link test explicitly focuses the link before checking keyboard activation and the resulting main-content focus. Automated accessibility checks do not replace manual screen-reader review. Lighthouse results are only reported if actually measured.

## Git and deployment

Initial feature branch: `feat/portfolio-foundation`. Use Conventional Commits; never force-push or merge main without explicit approval. An empty remote needs a minimal initial main commit before GitHub can compare a feature pull request. The actual portfolio implementation stays on the feature branch for review.

In GitHub Settings → Pages, select GitHub Actions. The workflow installs with `npm ci`, checks types, lint and formatting, builds the site, runs content and browser tests, and uploads a Pages artifact only for main. Deployment has `pages: write` and `id-token: write`; validation has read-only repository access. Pull requests cannot deploy.

The custom root `404.html` is the Turkish GitHub Pages fallback, with a dedicated English error page at `/en/404/`. There are no server routes. The sitemap excludes errors and legacy `/tr/` aliases; every regular page includes its canonical, English/Turkish alternatives and Turkish `x-default`.

Language preference is remembered in localStorage as `locale`. Only the unprefixed home page uses a saved English choice to redirect; explicit deep links are authoritative. Legacy `/tr/` redirects set Turkish and preserve query/fragment data. They use a static HTML refresh fallback when JavaScript is disabled, because GitHub Pages cannot serve custom server-side redirect rules.

Approved résumé files are copied verbatim from the supplied assets into `public/documents/`. Their one-page layout, absence of phone numbers and five URI annotations per file were reviewed using pypdf and rendered PNGs. Built-output SHA-256 tests and real browser downloads verify that source, public and downloaded bytes match. Replacing a PDF requires a fresh review and updating its approved hash; do not regenerate or edit the PDFs automatically.

`node scripts/generate-brand-assets.mjs` regenerates the slash PNG icons and the 1200 × 630 social card from code, using the existing Playwright Chromium installation and bundled Manrope font. Run this only when intentionally updating branding; no reference collage or profile photograph is included. Browser binaries must be installed (`npx playwright install chromium`).

## v1 demos and production verification

`public/demos/` contains only the reviewed, standalone static adaptations and independent cube simulator. Their HTML pages are noindex and intentionally absent from the 28-page sitemap. Project detail wrappers defer iframe creation until the compact host approaches the viewport. Keep `allow-same-origin` out of every sandbox; All outer frames allow scripts only; HCJEditor file operations are disabled and no download privilege is required. A no-JavaScript visitor retains the project content, images, CV and source/store links.

The v1 experience suite adds home identity/actions, actual card-body navigation, descending chronology, viewport-deferred demo loading, integrated frame interaction, draggable recorded SecureFace comparison and local Racker/Bilekten simulations. It visits every localized content page in both themes at desktop/mobile widths. The legacy, editor and cube suites test original behavior, disabled file actions, live editing, engine rules and host DOM/storage isolation. None of these establishes physical-device acceptance.

`node scripts/capture-demo-review.mjs <output-directory>` captures 56 demo/preview combinations and writes a separate local `demos.html` gallery. The screenshot viewport covers the full document so Chromium paints opaque-origin iframe content in full-page captures; the embedded frame dimensions remain unchanged. No source photograph is altered.

After a reviewed release is deployed, set `PORTFOLIO_BASE_URL=https://ilhanbuilds.github.io` when running Playwright. The same suite then uses production and does not start a local server. Keep production output in a separate ignored results directory. Run content/build privacy checks before merge, wait for CI, and verify production before creating the v1.0.0 tag/release. This task's user explicitly authorized that single PR/release sequence subject to passing checks; the general approval rule in AGENTS.md remains unchanged.

The workflow runs Lighthouse 13.6.0 on five initial mobile pages using default GPU flags and checks performance ≥90, accessibility/best practices/SEO 100 and CLS <0.1 with `scripts/check-lighthouse.mjs`. Results are included in the existing CI review artifact. Above-fold project covers are eager; later images and every interactive demo remain deferred. Native image ratios are reserved in CSS before decoding, including portrait covers.

## v1.1 review workflow

Work from `feat/portfolio-visual-refinement` and PR #2. The final release request authorizes merge, Pages deployment and v1.1.0 release only after acceptance criteria and the last commit CI succeed. Journey aliases are noindex redirects to matching Work URLs with query/hash preserved; the sitemap now has 28 canonical content URLs. Cover approval hashes are in `tests/fixtures/approved-covers.json`; never add the excluded third-party face or misleading cover claims to source/build. New browser checks cover 2:1 contain frames, language-specific artwork, redirect locale persistence, galleries and lightbox keyboard/touch/focus. Existing security assertions remain; file-operation checks now verify disabled behavior.
