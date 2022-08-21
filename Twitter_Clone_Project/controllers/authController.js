const passport = require('passport');
const bcrypt = require('bcrypt');

const db = require('../config/dbConfig');

module.exports.signUpController = (req, res)=>{
    const {name, email, password, confirmPassword} = req.body;
    if(password !== confirmPassword){
        res.redirect('back');
    }
    const options = {
        table: 'users',
        searchAttribute: 'email',
        searchValue: email,
        attributes: ['*']
    }
    db.searchByValue(options, (err, result)=>{
        if(err){
            console.log(err);
            return res.redirect('back');
        }else{
            const users = result.data;
            if(users.length > 0){
                res.redirect('back');
            }else{
                bcrypt.hash(password, 10, (err, hash)=>{
                    if(err){
                        console.log(err);
                    }else{
                        db.insert({
                            table: 'users',
                            records: [{
                            name: name,
                            email: email,
                            password: hash,
                            avatar: '/images/user-avatar.png',
                            username: email.split('@')[0]
                            }]
                        })
                        .then((result)=>{
                            console.log(result);
                            passport.authenticate('local')(req, res, ()=>{
                                res.redirect('/home');
                            })
                        })
                        .catch((err)=>{
                            console.log('err');
                            console.log(err);
                            res.redirect('back');
                        });
                    }
                });
            }
        }
    });
}

module.exports.signInController = (req, res)=>{
    passport.authenticate('local', {failureRedirect: '/'})(req, res, () => {
        res.redirect('/home');
    });
}

module.exports.signOutController = (req, res)=>{
    req.logout(function(err){
        if(err){
            console.log(err);
        }
        res.redirect('/');
    });
}

module.exports.authenticateGoogleController = passport.authenticate('google', {
    scope: ['profile', 'email']
});

module.exports.authenticateGoogleCallBackController = passport.authenticate('google', {
    successRedirect: "/home",
    failureRedirect: "/",
});