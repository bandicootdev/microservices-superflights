FROM node:16-alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm install -g npm@8.7.0

COPY ./dist ./src

CMD ["node", "src/main.js"]