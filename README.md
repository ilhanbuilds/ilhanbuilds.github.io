# İlhan Kılıç — Personal portfolio

A bilingual, static portfolio tracing my development from a first Python game in 2024 to mobile applications and research projects. Racker and SecureFace lead the showcase; the newest-first project timeline keeps earlier experiments and paused work in context.

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

`src/data/projects.ts` is the single public content source. To add a project, add one typed `Project` entry with a unique ID, slug, year, timeline order, technologies, category, visibility, and both translations. Lists, detail pages, timeline cards and both language routes are generated from it. Set `featured` to an ordering number or `currentlyBuilding` to `true` as appropriate.

Optional detail fields include overview, process, technical details, lessons, cover image, gallery, repository and demo URLs. Missing sections are omitted. SecureFace and Deepfake Detection are described as shared team work, without separate individual contribution sections. Status is optional when it has not been established; absence does not mean completion.

Only publish approved information. `visibility: 'private'` describes the source repository, **not access control**. All text and imported assets in this repository must be safe for a public build. Never add private code, confidential notes, personal messages, or unapproved screenshots.

## Localization

Turkish is the default at `/`; English is under `/en/`. Shared UI translations and route helpers live in `src/i18n/index.ts`; project text lives in each project’s `translations` field. The language switch links to the corresponding page and remembers the choice in localStorage. Visiting `/` with an English preference opens `/en/`; explicit localized deep links take priority and update the preference. Storage-blocked and JavaScript-disabled visitors can use normal language links.

Old `/tr/…` addresses are static noindex redirects to their root Turkish counterparts, preserving query parameters and fragments with JavaScript and providing a no-JavaScript refresh/link fallback. Previous unprefixed addresses remain valid as Turkish pages; their English counterparts now live under `/en/`. Error pages are at `/404.html` and `/en/404/`; GitHub Pages serves the root Turkish error page for unknown addresses. The sitemap lists only the 28 canonical content pages and includes language alternatives.

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
public/               Brand/browser assets, CVs and robots.txt
docs/                 Assets, design and development notes
.github/workflows/    Validation and main-only Pages deployment
```

## Assets

Approved real project imagery lives in `src/assets/images/` and is mapped in `src/data/project-images.ts`. It includes the supplied Racker compositions, original historical screenshots, interface galleries and an About portrait. Missing approved imagery falls back to text. The shared screenshot component uses Astro optimization, responsive widths, intrinsic dimensions and lazy loading. Project screenshots preserve their native aspect ratio; covers are never forced into a landscape crop. The unchanged personal portrait is displayed as an intentional square CSS crop with a face-preserving object position. Gallery links expose only sanitized full-size images. Add localized alt text and remove sensitive data and metadata before committing. Manrope is served locally with its OFL license in `public/fonts/Manrope-OFL.txt`.

Confirmed profile links and locale-specific résumé paths are centralized in `src/data/profile.ts`. The two approved one-page PDFs are copied unchanged to `public/documents/`; Turkish pages download the Turkish PDF and English pages the English PDF. Hash tests guard their original bytes. See [the asset checklist](docs/ASSETS.md) before adding files. A technical writing section can be added as a separate content collection later; no empty blog is published.

## GitHub Pages

Target: [ilhanbuilds.github.io](https://ilhanbuilds.github.io).

In repository **Settings → Pages → Build and deployment**, choose **GitHub Actions**. The workflow checks pull requests and foundation-branch pushes. Only a successful main-branch validation may deploy. The Astro configuration uses the user-site URL with no subdirectory base. Merge the feature PR only after review; creating the PR does not publish the portfolio.

Further details: [design](docs/DESIGN.md), [development](docs/DEVELOPMENT.md), [assets](docs/ASSETS.md).

For a local visual review, run `node scripts/capture-review.mjs <output-directory>` while the production preview is running. This saves 120 real full-page Chromium screenshots covering every localized content/error page in both themes and desktop/mobile viewports, and a local review index outside the public site. Current delivery notes are in [the Turkish v1 report](docs/V1_TR.md); [phase 3](docs/PHASE_3_TR.md) and [phase 2](docs/PHASE_2_TR.md) remain historical records.

The detail pages include faithful browser adaptations of IdleOyun/Calculator, the real sandboxed HCJEditor, an independent cube simulation, a recorded SecureFace comparison and a Racker image navigator. The four iframe experiences load near the viewport; no AI inference or live encryption is claimed. DinoCore uses its existing external Unity demo. Source provenance and compatibility limits are documented in `docs/DEMO_*_SOURCES.md`. No new dependencies or private project sources were added.

## v1.1 visual refinement (draft)

The current branch is `feat/portfolio-visual-refinement`, based on v1.0.0 main. New reviewed 2:1 promotional covers and localized English compositions are separate from the original screenshot galleries. Details use compact typography, direct deferred demos and an accessible image lightbox. Journey navigation/comparison is removed; `/journey/`, `/en/journey/` and `/tr/journey/` redirect to the matching Work page. See `docs/COVERS_V1_1.md` and `docs/V1_1_TR.md` for the excluded claim/face artwork and verification. No v1.1 production deployment or release is authorized.

Bilekten is the eleventh approved project: an unpublished Kotlin/Jetpack Compose Android and Wear OS project, paused for later continuation. It follows Racker in development history and appears immediately above it in the newest-first list. Only owner-supplied media and a concise approved description are public; no private source/repository link or device-control web demo is included.
