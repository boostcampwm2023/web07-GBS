FROM --platform=linux/amd64 node:lts-alpine

WORKDIR /usr/src/app

COPY ./package*.json ./
COPY ./yarn*.lock ./

RUN yarn install

COPY . .

EXPOSE 3000 443

CMD ["yarn","start"]


