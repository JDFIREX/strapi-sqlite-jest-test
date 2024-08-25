FROM node:16

# Installing libvips-dev for sharp Compatability
RUN apt-get update && apt-get install libvips-dev -y
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/app
COPY ./ .

RUN npm install -g node-gyp
RUN npm install
RUN npm run build

EXPOSE 8080
CMD ["npm", "run", "develop"]
