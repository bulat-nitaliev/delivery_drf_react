FROM node:lts-slim AS build-stage
ENV NODE_OPTIONS=--openssl-legacy-provider
WORKDIR /usr/src/app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install -g serve
RUN npm install

# copy react project
COPY . .

# build react project
RUN npm run build

