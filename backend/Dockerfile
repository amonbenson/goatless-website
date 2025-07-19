FROM node:slim

WORKDIR /app

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
CMD ["npm", "start"]

HEALTHCHECK CMD curl -s --fail http://localhost:$PORT/ | grep -q "pong" || exit 1
