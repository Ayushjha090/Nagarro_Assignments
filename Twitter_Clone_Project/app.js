const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

const initializePassport = require('./config/passportConfig');

const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
        secret: process.env.SESSION_SECRET_KEY,
        resave: false,
        saveUninitialized: false
    })
);
app.use(passport.initialize());
app.use(passport.session());

initializePassport(passport);

app.use('/', require('./routes/loginPageRoute'));
app.use('/auth', require('./routes/authRoute'));
app.use('/tweet', require('./routes/tweetRoute'));

app.listen(process.env.PORT, ()=>{
    console.log(`Server is up and running on port ${process.env.PORT}`);
});