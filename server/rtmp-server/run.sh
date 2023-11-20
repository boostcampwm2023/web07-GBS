#!/bin/sh

# Check if ENCODING_SERVER_HOST is not empty
if [ -n "$ENCODING_SERVER_HOST" ]; then
    # Update the nginx configuration file with the new value
    ENCODING_SERVER_HOST="push ${ENCODING_SERVER_HOST};\n"
    sed -i "s@# push_to_host@${ENCODING_SERVER_HOST}@g" /usr/local/nginx/conf/nginx.conf
fi

/usr/local/nginx/sbin/nginx -g 'daemon off;'
