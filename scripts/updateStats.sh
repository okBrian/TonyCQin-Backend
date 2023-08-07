#!/bin/bash

# Stores GITHUB_TOKEN
source scripts/config.sh

# Run Node Program
node src/updateStats/updateStats

# Change Directory
cd ..
cd TonyCQin.github.io
# Git Stuff
git add *
git commit -m "Scheduled Updating Stats, Pog"
git push https://$GITHUB_TOKEN:x-oauth-basic@github.com/TonyCQin/TonyCQin.github.io.git main