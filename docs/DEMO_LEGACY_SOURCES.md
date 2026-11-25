# Legacy application browser adaptations

The original projects were inspected **read only** in `Desktop/exprojects/Projects`. Original files were not modified. The existing approved screenshots remain the visual reference; the demos are explicitly labeled browser adaptations, rather than the Python/Windows binaries running online. They are standalone, dependency-free HTML/CSS/JavaScript and load only after the portfolio opens their sandboxed iframe.

## IdleOyun

Source: [ilhanbuilds/idleOyun](https://github.com/ilhanbuilds/idleOyun), local HEAD `e7e113919f209e9b56d89c7da81b615fd5c29edf`. Inspected files: `main.py`, `fonksiyonlar.py`, `panel.py`, `panel1.py`, `panel2.py`, `panel3.py`, `panel4.py`.

| Original file     | SHA-256                                                            |
| ----------------- | ------------------------------------------------------------------ |
| `main.py`         | `a5b809efbd309321d7e3eed27ab622c4a9cd64d807e1dabc61950d922b62b0b9` |
| `fonksiyonlar.py` | `6ac854ef6ffee2e69db99b951d8935b08cfff5c77b07683e89f81c69ea64db71` |
| `panel.py`        | `1badfc2c59f7486489f497706c7e7517386f19b47f678741b0c4342e3e9302be` |
| `panel1.py`       | `617c0155fd2adcf8c0bcf31fa21f604703e9c36c7417bcc84d1c904ef0b24616` |
| `panel2.py`       | `37f9612c8dc99d5470d4f4e5cf2d7d952cf5ed813b1dc462c327adccc5b10c68` |
| `panel3.py`       | `f964bfd0f40bcdae1c3651c380e762a5a53c4d30aadabd8bbf92b24b81b76af1` |
| `panel4.py`       | `b478e1b221b879b4e76a41162f8a1df3e07d03f2ad313218981c9d9fd0f3573f` |

The gray Qt-style windows, original Turkish labels, menu/login/registration/game/store screens and relative control positions are retained. Mobile sizes are bounded and small touch controls are enlarged without redesigning the game. Cross-platform browser rendering is a visual adaptation, not a claim of pixel-identical native Qt widgets.

`idleoyun.engine.js` follows `fonksiyonlar.py`: 10 starting click power, stock-limited +10 power upgrades, integer-truncated 1.5× prices, rebirth gated on ten power purchases, 0.1 rounded rebirth multipliers, 25 rebirth stock, prestige gated on complete stocks, doubled prestige multiplier, 5× prestige price, and original reset rules. Clicking truncates the multiplied gain as in the source. Session progress is saved when leaving Market, matching the original save point.

The original account data file was **not read, copied or published**. `Portfolyo / demo` is synthetic. Optional local registration creates only in-memory example accounts; it is not real authentication, and nothing is sent to a service or retained after reload/closing. Input validation avoids malformed account parsing. Returning from registration can prefill this session's new example account. Native window exit becomes a closed-demo screen because an iframe cannot close the visitor's browser. A blocked prestige boundary that can raise an unbound-variable exception in the Python source instead displays a refusal message. These compatibility/safety differences do not add progression features.

## Calculator

Source: [ilhanbuilds/Hesap-Makinesi-Form](https://github.com/ilhanbuilds/Hesap-Makinesi-Form), local HEAD `f4df7459052edfe78f0ec0780b39bed449bf9a46`.

| Original file                        | SHA-256                                                            |
| ------------------------------------ | ------------------------------------------------------------------ |
| `WindowsFormsApp1/Form1.cs`          | `e9aca8e212f26037cb98619e6ef321c8679cd0991ff82cef8230ae96865f2e13` |
| `WindowsFormsApp1/Form1.Designer.cs` | `fc0c44ddecae0771bfec6651e21b21096df1e9b9b797bcf347b1a0be12b1487d` |

The gray WinForms surface, darker numeric buttons, editable display, `delete`, digits, `/`, `×`, `–`, `+`, `=` and original positions/proportions are retained. There is no modern calculator UI or expression evaluator. Computation follows the original **sequential signed Int32 arithmetic**, including truncating integer division, unchecked overflow in addition/multiplication/subtraction, a standalone number followed by `=` returning `0`, and a trailing operator retaining the first result. Input is parsed explicitly; no `eval` or dynamic code execution is used.

Source crashes on empty delete/operator, malformed integer input, division by zero, and Int32 minimum divided by −1 are replaced by bounded behavior or visible error feedback. It does not add decimal arithmetic, precedence, scientific operations or keyboard shortcuts absent from the source. Native controls are approximated with CSS and scale to mobile width.

## Verification

`tests/browser/legacy-demos.spec.ts` exercises both Chromium and mobile-emulated WebKit: calculator operations/overflow/delete/error handling; registration/login, clicking, buying and session persistence; stock/price/multiplier/reset boundaries; and real use inside opaque `sandbox="allow-scripts"` frames at 320px. A sandboxed demo has no portfolio origin/storage access; CSP restricts resources to its local scripts/styles and denies connections/forms by default. No backend, external font, telemetry, original account list or private dataset is included.

The initial concurrent test run hit a shared Playwright output-folder cleanup collision. An isolated-output rerun is used to distinguish infrastructure artifacts from application behavior. Physical desktop/phone acceptance and assistive-technology testing are not implied by emulation.
