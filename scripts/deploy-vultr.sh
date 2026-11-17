#!/usr/bin/env bash
set -euo pipefail
host=${1:?Usage: bash scripts/deploy-vultr.sh user@server your-domain.com}
domain=${2:?Provide the domain you own}
[[ "$host" =~ ^[a-zA-Z0-9_@.:-]+$ && "$host" != -* ]] || { echo 'Invalid SSH host'; exit 1; }
[[ "$domain" =~ ^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)+$ ]] || { echo 'Invalid domain'; exit 1; }
npm run package:site
ssh "$host" 'docker compose version && mkdir -p /srv/harika-wedding/site'
rsync -az --exclude=index.html dist/ "$host:/srv/harika-wedding/site/"
rsync -az dist/index.html "$host:/srv/harika-wedding/site/"
rsync -az deployment/Caddyfile deployment/compose.yaml "$host:/srv/harika-wedding/"
ssh "$host" "cd /srv/harika-wedding && printf 'SITE_DOMAIN=%s\n' '$domain' > .env && docker compose --project-name harika-wedding up -d"
curl --fail --show-error --retry 8 --retry-delay 5 --retry-all-errors --connect-timeout 10 "https://$domain/" --output /dev/null
echo "Invitation available at https://$domain/"
