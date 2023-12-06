wget 'https://kr.object.ncloudstorage.com/hls-bucket/hls/6eb54d6b-a263-49e6-85a6-c55c42d9e7ca_240p264kbs/1701834498645.ts' -O segment.ts
ffmpeg -i segment.ts -c:v libx264 -c:a aac segment.mp4
ffmpeg -i segment.mp4 -ss 00:00:01 -vframes 1 thumbnail.jpg
rm segment.ts
