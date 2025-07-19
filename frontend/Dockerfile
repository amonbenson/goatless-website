FROM node:slim AS builder

WORKDIR /app

# install dependencies
COPY package*.json ./
RUN npm install

# copy source files
COPY . .

# build the application
ENV NODE_ENV=${NODE_ENV}
ENV VITE_PUBLIC_SERVER=${PUBLIC_SERVER}
CMD ["npm", "run", "build"]
