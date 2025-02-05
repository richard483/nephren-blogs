FROM node:21-alpine

LABEL authors="Richard William"

ARG VITE_GOOGLE_TAG

ENV VITE_GOOGLE_TAG=$VITE_GOOGLE_TAG

WORKDIR /app

COPY package.json .

RUN npm install && npm i -g serve

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]