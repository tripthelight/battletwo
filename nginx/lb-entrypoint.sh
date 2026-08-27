#!/bin/sh

set -eu

ACTIVE_DIR="/etc/nginx/battletwo-active"
ACTIVE_CONF="${ACTIVE_DIR}/default.conf"
BLUE_CONF="/etc/nginx/battletwo-slots/lb-blue.conf"

mkdir -p "${ACTIVE_DIR}"

# 최초 실행일 때만 BLUE를 ACTIVE로 설정한다.
# 이후에는 Docker named volume에 저장된 ACTIVE 설정을 그대로 사용한다.
if [ ! -s "${ACTIVE_CONF}" ]; then
    cp "${BLUE_CONF}" "${ACTIVE_CONF}"
fi

rm -f /etc/nginx/conf.d/default.conf
ln -s "${ACTIVE_CONF}" /etc/nginx/conf.d/default.conf

exec nginx -g 'daemon off;'
