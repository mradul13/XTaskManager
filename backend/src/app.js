const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const ApiError = require('./utils/ApiError');
const {errorHandler} = require('./middlewares/error');
const httpStatus = require('http-status');
const routes = require('./routes');

const app = express();

// For common security threats
app.use(helmet());

// For converting requests to json
app.use(express.json());

// For allowing urlencoded payloads
app.use(express.urlencoded({extended: true}));

// setting compression
app.use(compression());

// Setting up cors policy
app.use(cors());
app.options('*', cors());

app.use('/', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// handle error
app.use(errorHandler);

module.exports = app;
