#!/usr/bin/env bash

# Exit if any command fails
set -e

# Clean lib folder
npm run prepare

# Compile the project
npm run build

# Run Standard Version
npm run tag-release

# Push to Master
git push --follow-tags origin master;

# Assemble module, move over important files
cp package.json lib/package.json

cd lib

# publish module
npm publish
