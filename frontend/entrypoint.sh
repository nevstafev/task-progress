#!/bin/sh

echo "Replacing env vars in nginx conf template"
envsubst '$PORT $BACKEND_API' < /etc/nginx/conf.d/app.conf.template > /etc/nginx/conf.d/default.conf
cat /etc/nginx/conf.d/default.conf

echo "Starting Nginx"
nginx -g 'daemon off;'