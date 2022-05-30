#!/bin/sh

set -e

npm run typecheck
npm run stylecheck

npm run build:css
npm run build:js
npm run update-journal-css

podman build -t reflekt-frontend:1.0 .
