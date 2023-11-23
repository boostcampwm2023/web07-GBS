FROM node:lts-alpine

RUN apk add --no-cache make gcc g++ linux-headers

# Download and compile Redis
RUN mkdir -p /etc/redis-client && \
    cd /etc/redis-client && \
    wget http://download.redis.io/releases/redis-7.2.3.tar.gz && \
    tar -zxvf redis-7.2.3.tar.gz && \
    cd redis-7.2.3 && \
    make && \
    make install


WORKDIR /usr/src/app

COPY ./package*.json ./
COPY ./yarn*.lock ./

RUN yarn install

COPY . .

EXPOSE 3000 40625

CMD ["yarn","start"]


