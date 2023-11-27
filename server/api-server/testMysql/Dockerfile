FROM mysql:8.2.0

ENV MYSQL_ROOT_PASSWORD=audgml145
ENV MYSQL_DATABASE=gbs
ENV LANG=C.UTF-8

COPY ./docker/mysql/init-test-db.sql /docker-entrypoint-initdb.d/init-test-db.sql
