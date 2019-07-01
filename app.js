require('dotenv').config();
require('./global_functions');

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const Knex = require('knex');
const Model = require('objection').Model;
const KnexConfig = require('./knexfile');
const api = require('./api');
const router = require('express-promise-router')();

// Global Functions accessible all across the app

const knex = Knex(KnexConfig['development']);
Model.knex(knex);

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(router);

// register API's
api(router);

// error handler
app.use((err, req, res, next) => {
  if (err) {
    console.error(err);
    res.status(err.statusCode || err.status || 500).json(err || {});
  } else {
    next();
  }
});

module.exports = app;
