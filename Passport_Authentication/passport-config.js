const bcrypt = require('bcrypt');
const e = require('express');
const LocalStrategy = require('passport-local');
function initialize(passport, getUserByEmail, getUserById)
{
    const authenticateUser = async (email, password, done) =>
    {
        const user = getUserByEmail(email);
        if (user == null)
        {
            return done(null, false, {message:'no user found'})
        }
        
        try{
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            }
            else {
                return done(null, false, {message:'password incrrct'});
            }
        }
        catch(e)
        {
            return done(e)
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done)=> {done9null, user.id});
    passport.deserializeUser((user, done)=> {done9null, user.id});
}
module.exports = initialize;