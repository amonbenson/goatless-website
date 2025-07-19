FROM node:slim

WORKDIR /app

# install required packages
RUN apt-get update
RUN apt-get install -y git

# resolve warnings with the mounted git repo
RUN git config --global --add safe.directory /repository

# install dependencies
COPY package*.json ./
RUN npm install

# copy source files
COPY . .

# build the application
#RUN npm run build

# start the application
ENV PORT=5000
ENV NODE_ENV=production
ENV PUBLIC_SERVER=${PUBLIC_SERVER}
ENV WEBHOOK_SECRET=${WEBHOOK_SECRET}
ENV WEBHOOK_PIPE=${WEBHOOK_PIPE}
CMD ["npm", "start"]

HEALTHCHECK CMD curl -s --fail http://localhost:$PORT/ | grep -q "pong" || exit 1
