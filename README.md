# Harika & Dharmendra wedding invitation

A mobile wedding invitation with a Ganesh seal, illustrated procession, gold temple opening, sacred mandap, Indian-time countdown, and independent wedding and reception details.

## Run

Use Node.js 22 or newer.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. Source HTML runs through the development server.

## Build the website ZIP

```sh
npm test
npm run package:site
```

Upload the contents of `artifacts/harika-dharmendra-invitation.zip` to a static web server. The ZIP contains `index.html`, scripts, images, fonts and QR images. `artifacts/BUILD-MANIFEST.json` records the packaged file hashes. The packaging command requires the `zip` utility, available on macOS and Ubuntu.

## Edit the wedding details

Edit `src/config/wedding.ts`, then rebuild.

- Couple names and invitation wording are configurable.
- Wedding date defaults to 23 November 2026 and reception to 25 November 2026. Confirm these and set `datesConfirmed` to true.
- Fill each event's `time` using Indian 24-hour time, plus its venue, address, city and exact Google Maps URL.
- Empty times and locations display coming-soon messages. Each event enables its own directions button when its map URL is supplied.
- The countdown uses Indian Standard Time. With an empty ceremony time it counts to the beginning of the wedding date.
- Update `siteUrl` to the owned Vultr domain when that domain is ready. The social image contains the current couple names.

## Vultr hosting

The deployment target is a Vultr Cloud Compute CPU server with Docker Engine and Docker Compose installed. The invitation is a static website and can be served without GPU resources.

Provide an existing server IP or SSH alias and a domain you own. Point the domain's DNS A record to that server. Configure an AAAA record only when the server has working IPv6. Allow inbound TCP 80 and 443. Caddy obtains and renews HTTPS certificates for the configured domain.

```sh
npm run deploy:vultr -- user@server your-domain.com
```

The deployment script builds the ZIP, copies the static output to `/srv/harika-wedding/site`, and starts the project-scoped Caddy service using `deployment/compose.yaml`. Ports 80 and 443 must be available. Existing hosting on those ports needs an appropriate virtual-host integration before running this command.

Use a short owned domain such as `harika-dharmendra.com` if it is available and you choose to register it. This is a naming suggestion. Domain ownership, availability and a purchase budget are awaiting confirmation.

Server access and a production domain have not yet been supplied, so the Vultr deployment remains pending.

References are [Vultr Cloud Compute provisioning](https://docs.vultr.com/products/compute/instances/cloud-compute/provisioning) and [Caddy HTTPS configuration](https://caddyserver.com/docs/quick-starts/https).

## Existing printed QR

The existing QR opens https://hari-aditya-003.github.io/harika-and-kittu/ . Its images live in `public/qr-code.svg`, `public/qr-code-print.png` and `public/qr-code-maroon.png`.

GitHub Pages serves the current invitation at that address during the Vultr setup. After the Vultr domain is live, set `siteUrl` to that domain and push a rebuilt package. The built HTML automatically redirects visitors arriving through `qrEntryUrl` to `siteUrl`. Test the existing printed QR again. This preserves the guest entry point through the hosting migration.

The GitHub Actions workflow builds, tests, deploys the Pages entry, and uploads a fresh static ZIP. The repository keeps the current ZIP at the requested `artifacts/harika-dharmendra-invitation.zip` path.

## Project layout

```text
src/           React components, styles and editable configuration
public/        Runtime artwork, fonts, licenses and QR images
deployment/    Vultr Caddy and Docker Compose configuration
scripts/       Packaging and Vultr deployment commands
tests/         Date, map and opening-sequence regression tests
artifacts/     Deployable ZIP and checksum manifest
docs/          Artwork provenance and verification notes
```

`node_modules/` and `dist/` are local dependency and build directories excluded from Git. Obsolete reference screenshots, duplicate QR images, unused source JPGs and superseded framed cards were removed from the project. They are recoverable from the macOS Trash cleanup folder.

The sound toggle is off by default. Skip controls and reduced-motion support provide immediate access to the invitation. See [artwork notes](docs/ARTWORK.md) and [verification](docs/VERIFICATION.md).
