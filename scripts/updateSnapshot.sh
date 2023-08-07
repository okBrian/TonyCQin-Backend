#!/bin/bash

# Stores GITHUB_TOKEN
source config.sh

# Run Node Program
node updateSnapshot

# Change Rel Directory
cd ..
cd ..
cd TonyCQin.github.io
# Git Stuff
git add *
git commit -m "Scheduled Updating Snapshots, Pogger"
git push https://$GITHUB_TOKEN:x-oauth-basic@github.com/TonyCQin/TonyCQin.github.io.git main