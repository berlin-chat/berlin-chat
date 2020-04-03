FROM node:12-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

EXPOSE 3000

HEALTHCHECK CMD wget --quiet --tries=1 --spider 127.0.0.1:3000 || exit 1

CMD ["yarn", "start"]
