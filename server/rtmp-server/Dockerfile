FROM jrottenberg/ffmpeg:4.0-alpine
FROM node:19.5.0-alpine

COPY --from=0 / /

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 1935

CMD ["node","app.js"]