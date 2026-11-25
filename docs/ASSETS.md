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
| Personal    | `personal/profile2.jpeg`                                                                                         | About portrait, preserving the complete frame                                    |
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

Neither the withheld image nor the CV is copied into the repository, public assets, or build output. Contact details from the older CV were not transferred to the profile automatically.

## Remaining information

- A clearly permitted, sanitized Deepfake Detection image and any approved individual contribution description for the team projects.
- An updated public CV with the desired project coverage and contact information, explicitly approved for publication.
- Confirmation of the LinkedIn URL and contact email to expose on the website.
- Optional raw Racker screens for a future presentation; the supplied compositions are used in this version as requested.

## Adding or changing images

Import approved files into `src/data/project-images.ts` and attach the relevant media object in `src/data/projects.ts`. Use localized `alt` text. Supported fields are `coverImage`, `gallery`, `logo`, and an optional `timelineImage` override. The shared screenshot component supplies intrinsic dimensions, responsive WebP variants, lazy loading, and native aspect ratios. Personal imagery is centralized in `src/data/profile.ts`.

Do not add confidential notes, private code, personal messages, identifiable records, tokens, API keys, or unapproved faces to this public repository. Source visibility is not access control. Review the complete visible content before importing any future asset.
