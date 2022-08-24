const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const ejs = require('ejs');

const app = express();
const initializePassport = require('./passport-config');
initializePassport(
    passport,
    email=> URLSearchParams.find(user => user.email === email),
    id => URLSearchParams.find(user => user.id === id)
)

const users = [];
app.set('view-engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());

app.get('/', checkAuthenticate, (req, res)=>{
    res.render('index.ejs', {
        name: req.user.name
    });
});

app.get('./login', checkAuthenticate, (req, res)=>{
    res.render('login.ejs', {
        name: req.user.name
    });
});

app.get('./register', checkAuthenticate, (req, res)=>{
    res.render('register.ejs', {
        name: req.user.name
    });
});

app.listen(8000, ()=>{
    console.log("Server is up and running on port ", 8000);
});