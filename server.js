

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let sassMiddleware = require('node-sass-middleware');

let dotenv = require('dotenv').config()
const helmet = require('helmet');

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
const session = require("express-session");


let indexRouter = require('./routes/index');
let addRouter = require("./routes/add");
let picsRouter = require("./routes/pics");
let searchRouter = require("./routes/search");
let usersRouter = require("./routes/users");


let bodyParser = require("body-parser")

let app = express();

app.use(helmet());

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


// Session
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "suppersready"
  })
);

//passport config
let User = require('./models/user');
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId, (err, user) => done(err, user));
});

// Passport Local
const local = new LocalStrategy((username, password, done) => {
  User.findOne({ username })
    .then(user => {
      if (!user || !user.validPassword(password)) {
        done(null, false, { message: "Invalid username/password" });
      } else {
        done(null, user);
      }
    })
    .catch(e => done(e));
});
passport.use("local", local);

app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false,
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

http.createServer( (req, res) => {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);
