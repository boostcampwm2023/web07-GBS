FROM jrottenberg/ffmpeg:4.0-alpine
FROM node:lts-alpine

COPY --from=0 / /

WORKDIR /usr/src/app

COPY ./server/rtmp-server/package*.json ./

RUN npm i

COPY ./server/rtmp-server/. .

RUN mv ./node_relay_session.js ./node_modules/node-media-server/src/node_relay_session.js

EXPOSE 1935 80

CMD ["node","app.js"]
