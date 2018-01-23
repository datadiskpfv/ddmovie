// express handles HTTP requests, sets up and handles routing, renders HTTP web pages
// handles cookies, sessions, etc
let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');

// handles cookies, both reading and writing
let cookieParser = require('cookie-parser');

// passes the HTTP body of POST, PATCH and PUT requests
let bodyParser = require('body-parser');

require('./app_api/models/db');

// var index = require('./app_server/routes/index');
let ddmovieApi = require('./app_api/routes/index');
let ddmovie = require('./app_server/routes/index');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', ddmovie);
app.use('/ddmovie_api', ddmovieApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
