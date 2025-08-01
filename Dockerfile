# Stage 1: Build the Vite app
FROM node:slim AS builder

WORKDIR /app

# Install dependencies
COPY package*.json .
RUN npm install

# Build the application
COPY . .
ARG VITE_BASE_URL=${VITE_BASE_URL}
ARG VITE_API_BASE_URL=${VITE_API_BASE_URL}
ARG VITE_LEGAL_ADDRESS=${VITE_LEGAL_ADDRESS}
ARG VITE_LEGAL_PHONE=${VITE_LEGAL_PHONE}
ARG VITE_LEGAL_EMAIL=${VITE_LEGAL_EMAIL}
ARG VITE_FOOTER_GITHUB_LINK=${VITE_FOOTER_GITHUB_LINK}
ARG VITE_KNOWN_COUNTRIES=${VITE_KNOWN_COUNTRIES}
RUN npm run build

# Stage 2: Run nginx as a static file server
FROM nginx:alpine-slim

# Copy static files
COPY --from=builder /app/dist /usr/share/nginx/html

# Replace default nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
