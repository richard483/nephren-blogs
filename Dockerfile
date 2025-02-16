FROM node:21-alpine

LABEL authors="Richard William"

ARG VITE_GITHUB_TOKEN

ENV VITE_GITHUB_TOKEN=$VITE_GITHUB_TOKEN

WORKDIR /app

COPY package.json .

RUN npm install && npm i -g serve

COPY . .

RUN npm run build

EXPOSE 7001

CMD [ "serve", "-s", "dist", "-l", "7001" ]