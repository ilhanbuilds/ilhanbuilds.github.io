# Asset inventory and publication scope

Phase 2 inspected the supplied `PortfolioAssets` directory: **28 images and one PDF**. Of these, **26 images** were selected, plus the official Racker icon downloaded from its verified [Google Play listing](https://play.google.com/store/apps/details?id=com.ilhanki.titanlog). The repository contains 27 sanitized image assets. Original files were left unchanged.

## Imported assets

All paths below are relative to the supplied asset directory. Public copies live in `src/assets/images/` as metadata-free WebP files; screenshot copies use lossless encoding before Astro generates responsive delivery variants.

| Project     | Supplied files used                                                                                              | Placement                                                                        |
| ----------- | ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| IdleOyun    | `01-ana-menu.png`, `02-giris.png`, `03-oynanis.png`, `04-market.png`, `05-yukseltme.png`                         | Gameplay cover, historical comparison, timeline, four gallery images             |
| Calculator  | `02-islem.png`                                                                                                   | Detail cover and compact timeline preview; detected as JPEG despite its filename |
| HCJEditor   | `02-etkilesimli-onizleme.jpg`                                                                                    | Detail cover and compact timeline preview                                        |
| DinoCore    | `1.jpg`                                                                                                          | Original gameplay cover, historical comparison and timeline                      |
| Kutlumi     | `01-ana-sayfa-masaustu.png`, `03-kutlama-olusturma.png`, `04-karakter-ve-temalar.png`, `05-kutlama-zarflari.png` | Cover, timeline and three gallery images                                         |
| Lina        | All four supplied `lina-01` through `lina-04` screenshots                                                        | Dark cover, timeline, light theme, settings and welcome gallery                  |
| Racker      | `a.png`, `Android1.png`, `Android2.png`, `Saat.png`                                                              | Primary showcase cover, detail cover and Android/Wear OS gallery                 |
| SecureFace  | `anaekran.png`, `içerik.png`                                                                                     | Anonymization cover, timeline and upload gallery                                 |
| RubikRL     | `1.jpg`, `2.jpg`, `Arayüz.png`                                                                                   | Simulator cover, timeline, ordered and scrambled state gallery                   |
| Personal    | `personal/profile2.jpeg`                                                                                         | Original About portrait source; square CSS display in phase 4                    |
| Racker icon | Official Google Play icon                                                                                        | Showcase and detail identity                                                     |

The Racker files are supplied promotional compositions containing application screens and device frames. They are presented intact, without adding new mockups, generating imagery, or extracting a new interface. Gallery images link to the sanitized full-size asset for closer inspection. The orange mark inside the supplied artwork was preserved; the separate app icon is the current monochrome icon from Google Play.

## Confirmed publication scope

- The owner explicitly confirmed that Racker’s names, measurements and workout values and Kutlumi’s names, ages and messages are demo data that may be shared.
- The owner stated that SecureFace’s visible face is their own and supplied it for the portfolio. The screenshot stays within the approved public project description and does not expose private source or unpublished research results.
- Other imported screenshots were visually inspected for identifiable records, credentials, email addresses, private conversations and unapproved faces. Lina’s displayed conversation concerns interface design; no secret values were observed.
- No EXIF, XMP, IPTC or ICC metadata is retained in imported copies. Automated checks additionally inspect WebP chunks in both source assets and production output.
- The app listing was checked on 25 November 2026: Racker, developer Ilhan Builds, package `com.ilhanki.titanlog`. A live HTTP 200 response and the official page’s icon metadata were verified. No download counts or success metrics are republished.

## Files intentionally excluded

| File                          | Reason                                                                                                                                                                                                                              |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `deepfake/1.jpeg`             | Contains a recognizable face. Its origin and publication permission remain uncertain; the owner said it may be a fake face but was not sure. The project keeps its text presentation until a clearly permitted example is supplied. |
| `personal/profile.jpeg`       | Safe alternative portrait; `profile2.jpeg` was selected to avoid duplicating personal photos.                                                                                                                                       |
| `personal/ilhan_kilic_CV.pdf` | SecureFace is missing, the file includes a phone number, and this older CV was not approved for automatic publication. It was inspected without modification. The Google Play listing was verified independently.                   |

Neither the withheld image nor that older CV is copied into the repository, public assets, or build output. Phase 3 separately supplied and explicitly approved the two replacement PDFs below and the personal contact links.

## Phase 3 approved CVs and contact details

- `personal/Ilhan_Kilic_CV_Portfolyo.pdf` → `public/documents/Ilhan_Kilic_CV_Portfolyo.pdf` on Turkish pages.
- `personal/Ilhan_Kilic_CV_EN_Portfolyo.pdf` → `public/documents/Ilhan_Kilic_CV_EN_Portfolyo.pdf` on English pages.

Both files are one page, include SecureFace, contain no phone number in extracted text, and have the expected email, LinkedIn, GitHub, portfolio and Google Play URI annotations. They were visually rendered and inspected. The source PDFs were not recreated or modified; their exact bytes are guarded by SHA-256 tests. The old CV exclusion remains in force.

LinkedIn `https://www.linkedin.com/in/ilhan-kilic`, email `kilicilhan.75@gmail.com`, and GitHub `https://github.com/ilhanbuilds` are now explicitly approved and centralized in the profile. GitHub and Google Play responded HTTP 200 during review; LinkedIn blocks automated access with HTTP 999. The portfolio URLs in the PDFs are the intended post-deployment destinations and currently return 404 because production deployment has not been authorized.

## Remaining information

- A clearly permitted, sanitized Deepfake Detection image. Team work is described collectively; no separate individual contribution section is requested.
- Optional raw Racker screens for a future presentation; the supplied compositions are used in this version as requested.

## Adding or changing images

Import approved files into `src/data/project-images.ts` and attach the relevant media object in `src/data/projects.ts`. Use localized `alt` text. Supported fields are `coverImage`, `gallery`, `logo`, and an optional `timelineImage` override. The shared screenshot component supplies intrinsic dimensions, responsive WebP variants, lazy loading, and native aspect ratios. Personal imagery is centralized in `src/data/profile.ts`.

Do not add confidential notes, private code, personal messages, identifiable records, tokens, API keys, or unapproved faces to this public repository. Source visibility is not access control. Review the complete visible content before importing any future asset.

## Phase 4 brand derivatives

The supplied `logo-dark.png`, `logo-light.png` and `brand-guide.png` were inspected as references only; none is copied into the public site. The theme-aware `/ilhanbuilds` wordmark is CSS with the existing local Manrope font. `public/icons/favicon.svg` contains a flat blue slash. The derived PNGs are `favicon-32.png` (32px), `apple-touch-icon.png` (180px), `icon-192.png` (192px) and `icon-512.png` (512px). `public/site.webmanifest` lists the browser icons. `public/branding/og-image.png` is a purpose-built 1200 × 630 social card, not a guide collage.

These files are reproduced by `scripts/generate-brand-assets.mjs` using existing Playwright Chromium and bundled fonts. The original portrait and all 27 approved source images remain byte-unchanged in this phase. Only its CSS presentation changes: square crop, `object-position: 50% 45%`, and an offset outline. The guide’s representative portrait is never used. The existing two approved CV files are unchanged.

## v1 interactive sources

No additional photograph, model result, private dataset or project source image is added for v1. The unchanged personal portrait is now also used as a small CSS square on Home. SecureFace's comparison selects two aligned regions from the already approved anonymization screenshot using CSS backgrounds; the source pixels/file remain unchanged. Racker's image navigator uses the existing approved gallery. RubikRL's real supplied interface image appears in its home card and project detail.

Legacy public-app adaptations, HCJEditor isolation and independent cube behavior are documented in [legacy sources](DEMO_LEGACY_SOURCES.md), [editor sources](DEMO_EDITOR_SOURCES.md), [cube sources](DEMO_CUBE_SOURCES.md) and [DinoCore validation](DEMO_DINOCORE_SOURCES.md). The ambiguous Deepfake face remains excluded; there is no verified permission/output pair suitable for a recorded analysis demo. Private Kutlumi celebrations, original account lists, model/checkpoint files and research implementations are excluded.
