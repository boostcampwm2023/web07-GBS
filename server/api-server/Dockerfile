FROM node:lts-alpine

WORKDIR /usr/src/app

COPY ./package*.json ./
COPY ./yarn*.lock ./

RUN yarn install

COPY . .

EXPOSE 80

CMD ["yarn","start"]
