const passportLocal = require('passport-local');
const passportGoogle = require('passport-google-oauth20');
const bcrypt = require('bcrypt');

const db = require('./dbConfig');
const LoacalStrategy = passportLocal.Strategy;
const GoogleStrategy = passportGoogle.Strategy;

module.exports = function (passport){
    passport.use(
        new LoacalStrategy({usernameField: 'email'}, (email, password, done) =>{
            db.searchByValue({
                table: 'users',
                searchAttribute: 'email',
                searchValue: email,
                attributes: ['*']
            })
            .then((result)=>{
                const users = result.data;
                if(users.length === 0){
                    return done(null, false, {message: "No User Found"});
                }
                else{
                    const user = users[0];
                    bcrypt.compare(password, user.password, (err, isFound)=>{
                        if(err){
                            throw err;
                        }
                        if(isFound){
                            return done(null, user);
                        }else{
                            return done(null, false, {message: "Incorrect Password"});
                        }
                    })
                }
            })
            .catch((err)=>{
                console.log(err);
                return done(err);
            });
        })
    );

    passport.use(
        new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callBackURL: `${process.env.BASE_URL}/auth/google/callback`
        },
        function (accessToken, refreshToken, profile, cb) {
            db.searchByValue({
              table: "user",
              searchAttribute: "email",
              searchValue: profile.emails[0].value,
              attributes: ["*"],
            })
              .then((result) => {
                const userData = result.data;
                if (userData.length > 0) {
                  return cb(null, { id: userData[0].id });
                } else {
                  db.insert({
                    table: "user",
                    records: [
                      {
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        avatar: profile.photos[0].value,
                        username: profile.emails[0].value.split("@")[0],
                      },
                    ],
                  })
                    .then((result) => {
                      return cb(null, { id: result.data.inserted_hashes[0] });
                    })
                    .catch((err) => {
                      console.log(err);
                      return cb(err, null);
                    });
                }
              })
              .catch((err) => {
                console.log(err);
                return cb(err, null);
              });
          }
        )
    );

    passport.serializeUser((user, done)=>{
        done(null, user.id);
    });
    passport.deserializeUser((id, done)=>{
        db.searchByHash({
            table: 'users',
            hashValues: [id],
            attributes: ['*']
        },
        function(err, user){
            done(err, user);
        });
    });
}
