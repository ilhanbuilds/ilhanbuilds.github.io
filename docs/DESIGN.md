# Current design contract — v1.1.1

Preserve the approved minimalist visual language, original portrait, wordmark/blue accent, two themes and Turkish-root/English route structure. The 11-project Work timeline stays newest-first, max 1200px and two columns on desktop; the compact three-node detail timeline places older work left and newer work right.

- One opaque header preserves the original 104/80px top layout and compacts to 64px after about 93px. A reserved shell keeps page geometry stationary; an independent sentinel prevents threshold oscillation. Mobile navigation and native dialog layering remain accessible; reduced motion disables transitions.
- Home showcases retain their strong hierarchy with a 72rem cap and desktop-height-aware width. The original orange Racker cover is unchanged; other projects do not become full-width product landing pages.
- Racker alone gets a product identity panel, shared compact 44px Google Play CTA family and four restrained verified-feature cells. There are no gradients, glowing buttons, duplicate hero CTAs or invented official logos.
- Shared galleries use 4:3 contain cards and side-chevron native lightboxes; images remain uncropped. Racker adds nine current official store screenshots before its four retained compositions. RubikRL keeps two cube-state gallery images.
- Seven demo/comparison surfaces remain centered, compact and blue-framed. Four sandboxed iframe adaptations preserve their security; SecureFace uses recorded direct drag comparison, Racker/Bilekten use explicitly symbolic local state. HCJEditor file actions stay disabled.
- The supplied social promotion image is preserved in versioned TR/EN 1200×630 PNGs. Only the English promotional heading is localized; application UI and the source composition are not regenerated.

The original phase notes below remain historical design context. Their earlier fallbacks, file counts, navigators or pending decisions are superseded by this contract and [v1.1.1 notes](V1_1_1_TR.md).

## Historical design notes

# Design

The portfolio uses editorial typography, a consistent left edge and a restrained grid. It is a personal record of projects rather than a product sales page. Racker has the full-width primary showcase with its supplied artwork, official icon and verified Google Play link. SecureFace follows in an image-and-text row. The Work page uses bordered, fully clickable cards on a newest-first year rail; the card action links remain separate anchors. The shared Work chronology groups projects by supplied year in descending verified order. Journey URLs redirect to Work; separate Journey navigation and game comparison are removed. No start dates are invented.

## Tokens

All theme colors are defined in `src/styles/global.css` using semantic CSS variables. Light mode uses a warm `#F5F4F0` ground, `#171717` text and fine neutral rules. Dark mode uses `#111111`, `#F0F0F0`, and `#303030` rules. Text accents use `#0064CE` in light mode and `#50ADFF` in dark mode for contrast. The wordmark uses flat brand blue (`#007AFF` / `#159DFF`) with theme-aware personal-name lettering.

Manrope is served locally from `@fontsource-variable/manrope` with Latin and Turkish character support. The npm package includes its OFL license. Headers use tight tracking and modest weight. Body text starts at 16px; secondary metadata is intentionally smaller. No new decorative imagery, fake screenshots, terminal interfaces or generated illustrations are added. The owner-supplied Racker promotional compositions retain their original device frames and visual treatment. Main introduction now uses the real name, a small square portrait, clear CV/projects actions and social contacts. Secondary text contrast is stronger. Project image corners and card borders/focus states are consistent.

Project images preserve their complete frame and aspect ratio. The original portrait is the sole intentional CSS crop: square, `object-fit: cover`, `object-position: 50% 45%`, with a 12px offset blue outline. Its source bytes are unchanged. Historical interfaces are not redesigned. Project descriptions preserve the original Python and AI-assisted Unity development attribution. Calculator and HCJEditor retain compact timeline thumbnails; later application previews have more room. The shared gallery uses equal 4:3 contain canvases, compact responsive columns and a native dialog lightbox with keyboard focus containment, Escape, next/previous controls and a full-size anchor fallback.

## Interaction and accessibility

- Theme is resolved in the document head before content paints, starting with system preference and then an explicit localStorage choice.
- Theme controls remain usable if storage is blocked. System preference changes apply when no explicit choice is saved.
- The mobile menu is a normal disclosure, with visible navigation links, state labels, Escape handling and return of focus to its trigger.
- The skip link targets the main content, focus indicators are visible, and active navigation uses both color and a line.
- Status is written as text rather than conveyed through color alone.
- Motion is limited to a small hover movement and honors reduced-motion preference.

Automated accessibility checks support the WCAG 2.2 AA target but do not establish full conformance. Test real content and future assets with keyboard and assistive technology as the site evolves.

## Responsive layout

At widths below 768px, the menu becomes a disclosure, the hero becomes a single reading column, showcase items stack and the timeline switches to a natural single-column flow. The layout is tested at 360, 390, 412, 768, 1024, 1440 and 1920px. Touch controls are at least 44px square. The typographic project presentations are complete compositions, not simulated application interfaces.

## ilhanbuilds identity

The owner-supplied `logo-dark.png`, `logo-light.png` and `brand-guide.png` inform the bold, tight `/ilhanbuilds` CSS wordmark: blue slash, theme-aware `ilhan`, blue `builds`. Existing locally served Manrope keeps the weight and proportions close without an additional font dependency. No glow, monogram, gradient fill or guide collage is published. The previous masked home grid and isolated compositing layers were removed for v1. Reading surfaces, thin rules and restrained blue framing carry the brand.

The favicon is clean slash geometry in SVG. PNG browser icons (32, 180, 192, 512px) and the 1200 × 630 Open Graph card are reproducible with `scripts/generate-brand-assets.mjs`, using the existing Playwright browser and local Manrope. The OG card identifies İlhan Kılıç and his development/testing interests. The brand is used in titles, social metadata and footer; Person structured data retains the real personal name.

About uses a portrait/text two-column composition above 767px and a single reading column below. Education, labeled developer/career contacts, social profiles and localized CV links form the information block. Developer contact is primary in the home introduction and footer; the career address remains separately labeled on About. No CV or project content changes are part of this refinement.

## Interactive project presentation

Four compact inline demos initialize automatically near the viewport: the faithful IdleOyun and Calculator adaptations, the real HCJEditor with isolated preview, and an independently authored cube simulation. SecureFace uses aligned CSS crops from its approved recorded before/after image; Racker offers a gallery navigator over supplied compositions. Those previews are disclosed as recorded imagery, not live encryption or a working mobile app. No model runtime or private research code is included. DinoCore links to the verified existing external Unity build; no game binaries are copied.

The outer demo frames are opaque-origin sandboxes. HCJEditor's user-code preview is sandboxed again. No user code/files are submitted by the app. These browser controls do not claim to prevent a user script from navigating its own frame or consuming CPU. Navigating away removes the frame and releases its work; unsaved editor/Idle state is discarded. See the dedicated demo provenance documents for original sources, hashes and compatibility limits.

## v1.1 covers and detail hierarchy

Promotional artwork is explicitly captioned, uses a standard 2:1 contain canvas and never replaces the original screenshot inventory. Five approved PNG covers are optimized to WebP; their English variants are deterministic compositions with English text and the full original UI. Racker retains its exact original artwork. RubikRL/SecureFace/DinoCore retain approved screenshots because new artwork overstates or ambiguously describes features. Deepfake uses simple typography because face permission is unverified. Covers are never extracted as official logos.

Details no longer begin with a giant cover. The introduction pairs a moderate title, summary, status and technology chips with the real Racker icon or simple text identity. A single compact Projects back link remains. Original covers join the gallery so no approved screenshot disappears.

## Final card and cover adjustments

Work content is capped at 1200px. Each year retains its left-hand year/line and uses a two-column card grid from 768px, with one column below 768px. Cards share 2:1 contain media, compact padding, a consistent title/description rhythm and aligned actions; short localized card descriptions are independent of the full detail summaries. The scope is `.project-chronology`/`.work-page`, so Home's full-width Racker showcase is preserved. The generic caption below covers was removed at the owner's request; original gallery captions remain.

The four corrected covers replace the earlier screenshot/typographic card fallbacks. Deepfake uses a score-free illustrative composition, never a real model result or original third-party face. The latest exact source-to-project decisions are in `COVERS_V1_1.md`.
