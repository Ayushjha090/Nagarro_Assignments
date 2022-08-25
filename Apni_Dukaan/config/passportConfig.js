const passportLocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');

// const db = require('./dbConfig');
const User = require('../models/user');

module.exports = function(passport){
    passport.use(new passportLocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
}