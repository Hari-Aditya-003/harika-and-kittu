# Original artwork and typography

The mandap image is an original illustration generated with the built-in image generation tool, then compressed into `public/images/mandap.webp` (1400 × 933). No artwork from DreamsInvite or the reference screenshots was reused.

The production prompt was:

> Use case: illustration-story. Asset type: original hero illustration for a premium Hindu wedding invitation website. Create a fine hand-painted Indian miniature / Pichwai-inspired ceremonial mandap illustration on a clean warm ivory parchment background (#F8F1E4), landscape 3:2 composition. Symmetrical delicately carved sandstone and antique gold mandap with four slender columns, scalloped arches, lush hanging white jasmine and muted rose-pink floral garlands, brass diyas, banana leaves at sides, a red and gold traditionally dressed Indian bride seated left and ivory and maroon traditionally dressed Indian groom seated right, both seated on floor beside a small sacred square havan kund at exact bottom center with a gentle golden fire. Elegant mature intricate painted people, tasteful spiritual scene, exquisite delicate architectural detail and muted watercolor botanical details. Centered complete pavilion silhouette, all columns and roof fully visible, airy ivory negative space around edges, background blends seamlessly to solid #F8F1E4 at outermost edges. Palette warm cream, muted maroon, antique gold, desaturated sage. Flat hand-painted fine-art illustration, not photorealistic, not 3D, not childish cartoon, not clip art. No text, no lettering, no logo, no watermark. No cropped artwork.

`public/images/social-preview.jpg` is a locally composed share card using that illustration. Its displayed names should also be updated if the couple changes.

The Ganesh line art, botanical borders, lotus, lamps, procession characters, elephants, palanquin, animated flames and temple architecture are original SVG components in `src/components/Artwork.tsx`. They remain editable as code. The animated scenes use CSS transforms rather than video or large animation dependencies.

The quiet bell sequence is original Web Audio synthesis, off by default and started only by the sound button. No third-party recording is used.

Cormorant Garamond, DM Sans and Noto Serif Devanagari are self-hosted WOFF subsets. Their SIL Open Font License files are included beside them in `public/fonts/`. The bundled Devanagari subset retains shaping features and the Devanagari Unicode block; extend the subset if adding a different script.

Reference URL, retained exactly:

https://www.dreamsinvite.com/akshar-weds-priya?utm_source=Pinterest&utm_medium=organic

The URL returned no usable page content during reference research. The four required screenshots, the full-page screenshot, and the remaining supplied visual references were inspected locally. Those screenshots are reference material, excluded from the deployment bundle.

## Current temple and procession

The temple image now uses the owner-supplied 17 November 2026 screenshot, optimized as `public/images/opening/temple-gold.webp`. The illustrated procession sheets remain in the opening asset directory as WebP. Duplicate source JPG files were removed after verifying the components reference the WebP versions.
