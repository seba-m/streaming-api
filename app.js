var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
const mongoose = require('mongoose');

var { Rtmp } = require("./src/middlewares/rtmp.middleware");
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


require('./src/routes/user.routes')(app);
require('./src/routes/auth.routes')(app);
require('./src/routes/stream.routes')(app);
require('./src/routes/search.routes')(app);

app.get('/', (req, res, next) => {
  res.redirect(process.env.clientUrl);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(`error '${err.status || 500}' `);
});

var rtmp = new Rtmp();

const mongoDB = process.env.dbUrl;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = app;
