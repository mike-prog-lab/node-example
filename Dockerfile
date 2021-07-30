FROM node:16-alpine3.11

WORKDIR /app

RUN chown node:node /app

COPY --chown=node:node . .

USER node

RUN npm ci --production

ENTRYPOINT ["node", "app"]