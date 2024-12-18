/* App.js

Page serves as file to add all routers and folders that can be used throughout the program for other files.*/
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let mongoose = require("mongoose");
let DB = require("./db");

mongoose.connect(DB.URI);
let mongoDB = mongoose.connection;
mongoDB.on("error",console.error.bind(console,"Connection Error:"));
mongoDB.once("open",()=>{
  console.log("Connected to MongoDB");
})




let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let gradesRouter = require("../routes/grade");

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/grade", gradesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',
    {
      title:"Error"
    }
  );
});

module.exports = app;
