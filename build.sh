#!/bin/bash

set -e

if [ "$1" != "--skipChecks" ]
then
  echo "Running type & style checks (add --skipChecks to bypass)"
  npm run typecheck
  npm run stylecheck
fi

npm run build:css
npm run build:js
npm run update-journal-css

podman build -t markusklinga/reflekt-front:0.1 .

podman push markusklinga/reflekt-front:0.1
