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
// CORS options to allow specific methods and headers
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from your frontend
  methods: "GET,POST,PUT,PATCH,DELETE,OPTIONS", // Explicitly allow PATCH
  allowedHeaders: ['Content-Type', 'Authorization'], // Include necessary headers
  credentials: true
};
// {
//   "origin": "*",
//   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//   "preflightContinue": false,
//   "optionsSuccessStatus": 204
// }

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));




// Handle preflight requests for all routes

// app.options('*', cors());

app.use('/', routes);



// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(404, "Not found"));
});


// handle error
app.use(errorHandler);

module.exports = app;
