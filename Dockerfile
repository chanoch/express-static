FROM node:8.12.0-alpine

WORKDIR /usr/app

COPY package.json .
COPY npm-shrinkwrap.json .
RUN npm i --production

COPY . .
CMD ["npm", "start"]
