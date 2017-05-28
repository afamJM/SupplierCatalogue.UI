FROM node:boron

ENV API_DEST 'http://localhost:8080'
ENV API_PORT '8080'

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY . /usr/src/app/
RUN npm install

EXPOSE 80 443
CMD [ "npm", "start" ]