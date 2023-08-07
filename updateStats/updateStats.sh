#!/bin/bash

GITHUB_TOKEN="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"

# Run Node Program
node updateStats

# Change Directory
cd ..
cd ..
# Git Stuff
git add *
git commit -m "Scheduled Updating Stats, Pog"
git push origin main
expect "Username for 'https://github.com':\r"
send -- "brianok924@gmail.com\r"
expect "Password for 'https://brianok924@gmail.com@github.com':\r"
send -- "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\r"
expect eof