# Design

The portfolio uses editorial typography, a consistent left edge and a restrained grid. It is a personal record of projects rather than a product sales page. Racker has the full-width primary showcase with its supplied artwork, official icon and verified Google Play link. SecureFace follows in an image-and-text row. The Work page uses bordered, fully clickable cards on a newest-first year rail; the card action links remain separate anchors. The Journey groups projects by supplied year in descending verified order, with the original game comparison retained after the timeline. No start dates are invented.

## Tokens

All theme colors are defined in `src/styles/global.css` using semantic CSS variables. Light mode uses a warm `#F5F4F0` ground, `#171717` text and fine neutral rules. Dark mode uses `#111111`, `#F0F0F0`, and `#303030` rules. Text accents use `#0064CE` in light mode and `#50ADFF` in dark mode for contrast. The wordmark uses flat brand blue (`#007AFF` / `#159DFF`) with theme-aware personal-name lettering.

Manrope is served locally from `@fontsource-variable/manrope` with Latin and Turkish character support. The npm package includes its OFL license. Headers use tight tracking and modest weight. Body text starts at 16px; secondary metadata is intentionally smaller. No new decorative imagery, fake screenshots, terminal interfaces or generated illustrations are added. The owner-supplied Racker promotional compositions retain their original device frames and visual treatment. Main introduction now uses the real name, a small square portrait, clear CV/projects actions and social contacts. Secondary text contrast is stronger. Project image corners and card borders/focus states are consistent.

Project images preserve their complete frame and aspect ratio. The original portrait is the sole intentional CSS crop: square, `object-fit: cover`, `object-position: 50% 45%`, with a 12px offset blue outline. Its source bytes are unchanged. Historical interfaces are not redesigned. The Journey comparison connects the original Python game with the later Unity experiment and explicitly preserves AI-assisted attribution. Calculator and HCJEditor retain compact timeline thumbnails; later application previews have more room. Galleries link to sanitized full-size assets so detailed mobile compositions can be examined without building a client-side lightbox.

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

Four local demos load only after an explicit Open demo action: the faithful IdleOyun and Calculator adaptations, the real HCJEditor with isolated preview, and an independently authored cube simulation. SecureFace uses aligned CSS crops from its approved recorded before/after image; Racker offers a gallery navigator over supplied compositions. Those previews are disclosed as recorded imagery, not live encryption or a working mobile app. No model runtime or private research code is included. DinoCore links to the verified existing external Unity build; no game binaries are copied.

The outer demo frames are opaque-origin sandboxes. HCJEditor's user-code preview is sandboxed again. No user code/files are submitted by the app. These browser controls do not claim to prevent a user script from navigating its own frame or consuming CPU. Close removes the frame and releases its work; unsaved editor/Idle state is discarded. See the dedicated demo provenance documents for original sources, hashes and compatibility limits.
