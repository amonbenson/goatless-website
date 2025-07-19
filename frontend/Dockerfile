FROM node:slim AS builder

ARG NODE_ENV=production
ARG PUBLIC_SERVER=http://localhost:8080

WORKDIR /app

# install dependencies
COPY package*.json ./
RUN npm install

# copy source files
COPY . .

# build the application
ENV NODE_ENV=production
RUN npm run build


# The secondary stage is only required if we want to serve the built files within this container.
# In our case, we are using a separate Nginx container and share the built files via a volume.

# FROM nginx:stable-alpine-slim
# COPY --from=builder /app/dist /usr/share/nginx/html

# # Expose the port
# EXPOSE 80

# # Start the Nginx server
# CMD ["nginx", "-g", "daemon off;"]
