

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let sassMiddleware = require('node-sass-middleware');

let dotenv = require('dotenv').config()

const https = require('https');
const http = require('http');

const fs = require('fs');

const sslkey = fs.readFileSync('ssl-key.pem');
const sslcert = fs.readFileSync('ssl-cert.pem')

const options = {
      key: sslkey,
      cert: sslcert
};


const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


let indexRouter = require('./routes/index');
let addRouter = require("./routes/add");
let picsRouter = require("./routes/pics");
let searchRouter = require("./routes/search");
let usersRouter = require("./routes/users");


let bodyParser = require("body-parser")

let app = express();

let mongoose = require('mongoose');
//var mongoDB = 'mongodb://127.0.0.1/assignment';
mongoose.connect('mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+'@'+process.env.DB_HOST+':'+'27017/assignment');
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())





app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/add', addRouter);
app.use('/pics', picsRouter);
app.use('/search', searchRouter);
app.use('/users', usersRouter);


app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});


https.createServer(options, app).listen(3000);


http.createServer((req, res) => {
      res.writeHead(301, { 'Location': 'https://localhost:3000' + req.url });
      res.end();
}).listen(8080);
