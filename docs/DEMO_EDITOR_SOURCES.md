# HCJEditor demo provenance and isolation

The public original was inspected read-only at `Desktop/exprojects/Projects/HCJEditor`. Source: [ilhanbuilds/HCJEditor](https://github.com/ilhanbuilds/HCJEditor). No original file was modified.

Original SHA-256:

- `index.html`: `558b2a5a00e6868eeefa46c50a0033757f41eefaaa791c46426a326bbf6f21a3`
- `style.css`: `87e1049465858fa8e9ce3e58323760a91f461a62764759b5cc36845322ea0a7f`
- `script.js`: `4debcb4922feb87b226a9a9ce683f5de11b32307927bfd4eb9c3a88b6a7ccb01`

`public/demos/hcjeditor.html` combines the original dark three-pane UI and controls into a standalone file: live HTML/CSS/JS preview, original Tab snippets/Enter indentation, full HTML or separate HTML/CSS/JS import, and combined `index.html` download. The desktop appearance is retained; mobile panes stack and preview/footer use bounded layout rather than viewport overlays. Labels, iframe title, modal keyboard/focus handling and reduced motion were added for accessibility. The original localStorage autosave is intentionally replaced by in-memory editing so an opaque sandbox has no access to portfolio storage. Closing/reloading discards unsaved edits; users can download their work first.

The portfolio loads this editor only on request in an outer iframe with `sandbox="allow-scripts allow-downloads"`. Preview user code runs in a further iframe with **only** `sandbox="allow-scripts"`; neither frame has `allow-same-origin`. The user code cannot read/change the editor or portfolio DOM/storage, open popups, navigate the top page, download files, or submit forms. The application sends no code/files to any service; file reading and downloads use local browser APIs. CSP blocks network connections, remote images/fonts/scripts, nested frames, objects, base URLs and form actions. Data/blob images remain usable locally.

CSP and iframe sandbox are not a universal network jail: browsers still permit user code to navigate its own opaque preview frame, and code may consume CPU until the preview is closed. The application never initiates such navigation. It does not claim to run hostile arbitrary code safely on behalf of a server; the preview is confined from the portfolio. This platform limit is documented rather than misrepresented as complete outbound-network isolation.

The full-document importer retains the original regex-based extraction (one style/script block), not a general bundler. There is no backend, remote library, external example, persistence or telemetry. The downloaded file is the user's standalone HTML and is no longer governed by the online preview's sandbox; inspect it before opening elsewhere.

Tests cover live HTML/CSS/JS, original shortcuts, full/separate import, real HTML download, host DOM/storage isolation, and blocked fetch/remote-image attempts. Physical mobile devices and manual assistive-technology acceptance are not implied by emulation tests.
