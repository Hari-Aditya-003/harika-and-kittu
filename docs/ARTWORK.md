# Original artwork and typography

The mandap image is an original illustration generated with the built-in image generation tool, then compressed into `public/images/mandap.webp` (1400 × 933). No artwork from DreamsInvite or the reference screenshots was reused.

The production prompt was:

> Use case: illustration-story. Asset type: original hero illustration for a premium Hindu wedding invitation website. Create a fine hand-painted Indian miniature / Pichwai-inspired ceremonial mandap illustration on a clean warm ivory parchment background (#F8F1E4), landscape 3:2 composition. Symmetrical delicately carved sandstone and antique gold mandap with four slender columns, scalloped arches, lush hanging white jasmine and muted rose-pink floral garlands, brass diyas, banana leaves at sides, a red and gold traditionally dressed Indian bride seated left and ivory and maroon traditionally dressed Indian groom seated right, both seated on floor beside a small sacred square havan kund at exact bottom center with a gentle golden fire. Elegant mature intricate painted people, tasteful spiritual scene, exquisite delicate architectural detail and muted watercolor botanical details. Centered complete pavilion silhouette, all columns and roof fully visible, airy ivory negative space around edges, background blends seamlessly to solid #F8F1E4 at outermost edges. Palette warm cream, muted maroon, antique gold, desaturated sage. Flat hand-painted fine-art illustration, not photorealistic, not 3D, not childish cartoon, not clip art. No text, no lettering, no logo, no watermark. No cropped artwork.

`public/images/social-preview.jpg` is a locally composed share card using that illustration. Its displayed names should also be updated if the couple changes.

The botanical borders, lotus, lamps, fallback procession, animated flames and fallback temple architecture are original SVG components in `src/components/Artwork.tsx`. The animated scenes use CSS transforms rather than video or large animation dependencies.

The quiet bell sequence is original Web Audio synthesis, off by default and started only by the sound button. No third-party recording is used.

Cormorant Garamond, DM Sans and Noto Serif Devanagari are self-hosted WOFF subsets. Their SIL Open Font License files are included beside them in `public/fonts/`. The bundled Devanagari subset retains shaping features and the Devanagari Unicode block; extend the subset if adding a different script.

Reference URL, retained exactly:

https://www.dreamsinvite.com/akshar-weds-priya?utm_source=Pinterest&utm_medium=organic

The reference website was inspected in Chrome on 17 November 2026. The four required screenshots, the full-page screenshot, and the remaining supplied visual references were inspected locally. Those screenshots are reference material, excluded from the deployment bundle.

## Current temple and procession

The temple image now uses the owner-supplied 17 November 2026 screenshot, optimized as `public/images/opening/temple-gold.webp`. The opening uses a continuous original procession illustration with a subtle CSS sway. The superseded sprite sheets have been removed.


## Ganesh emblem and continuous procession

Both images were generated with the built-in image-generation tool on 17 November 2026 and optimized to transparent WebP for mobile delivery.

- `public/images/opening/ganesh-emblem.webp` is an original seated Ganesh, antique-gold oval scrollwork and maroon lotus emblem inspired by the supplied style reference.
- `public/images/opening/wedding-procession.webp` is one continuous miniature-style scene with elephants, musicians and a bridal palanquin. It replaces frame-based loading artwork.

The Ganesh prompt requested a dignified seated Lord Ganesha with four traditionally posed arms, blessing hand, ornate crown, jewellery and lotus seat, antique sculpted gold with maroon enamel, a symmetrical oval scrollwork frame and small lotus flowers, a strong silhouette readable at phone size, and a transparent background without lettering or watermarks.

The procession prompt requested a panoramic traditional Indian miniature watercolor illustration, ceremonial elephants at each end, dhol and brass musicians, bearers carrying a red bridal palanquin, mature proportioned figures sharing one ground line, cream, sage, maroon and antique gold costumes, a coherent continuous scene, and a transparent background without labels or watermarks.
