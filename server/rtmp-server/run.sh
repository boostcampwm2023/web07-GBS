#!/bin/sh

# Check if STREAM_KEY_CHECK_URL is not empty
if [ -n "$STREAM_KEY_CHECK_URL" ]; then
    # Update the nginx configuration file with the new value
    STREAM_KEY_CHECK_URL="on_publish ${STREAM_KEY_CHECK_URL};\n"
    sed -i "s@# on_publish_url@${STREAM_KEY_CHECK_URL}@g" /usr/local/nginx/conf/nginx.conf
fi

/usr/local/nginx/sbin/nginx -g 'daemon off;'
