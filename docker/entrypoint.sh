#!/bin/sh
set -eu

mkdir -p /run/nginx /var/www/html/cache /tmp/php-sessions
chown -R www-data:www-data /var/www/html/cache /tmp/php-sessions
chmod 0775 /var/www/html/cache
chmod 1733 /tmp/php-sessions

php-fpm -y /usr/local/etc/php-fpm.conf
exec nginx -g 'daemon off;'
