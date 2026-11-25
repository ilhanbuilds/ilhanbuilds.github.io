# Design

The portfolio uses editorial typography, a consistent left edge and a restrained two-column grid. It is a personal record of projects rather than a product sales page. Racker has the larger showcase column; SecureFace follows with a deliberate offset. Earlier work is presented as compact rows. The journey groups projects by supplied year and preserves the approved sequence within 2026.

## Tokens

All theme colors are defined in `src/styles/global.css` using semantic CSS variables. Light mode uses a warm `#F5F4F0` ground, `#171717` text and fine neutral rules. Dark mode uses `#111111`, `#F0F0F0`, and `#303030` rules. The original light accent was deepened to `#405CC9` to support text contrast; the dark accent is `#8297F5`.

Manrope is served locally from `@fontsource-variable/manrope` with Latin and Turkish character support. The npm package includes its OFL license. Headers use tight tracking and modest weight. Body text starts at 16px; secondary metadata is intentionally smaller. No decorative images, fake screenshots, terminal interfaces or generated illustrations are used.

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
