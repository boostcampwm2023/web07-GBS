FROM jrottenberg/ffmpeg:4.0-alpine
FROM node:lts-alpine

COPY --from=0 / /

WORKDIR /usr/src/app

COPY ./server/encoding-server/package*.json ./

RUN npm i

COPY ./server/encoding-server/. .

EXPOSE 1935

CMD ["node","app.js"]
