var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

require('./src/routes/user.routes')(app);
require('./src/routes/auth.routes')(app);
require('./src/routes/stream.routes')(app);
require('./src/routes/search.routes')(app);
require('./src/routes/image.routes')(app);

app.get('/', (req, res, next) => {
  res.redirect(process.env.clientUrl);
});

/*app.use(function (req, res, next) {
  res.redirect(process.env.clientUrl);
});*/

var createError = require('http-errors');

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err.message)

  // render the error page
  res.status(err.status || 500);
  res.send(`error '${err.status || 500}' `);
});

module.exports = app;
