FROM node:12-alpine

ENV NODE_ENV=production
ENV PORT=4000

WORKDIR /server

COPY package*.json ./

RUN npm ci

COPY index.js ./
COPY data ./data/

CMD [ "node", "index.js" ]

EXPOSE $PORT
