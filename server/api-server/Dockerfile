FROM node:lts-alpine

WORKDIR /usr/src/app

COPY ./server/api-server/package*.json ./
COPY ./server/api-server/yarn*.lock ./

RUN yarn install

COPY ./server/api-server/. .

EXPOSE 80

CMD ["yarn","start"]
