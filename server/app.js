const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const compression = require('compression');
const session = require('express-session');
const cors = require('cors')
const request = require('request');
const settings = require('./config/settings');

// mlab connection 
const mongoUri = settings.dbURI;
// mongoose mlab connection
mongoose.connect(mongoUri, {
  useMongoClient: true
});
//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const incomeApi = require('./api/incomes');
const expenseApi = require('./api/expenses');
const userApi = require('./api/users');
const postApi = require('./api/social/posts');
const profileApi = require('./api/account/profile');

const index = require('./routes/index');
const users = require('./routes/users');
const dashboard = require('./routes/dashboard');
const expenses = require('./routes/finance/expenses');
const incomes = require('./routes/finance/incomes');
const mypost = require('./routes/social/mypost');
const community = require('./routes/social/community');
const profile = require('./routes/account/profile');


const app = express();

app.use(compression({level: 1}));
app.use(cors());
app.use(favicon(path.join(__dirname, '../client', 'images/weemaple2.jpg')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: settings.secret,
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 180 * 60 * 1000 }
}));
app.use(() => {
  multer({ dest: './uploads/',
   rename: function (fieldname, filename) {
     return filename;
   },
  })
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, '../client')));

app.use('/', index);
app.use('/users', users);
app.use('/expenses', expenses);
app.use('/incomes', incomes);
app.use('/dashboard', dashboard);
app.use('/myposts', mypost);
app.use('/community',community);
app.use('/profile', profile);

// API
app.use('/api/incomes', incomeApi);
app.use('/api/expenses', expenseApi);
app.use('/api/users', userApi);
app.use('/api/social/posts', postApi);
app.use('/api/account/profile', profileApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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