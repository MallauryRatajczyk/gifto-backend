require('dotenv').config();
require('./models/connection');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


require('dotenv').config()
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var demandeRouter = require('./routes/demande')
var categoriesRouter = require('./routes/categories');
var itemRouter = require('./routes/item');
;


var app = express();
const fileUpload = require('express-fileupload');
app.use(fileUpload());
const cors = require('cors');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/demande', demandeRouter);
app.use('/categories', categoriesRouter);
app.use('/item', itemRouter);
module.exports = app;
