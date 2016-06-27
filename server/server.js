const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./auth/passport');
const flash = require('connect-flash');
const router = require('./routes');

const morgan = require('morgan');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

app
  .use(morgan('dev'))
  .use(cookieParser())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(session({
    secret: 'shhhh',
    resave: true,
    saveUninitialized: true,
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use('/', router)
  .use(flash());

app.set('view engine', 'ejs');

app.listen(port, () => {
  console.log(`Connected to ${host}:${port}`);
});

