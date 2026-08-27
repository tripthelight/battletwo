#!/usr/bin/env bash

set -Eeuo pipefail


PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
COMPOSE_FILE="${PROJECT_DIR}/docker-compose.front.yml"

LB_CONTAINER="battletwo-front-lb"
LB_URL="http://127.0.0.1:8082"

HEALTH_TIMEOUT_SECONDS=120
HEALTH_INTERVAL_SECONDS=2


log() {
    printf '[deploy-front] %s\n' "$*"
}


fail() {
    printf '[deploy-front] ERROR: %s\n' "$*" >&2
    exit 1
}


container_health() {
    local container="$1"

    docker inspect \
        --format='{{if .State.Health}}{{.State.Health.Status}}{{else}}{{.State.Status}}{{end}}' \
        "${container}" 2>/dev/null || true
}


wait_for_healthy() {
    local container="$1"
    local elapsed=0
    local status=""

    while (( elapsed < HEALTH_TIMEOUT_SECONDS )); do
        status="$(container_health "${container}")"

        if [[ "${status}" == "healthy" ]]; then
            log "${container} is healthy"
            return 0
        fi

        if [[ "${status}" == "unhealthy" ]]; then
            fail "${container} became unhealthy"
        fi

        sleep "${HEALTH_INTERVAL_SECONDS}"
        elapsed=$((elapsed + HEALTH_INTERVAL_SECONDS))
    done

    fail "${container} healthcheck timed out"
}


detect_active_slot() {
    if docker exec "${LB_CONTAINER}" \
        grep -q 'X-Battletwo-Slot "blue"' \
        /etc/nginx/battletwo-active/default.conf; then

        printf 'blue'
        return 0
    fi

    if docker exec "${LB_CONTAINER}" \
        grep -q 'X-Battletwo-Slot "green"' \
        /etc/nginx/battletwo-active/default.conf; then

        printf 'green'
        return 0
    fi

    return 1
}


verify_candidate() {
    local slot="$1"
    local replica=""
    local path=""

    for replica in 1 2; do
        for path in \
            "/" \
            "/selectGame" \
            "/game/indianPocker" \
            "/game/blackAndWhite1"
        do
            log "checking front-${slot}-${replica}${path}"

            docker exec "${LB_CONTAINER}" \
                wget \
                -q \
                --spider \
                "http://front-${slot}-${replica}${path}" \
                || fail "candidate check failed: front-${slot}-${replica}${path}"
        done
    done
}


switch_slot() {
    local from_slot="$1"
    local to_slot="$2"

    log "switching ${from_slot} -> ${to_slot}"

    docker exec "${LB_CONTAINER}" sh -eu -c "
        ACTIVE_DIR=/etc/nginx/battletwo-active
        SLOT_DIR=/etc/nginx/battletwo-slots

        cp \
          \"\${ACTIVE_DIR}/default.conf\" \
          \"\${ACTIVE_DIR}/default.conf.rollback\"

        cp \
          \"\${SLOT_DIR}/lb-${to_slot}.conf\" \
          \"\${ACTIVE_DIR}/default.conf.next\"

        mv \
          \"\${ACTIVE_DIR}/default.conf.next\" \
          \"\${ACTIVE_DIR}/default.conf\"

        if ! nginx -t; then
            mv \
              \"\${ACTIVE_DIR}/default.conf.rollback\" \
              \"\${ACTIVE_DIR}/default.conf\"
            exit 1
        fi
    " || fail "nginx configuration validation failed"

    if ! docker exec "${LB_CONTAINER}" nginx -s reload; then
        log "reload failed; restoring ${from_slot}"

        docker exec "${LB_CONTAINER}" sh -eu -c "
            ACTIVE_DIR=/etc/nginx/battletwo-active

            if [ -f \"\${ACTIVE_DIR}/default.conf.rollback\" ]; then
                mv \
                  \"\${ACTIVE_DIR}/default.conf.rollback\" \
                  \"\${ACTIVE_DIR}/default.conf\"
            fi

            nginx -t
            nginx -s reload
        " || true

        fail "nginx reload failed"
    fi
}


verify_active_slot() {
    local expected="$1"
    local attempt=""
    local slot=""

    for attempt in $(seq 1 20); do
        slot="$(
            curl \
                --max-time 2 \
                -fsSI \
                "${LB_URL}/" |
            awk -F': ' '
                BEGIN { IGNORECASE=1 }
                $1 == "X-Battletwo-Slot" {
                    gsub("\r", "", $2);
                    print $2;
                    exit
                }
            '
        )" || true

        if [[ "${slot}" == "${expected}" ]]; then
            log "load balancer active slot: ${slot}"
            return 0
        fi

        sleep 1
    done

    return 1
}


rollback_slot() {
    local slot="$1"

    log "rolling back to ${slot}"

    docker exec "${LB_CONTAINER}" sh -eu -c "
        cp \
          /etc/nginx/battletwo-slots/lb-${slot}.conf \
          /etc/nginx/battletwo-active/default.conf.next

        mv \
          /etc/nginx/battletwo-active/default.conf.next \
          /etc/nginx/battletwo-active/default.conf

        nginx -t
        nginx -s reload

        rm -f \
          /etc/nginx/battletwo-active/default.conf.rollback
    "
}


cleanup_switch_backup() {
    docker exec "${LB_CONTAINER}" \
        rm -f \
        /etc/nginx/battletwo-active/default.conf.rollback
}


main() {
    cd "${PROJECT_DIR}"

    command -v docker >/dev/null 2>&1 \
        || fail "docker command not found"

    command -v curl >/dev/null 2>&1 \
        || fail "curl command not found"

    docker compose version >/dev/null 2>&1 \
        || fail "docker compose is not available"

    [[ -f "${COMPOSE_FILE}" ]] \
        || fail "compose file not found: ${COMPOSE_FILE}"

    docker inspect "${LB_CONTAINER}" >/dev/null 2>&1 \
        || fail "${LB_CONTAINER} is not running"

    local active_slot=""
    local target_slot=""
    local active_service_1=""
    local active_service_2=""
    local target_service_1=""
    local target_service_2=""
    local target_container_1=""
    local target_container_2=""
    local commit=""

    active_slot="$(detect_active_slot)" \
        || fail "could not detect active slot"

    if [[ "${active_slot}" == "blue" ]]; then
        target_slot="green"
    else
        target_slot="blue"
    fi

    active_service_1="front-${active_slot}-1"
    active_service_2="front-${active_slot}-2"

    target_service_1="front-${target_slot}-1"
    target_service_2="front-${target_slot}-2"

    target_container_1="battletwo-front-${target_slot}-1"
    target_container_2="battletwo-front-${target_slot}-2"

    commit="$(git rev-parse --short HEAD 2>/dev/null || printf 'unknown')"

    log "commit      : ${commit}"
    log "active slot : ${active_slot}"
    log "target slot : ${target_slot}"

    log "building ${target_slot} image"

    docker compose \
        -f "${COMPOSE_FILE}" \
        build \
        "${target_service_1}"

    log "starting ${target_slot} replicas"

    docker compose \
        -f "${COMPOSE_FILE}" \
        up \
        -d \
        --no-deps \
        --force-recreate \
        "${target_service_1}" \
        "${target_service_2}"

    wait_for_healthy "${target_container_1}"
    wait_for_healthy "${target_container_2}"

    verify_candidate "${target_slot}"

    switch_slot "${active_slot}" "${target_slot}"

    if ! verify_active_slot "${target_slot}"; then
        log "post-switch verification failed"

        rollback_slot "${active_slot}"

        docker compose \
            -f "${COMPOSE_FILE}" \
            stop \
            "${target_service_1}" \
            "${target_service_2}" \
            || true

        fail "deployment rolled back to ${active_slot}"
    fi

    cleanup_switch_backup

    log "stopping old ${active_slot} replicas"

    docker compose \
        -f "${COMPOSE_FILE}" \
        stop \
        "${active_service_1}" \
        "${active_service_2}" \
        || log "warning: deployment succeeded, but old slot cleanup failed"

    log "deployment completed"
    log "ACTIVE=${target_slot}"
}


main "$@"
