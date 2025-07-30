FROM denoland/deno:alpine

WORKDIR /server

COPY package*.json .
COPY deno*.json .
RUN deno install

COPY . .

ENV PORT=5000
ENV CORS_ORIGIN="*"
ENV BIT_API_KEY=""
ENV BIT_ARTIST_ID=""

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s \
  CMD wget -qO- http://localhost:${PORT}/ping | grep -q "pong" || exit 1

CMD deno run start
