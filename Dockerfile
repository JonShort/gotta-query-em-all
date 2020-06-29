FROM node:12-alpine

ARG CORS_ORIGIN

ENV NODE_ENV=production
ENV PORT=4000
ENV CORS_ORIGIN=$CORS_ORIGIN

WORKDIR /server

COPY package*.json ./

RUN npm ci

COPY index.js ./
COPY data ./data/

CMD [ "node", "index.js" ]

EXPOSE $PORT
