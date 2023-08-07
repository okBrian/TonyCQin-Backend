#!/bin/bash

# Run Node Program
node resetSnapshots

# Change Directory
cd ..
cd ..
# Git Stuff
git add *
git commit -m "Resetting Snapshot Points, :("
git push origin main

# Git Auth
echo "brianok924@gmail.com"
echo "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"