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

All HTML is generated at build time. The root page and catch-all static route use the same typed page components. A single approved project inventory generates showcase, archive, detail and timeline content in both languages. Optional fields are rendered only when supplied; a separate personal contribution field prevents confusion with team descriptions. No external service is needed at runtime.

The content contract supports additional screenshots and detail sections without changing route code. Future technical articles can use a separate Astro content collection without changing the project model. Do not publish empty sections in advance.

## Checks

`npm run check` checks Astro and strict TypeScript. ESLint uses the current Astro plugin and TypeScript rules. Prettier handles Astro, TypeScript, CSS, JSON, Markdown and workflow formatting.

Build first, then run `npm run test:content`. This inspects generated output for the exact approved project route inventory, sitemap counts, common secret patterns, tracking services and private source URLs. It is a regression guard; manual review of any new public content remains necessary. Keep excluded project names out of public content and test fixtures as well.

`npm test` uses Playwright Chromium and WebKit. It checks all public English/Turkish content routes, internal links, metadata, language pairing, images, theme persistence, blocked storage, mobile menu, keyboard skip navigation, chronology, seven responsive widths and automated WCAG checks in both themes. Tests also save home and Turkish journey screenshots into ignored `test-results/`. Reports are available with `npx playwright show-report`. CI uploads test reports and screenshots for seven days.

These are browser emulations, not acceptance tests on physical Samsung or iPhone devices. Chromium verifies that the skip link is first in the tab order. Windows WebKit defaults to tabbing to form controls, so its skip-link test explicitly focuses the link before checking keyboard activation and the resulting main-content focus. Automated accessibility checks do not replace manual screen-reader review. Lighthouse results are only reported if actually measured.

## Git and deployment

Initial feature branch: `feat/portfolio-foundation`. Use Conventional Commits; never force-push or merge main without explicit approval. An empty remote needs a minimal initial main commit before GitHub can compare a feature pull request. The actual portfolio implementation stays on the feature branch for review.

In GitHub Settings → Pages, select GitHub Actions. The workflow installs with `npm ci`, checks types, lint and formatting, builds the site, runs content and browser tests, and uploads a Pages artifact only for main. Deployment has `pages: write` and `id-token: write`; validation has read-only repository access. Pull requests cannot deploy.

The custom root `404.html` is the GitHub Pages fallback, with a dedicated Turkish error page available at `/tr/404/`. There are no server routes. The sitemap excludes errors, and every regular page includes its canonical and language alternatives.
