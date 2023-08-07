#!/bin/bash

# Stores GITHUB_TOKEN
source config.sh

# Run Node Program
node resetSnapshots

# Change Directory
cd ..
cd ..
# Git Stuff
git add *
git commit -m "Resetting Snapshot Points, :("
git push https://$GITHUB_TOKEN:x-oauth-basic@github.com/TonyCQin/TonyCQin.github.io.git main