# HCJEditor demo provenance and isolation

The public original was inspected read-only at `Desktop/exprojects/Projects/HCJEditor`. Source: [ilhanbuilds/HCJEditor](https://github.com/ilhanbuilds/HCJEditor). No original file was modified.

Original SHA-256:

- `index.html`: `558b2a5a00e6868eeefa46c50a0033757f41eefaaa791c46426a326bbf6f21a3`
- `style.css`: `87e1049465858fa8e9ce3e58323760a91f461a62764759b5cc36845322ea0a7f`
- `script.js`: `4debcb4922feb87b226a9a9ce683f5de11b32307927bfd4eb9c3a88b6a7ccb01`

`public/demos/hcjeditor.html` combines the original dark three-pane UI and controls into a standalone file: live HTML/CSS/JS preview and original Tab snippets/Enter indentation. The desktop appearance and original open/save icons are retained. Mobile panes stack; the preview fills the remaining frame height without placing controls over the preview. Accessible labels, Escape-then-Tab editor exit and reduced motion are preserved. `?lang=en` localizes the demo instructions, labels and notices; Turkish is the default.

Only in this portfolio copy, both file buttons show a short notice on hover, keyboard focus or touch/click. They do not open a modal, invoke a file chooser, read/upload files or download code. All importer, file input, FileReader, Blob export and modal code has been removed. The original HCJEditor repository remains unchanged. Editing stays in memory; closing/reloading discards it.

The portfolio loads this editor directly in an outer iframe with **only** `sandbox="allow-scripts"`. Preview user code runs in a further iframe with the same restriction; neither frame has `allow-same-origin` or `allow-downloads`. The user code cannot read/change the editor or portfolio DOM/storage, open popups, navigate the top page, download files, or submit forms. The application sends no code/files to any service. CSP blocks network connections, remote images/fonts/scripts, nested frames, objects, base URLs and form actions. Data/blob preview images remain usable locally. The outer editor only permits its `about:srcdoc` preview frame; obsolete blob frame sources were removed.

CSP and iframe sandbox are not a universal network jail: browsers still permit user code to navigate its own opaque preview frame, and code may consume CPU until the preview is closed. The application never initiates such navigation. It does not claim to run hostile arbitrary code safely on behalf of a server; the preview is confined from the portfolio. This platform limit is documented rather than misrepresented as complete outbound-network isolation.

There is no backend, remote library, external example, persistence or telemetry.

Tests cover live HTML/CSS/JS, original shortcuts, localized notices on hover/focus/touch, absence of file choosers/downloads/file inputs, usable bounded layout, host DOM/storage isolation, and blocked fetch/remote-image attempts. Physical mobile devices and manual assistive-technology acceptance are not implied by emulation tests.
