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

app.get('/', (req, res, next) => {
  res.redirect(process.env.clientUrl);
});

app.use(function (req, res, next) {
  res.redirect(process.env.clientUrl);
});

module.exports = app;
