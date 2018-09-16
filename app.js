const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const compression = require('compression');
const session = require('express-session');
const cors = require('cors')
const request = require('request');
const settings = require('./config/settings')

const twentFourHours = 86400000;

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

const index = require('./routes/index');
const users = require('./routes/users');
const home = require('./routes/home');
const office = require('./routes/office');
const tasks = require('./routes/tasks');
const bitcoin = require('./routes/bitcoin');
const posts = require('./routes/posts');
const expenses = require('./routes/expenses');
const incomes = require('./routes/incomes');
const dashboard = require('./routes/dashboard');
const connect = require('./routes/connect');
const profile = require('./routes/profile');

const app = express();

app.use(compression({level: 1}));
app.use(cors());
app.use(favicon(path.join(__dirname, 'public', 'images/weemaple2.jpg')));
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
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

const BitcoinModel = require('./models/bitcoin');



setInterval(() => {
  request({
    url: "https://blockchain.info/stats?format=json",
    json: true
  }, function(error, response, body) {
    //console.log(`${body.market_price_usd}`);
    let bit = new BitcoinModel({
      price: body.market_price_usd
    });
    bit.save().then((data) => {
      console.log(`Saved new data: ${data}`);
    }).catch((err) => {
      throw(err);
    });
  });
}, 28800000);

app.use('/', index);
app.use('/users', users);
app.use('/home', home);
app.use('/office', office);
app.use('/tasks', tasks);
app.use('/bitcoin', bitcoin);
app.use('/posts', posts);
app.use('/expenses', expenses);
app.use('/incomes', incomes);
app.use('/dashboard', dashboard);
app.use('/connect', connect);
app.use('/profile', profile);

// API
app.use('/api/incomes', incomeApi);
app.use('/api/expenses', expenseApi);

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