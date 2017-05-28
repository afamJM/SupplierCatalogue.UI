# SupplierCatalogue.UI

The UI project for the Hitched Supplier Catalogue is a frontend for the RESTful web service
to display wedding suppliers from the Hitched database.

## Architecture

The project is written in TypeScript using Express for the web server, Handlebar
templates, SCSS for styling and Gulp.js for the build process.

For more information see:

* [TypeScript](http://www.typescriptlang.org/)
* [Express](https://expressjs.com/)
* [Handlebars](http://handlebarsjs.com/)
* [SASS](http://sass-lang.com/)
* [Gulp](http://gulpjs.com/)

The UI is designed to be run inside a Docker container if required.  See the  [Docker Overview](https://docs.docker.com/engine/understanding-docker/)
for more information.

## Setting up a development environment

The requirements for a development environment for this project are:

* Node.js

### Setup

To install the required packages run `npm install`

### Building and running

Before you can run the project you will need to build the output files, this is
done through Gulp but required two environment variables to be set:

* `PORT` - The port to run the webserver on
* `API_DEST` - The location of the API
* `API_PORT` - The port of the API

To set both these variables, build and then run the project you can run `PORT=7080 API_DEST=http://localhost:5000 API_PORT=5000 npm start`
which will run `gulp` as a prestart task

To run wih a watcher (for recompilation) use `PORT=7080 API_DEST=http://localhost:5000 API_PORT=5000 npm run watch`.

## Docker Configuration
### Pre-Requisites
In order to use the Docker functionality please ensure you first [install Docker](https://docs.docker.com/engine/getstarted/step_one/) in your chosen development environment.

You can check everything is working correctly with the following command:
```cli
docker version
```

### Build the docker image

Navigate to the project folder (containing Dockerfile) and issue the following command to build a Docker image of the application:
```cli
docker build -t suppliercatalogue_ui .
```
The command takes several seconds to run and reports its outcome.

### Run the docker image

Once the image has been built you can then run it with the following command:
```cli
docker run -p 8080:8080 suppliercatalogue_ui
```
