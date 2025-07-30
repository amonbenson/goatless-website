# build the client static files
FROM denoland/deno:alpine AS builder

WORKDIR /client

COPY package*.json .
COPY deno*.json .
RUN deno install

COPY . .

ARG VITE_BASE_URL=${VITE_BASE_URL}
ARG VITE_API_BASE_URL=${VITE_API_BASE_URL}
ARG VITE_LEGAL_ADDRESS=${VITE_LEGAL_ADDRESS}
ARG VITE_LEGAL_PHONE=${VITE_LEGAL_PHONE}
ARG VITE_LEGAL_EMAIL=${VITE_LEGAL_EMAIL}
ARG VITE_FOOTER_GITHUB_LINK=${VITE_FOOTER_GITHUB_LINK}
ARG VITE_KNOWN_COUNTRIES=${VITE_KNOWN_COUNTRIES}

RUN deno run build



# start nginx as a reverse proxy
FROM nginx:alpine-slim AS app

WORKDIR /app

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s \
  CMD wget -qO- http://localhost/abc123-dummy-404 | grep -q "<html" || exit 1

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /client/dist /usr/share/nginx/html
