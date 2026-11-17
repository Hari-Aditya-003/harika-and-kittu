# Verification

The current verification results are recorded after cleanup and rebuilding. Earlier Lighthouse results applied to an older opening implementation and should be measured again for the current artwork.

The existing QR payload was decoded to `https://hari-aditya-003.github.io/harika-and-kittu/` using Apple Vision. The QR images are preserved in `public/` and in the deployment ZIP.

Live Vultr HTTPS and domain checks require the server and domain details. Physical iPhone and Android camera scans remain pending.

Current cleanup build passes strict TypeScript checking and all 11 regression tests. The deployment script passes `bash -n`. The static ZIP is rebuilt by `npm run package:site`, with checksums generated alongside it.
