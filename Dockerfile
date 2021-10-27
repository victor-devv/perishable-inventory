FROM node:14-slim

RUN mkdir -p /usr/src/app && chown -R node:node /home/node/app

WORKDIR /usr/src/app

COPY . .

USER node

RUN yarn install --production

RUN yarn build

EXPOSE 3500

VOLUME [ "/usr/src/app" ]