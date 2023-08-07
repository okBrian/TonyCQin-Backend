#!/bin/bash

GITHUB_TOKEN="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"

# Run Node Program
node updateStats

# Change Rel Directory
cd ..
cd ..
cd TonyCQin.github.io
# Git Stuff
git add *
git commit -m "Scheduled Updating Stats, Pog"
curl -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -d '{"title": "'Testing!'", "base": "'main'", "head": "'main'"}' \
  "https://api.github.com/repos/TonyCQin/TonyCQin.github.io/pull"

git push origin main