FROM node:16.16.0-alpine3.16

# Installing libvips-dev for sharp Compatability
RUN apk update --no-cache --purge && apk add --no-cache --purge --virtual=base vips-dev

WORKDIR /app/

COPY . .
RUN npm install -g node-gyp
RUN npm install
ENV NODE_ENV production

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start"]
