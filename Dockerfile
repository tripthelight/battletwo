FROM node:22-bookworm-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

ARG SOCKET_HOST
ARG SOCKET_PORT
ARG RTC_PORT
ARG CLIENT_HOST
ARG CLIENT_PORT
ARG JWT_HOST
ARG JWT_PORT

ENV SOCKET_HOST=${SOCKET_HOST}
ENV SOCKET_PORT=${SOCKET_PORT}
ENV RTC_PORT=${RTC_PORT}
ENV CLIENT_HOST=${CLIENT_HOST}
ENV CLIENT_PORT=${CLIENT_PORT}
ENV JWT_HOST=${JWT_HOST}
ENV JWT_PORT=${JWT_PORT}

RUN npm run build


FROM nginx:alpine AS runtime

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
