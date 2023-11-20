FROM alpine:3.13.4 as builder

RUN apk add --update build-base git bash gcc make g++ zlib-dev linux-headers pcre-dev openssl-dev
RUN git clone https://github.com/arut/nginx-rtmp-module.git && \
    git clone https://github.com/nginx/nginx.git
RUN cd nginx && ./auto/configure --add-module=../nginx-rtmp-module && make && make install

COPY ./nginx.conf /usr/local/nginx/conf/nginx.conf
# COPY ./server/rtmp-server/nginx.conf /usr/local/nginx/conf/nginx.conf

FROM alpine:3.13.4 as nginx

RUN apk add --update pcre ffmpeg
COPY --from=builder /usr/local/nginx /usr/local/nginx

COPY ./run.sh /usr/local/nginx/conf/run.sh 
# COPY ./server/rtmp-server/run.sh /usr/local/nginx/conf/run.sh
RUN chmod +x /usr/local/nginx/conf/run.sh

EXPOSE 80 443 1935

CMD ["/usr/local/nginx/conf/run.sh"]
