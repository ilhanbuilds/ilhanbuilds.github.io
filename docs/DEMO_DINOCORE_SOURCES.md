# DinoCore existing Unity demo validation

The existing public [DinoCore Unity WebGL build](https://ilhanbuilds.github.io/DinoCore-Evolution-Idle/) was inspected on 25 November 2026. The old README URL under `ilhanki.github.io` returns 404; the current owner URL above returns 200. No original project or build file was modified, and no Unity build resource was copied into the portfolio repository.

Read-only GitHub inspection confirmed the original `index.html` loader and its `Build/web.loader.js`, `web.framework.js.unityweb`, `web.data.unityweb` and `web.wasm.unityweb` resources. The data and WASM assets are approximately 7.4 MB and 12.2 MB respectively. An ordinary external demo link is preferred: nothing from Unity loads on a portfolio page before the visitor follows that link.

In an actual Playwright Chromium browser, the real mining game scene loaded at 960 × 600. The initial scene showed currency, production progress, the coin clicker, the mine and the original five bottom tabs. A canvas coin click produced visible floating feedback while production continued. All four build requests returned HTTP 200, with no JavaScript or console errors on the successful verification. Screenshots and a response/error log were saved only under ignored `.tools/` for delivery review.

The first attempt received a transient HTTP 503 for the framework resource and failed to start. Two following browser sessions loaded the build successfully. This external hosting dependency can change independently of the portfolio; the link is not represented as a bundled or offline game. Full economy/progression, physical mobile behavior and every Unity feature were not acceptance-tested in this task.
