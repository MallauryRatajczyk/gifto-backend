require('dotenv').config();
require('./models/connection');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var demandeRouter = require('./routes/demande')
var categoriesRouter = require('./routes/categories');

var app = express();
const cors = require('cors');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
<<<<<<< HEAD
app.use('/demande', demandeRouter);
=======
app.use('/categories', categoriesRouter);
>>>>>>> a1867c8f916240b1d16e4fca72c82488aff2e99d

module.exports = app;
