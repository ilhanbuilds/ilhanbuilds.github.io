# Final English cover localization

The eleven English project covers use the approved Turkish artwork as their visual source. The backgrounds, screen arrangement, logos, project lettering, colour families and lighting are retained. English assets are selected centrally in `src/data/covers.ts`; Turkish assets remain unchanged, including Racker's original `overview.webp`.

Only promotional copy is translated. Actual application interfaces deliberately remain in their recorded language. Product names embedded in logos, including HCJ Editör and IdleOyun, are retained. No application screen, face, logo or original owner PNG was regenerated.

## Method and limits

The available originals are flattened raster artwork, without editable text layers or original font files. Existing OpenCV and Pillow tools remove the promotional lettering within bounded regions, reconstruct the local backdrop and render natural English using Segoe UI. This is local deterministic image processing, without image generation or new dependencies. Typography is a close local substitute, not a claim of identical original font metrics. Background immediately beneath the former lettering is reconstructed; it cannot be recovered exactly from flattened artwork. The surrounding composition is preserved instead of replacing it with a generic template.

Every exported cover is 1440 × 720. Racker's original 1794 × 876 design is proportionally contained in that canvas before translation, without cropping or stretching. The Turkish original remains byte-identical. English master assets use lossless WebP to preserve decoded pixels outside the promotional regions; Astro still generates responsive delivery images. Master sizes range from approximately 100 to 613 KiB, substantially below the original PNGs; these source sizes must not be confused with measured page transfer sizes.

## Content safeguards

- RubikRL explicitly remains experimental reinforcement-learning work.
- SecureFace describes research and a team project, without asserting completed protection guarantees.
- DinoCore describes an early Unity game prototype.
- Deepfake Detection uses the existing approved score-free representative composition. Its English disclaimer states that the image is illustrative and is not an actual analysis result. No model score, timing or unapproved third-party face is reintroduced.
- Racker's Android/Wear OS identity, original phone and watch interface and gold artwork remain intact.

## Verification evidence

Local, ignored review evidence lives under `.tools/cover-localization/`: reproducible `localize.py`, the Turkish and English contact sheets, per-cover output previews and glyph masks, and `manifest.json`. The manifest records each source and output SHA-256, text-region coordinates, dimensions, encoding and the protected-pixel comparison. All eleven exports passed the exact decoded-pixel comparison outside the declared promotional rectangles. Source hashes were also compared with the committed Turkish assets. These pixel checks describe the English master files; resized delivery images naturally undergo normal browser-image encoding.

The final contact sheet was visually reviewed for English readability, retained project identity, unchanged screen content and removal of old promotional lettering. Full-resolution spot checks covered Calculator, Kutlumi, SecureFace, DinoCore, Deepfake Detection and Racker. Site-level responsive, browser, accessibility and performance verification is recorded in the overall release report.
