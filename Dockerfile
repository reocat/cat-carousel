FROM php:8.4-fpm-alpine

RUN apk add --no-cache \
        nginx \
        libjpeg-turbo \
        libpng \
        libwebp \
        freetype \
    && apk add --no-cache --virtual .build-deps \
        libjpeg-turbo-dev \
        libpng-dev \
        libwebp-dev \
        freetype-dev \
    && docker-php-ext-configure gd \
        --with-jpeg \
        --with-webp \
        --with-freetype \
    && docker-php-ext-install -j"$(nproc)" gd opcache \
    && apk del .build-deps \
    && rm -rf /tmp/* /var/cache/apk/*

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/php-fpm.conf /usr/local/etc/php-fpm.conf
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

WORKDIR /var/www/html
COPY . /var/www/html/

RUN mkdir -p /var/www/html/cache /tmp/php-sessions \
    && chown -R www-data:www-data /var/www/html

EXPOSE 8080
VOLUME ["/var/www/html/cache"]

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget -qO /dev/null http://127.0.0.1:8080/robots.txt || exit 1

ENTRYPOINT ["/entrypoint.sh"]
