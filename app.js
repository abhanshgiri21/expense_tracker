require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const Knex = require('knex');
const Model = require('objection').Model;
const passport = require('passport');
const fs = require('fs');
const KnexConfig = require('./knexfile');
const api = require('./api');
let router = require('express-promise-router')();

// Global Functions accessible all across the app
require('./global_functions');

const knex = Knex(KnexConfig[process.env.NODE_ENV || 'production']);
Model.knex(knex);
knex.migrate.latest().then((res) => {
  console.log('migrations done : ', res);
  // knex.seed.run();
}).catch(err => {
  console.log('error running migrations : ', err);
})


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

app.use((req, res, next) => {
  // console.log('hererererererere');
  return res.status(404).json({
    message: 'Not Found'
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
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
