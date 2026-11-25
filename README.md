# İlhan Kılıç — Personal portfolio

A bilingual, static portfolio tracing my development from a first Python game in 2024 to mobile applications and research projects. Racker and SecureFace lead the showcase; the journey keeps earlier experiments and paused work in context.

## Stack

Astro 7, strict TypeScript, Tailwind CSS 4, locally served Manrope, and small native browser scripts for theme and navigation. No UI framework, backend, analytics, or runtime API calls. GitHub Actions validates the site and deploys approved main-branch changes to GitHub Pages.

## Local development

Use Node.js 24 LTS and npm. The exact dependency versions are locked in `package-lock.json`.

```sh
npm ci
npm run dev
```

The development server is at `http://localhost:4321`. Production checks:

```sh
npm run check
npm run lint
npm run format:check
npm run build
npm run test:content
npx playwright install chromium webkit
npm test
npm run preview
```

`npm run format` formats the source. Browser tests start the production preview automatically when it is not already running. See [development notes](docs/DEVELOPMENT.md) for the checkout-local Windows runtime and test scope.

## Content management

`src/data/projects.ts` is the single public content source. To add a project, add one typed `Project` entry with a unique ID, slug, year, timeline order, technologies, category, visibility, and both translations. Lists, detail pages, journey entries and both language routes are generated from it. Set `featured` to an ordering number or `currentlyBuilding` to `true` as appropriate.

Optional detail fields include overview, personal contribution, process, technical details, lessons, cover image, gallery, repository and demo URLs. Missing sections are omitted. A team project’s personal contribution is separate from the overall description. Status is optional when it has not been established; absence does not mean completion.

Only publish approved information. `visibility: 'private'` describes the source repository, **not access control**. All text and imported assets in this repository must be safe for a public build. Never add private code, confidential notes, personal messages, or unapproved screenshots.

## Localization

English is at `/`; Turkish is under `/tr/`. Shared UI translations and route helpers live in `src/i18n/index.ts`; project text lives in each project’s `translations` field. The language switch links to the corresponding page. There is no automatic language redirect. Error pages are at `/404.html` and `/tr/404/`; GitHub Pages serves the root error page for unknown addresses.

## Structure

```text
src/
  components/         Shared pages, navigation, projects and timeline
  data/               Public profile and project inventory
  i18n/               UI translations and route helpers
  layouts/            Document head and shared page shell
  pages/              Static entry points and generated localized routes
  styles/             Design tokens and responsive styles
  types/              Strict content contracts
tests/                Browser and built-output checks
public/               Favicon and robots.txt
docs/                 Assets, design and development notes
.github/workflows/    Validation and main-only Pages deployment
```

## Assets

Approved real project imagery lives in `src/assets/images/` and is mapped in `src/data/project-images.ts`. It includes the supplied Racker compositions, original historical screenshots, interface galleries and an About portrait. Missing approved imagery falls back to text. The shared screenshot component uses Astro optimization, responsive widths, intrinsic dimensions and lazy loading. Portrait screenshots preserve their native aspect ratio; covers are never forced into a landscape crop. Gallery links expose only sanitized full-size images. Add localized alt text and remove sensitive data and metadata before committing. Manrope is served locally with its OFL license in `public/fonts/Manrope-OFL.txt`.

Profile links and optional résumé information are centralized in `src/data/profile.ts`. See [the asset checklist](docs/ASSETS.md) before adding files. A technical writing section can be added as a separate content collection later; no empty blog is published.

## GitHub Pages

Target: [ilhanbuilds.github.io](https://ilhanbuilds.github.io).

In repository **Settings → Pages → Build and deployment**, choose **GitHub Actions**. The workflow checks pull requests and foundation-branch pushes. Only a successful main-branch validation may deploy. The Astro configuration uses the user-site URL with no subdirectory base. Merge the feature PR only after review; creating the PR does not publish the portfolio.

Further details: [design](docs/DESIGN.md), [development](docs/DEVELOPMENT.md), [assets](docs/ASSETS.md).

For a local visual review, run `node scripts/capture-review.mjs <output-directory>` while the production preview is running. This saves ten real full-page Chromium screenshots and a local review index outside the public site. The current second-phase delivery is documented in [the Turkish phase 2 report](docs/PHASE_2_TR.md).
