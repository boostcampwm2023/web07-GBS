FROM jrottenberg/ffmpeg:4.0-alpine
FROM node:10-alpine

COPY --from=0 / /

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 19350

CMD ["node","app.js"]