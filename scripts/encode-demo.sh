#!/usr/bin/env bash
# Encodes a raw Playwright recording into the site's project demo clip:
# public/demos/<name>.mp4 (H.264) and <name>.jpg (poster).
#
# Usage: scripts/encode-demo.sh <recording.webm> <name> [lead-in seconds to trim]
# The lead-in comes from the recording's <name>.json, written by the project's demo spec.

set -euo pipefail

in=$1
name=$2
trim=${3:-0}
out=public/demos
mkdir -p "$out"

# 1280 wide (2x the reading column), even dimensions, no audio.
vf="scale=1280:-2:flags=lanczos"

ffmpeg -y -v error -ss "$trim" -i "$in" -an -vf "$vf" \
  -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart \
  "$out/$name.mp4"

ffmpeg -y -v error -ss "$trim" -i "$in" -frames:v 1 -vf "scale=1280:-2:flags=lanczos" -q:v 4 \
  "$out/$name.jpg"

ls -lh "$out/$name".*
