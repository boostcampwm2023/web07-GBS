#!/bin/bash

echo "First argument: $1"
wget "$1" -O ./src/thumbnails/segment.ts
ffmpeg -i ./src/thumbnails/segment.ts -c:v libx264 -c:a aac ./src/thumbnails/segment.mp4
ffmpeg -i ./src/thumbnails/segment.mp4 -ss 00:00:01 -vframes 1 ./src/thumbnails/thumbnail.jpg

echo "Removing segment.ts and segment.mp4"

# More robust removal commands
rm -f ./src/thumbnails/segment.*

echo "Files removed"
