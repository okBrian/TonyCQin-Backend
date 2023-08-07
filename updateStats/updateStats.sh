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
git push https://$GITHUB_TOKEN:x-oauth-basic@github.com/TonyCQin/TonyCQin.github.io.git main
