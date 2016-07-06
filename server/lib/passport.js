// config/passport.js

    // load all the things we need
var FacebookStrategy = require("passport-facebook").Strategy,
    TwitterStrategy = require("passport-twitter").Strategy,
    LinkedInStrategy = require("passport-linkedin").Strategy,
    // load up the user model
    User = require("./model/User"),
    // load the auth variables
    configAuth = require("../config/oauth");

module.exports = function (passport) {
    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({
        // pull in our app id and secret from our auth.js file
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
    }, function (token, refreshToken, profile, done) {
        // facebook will send back the token and profile
        // asynchronous
        process.nextTick(function () {
            // find the user in the database based on their facebook id
            User.findOne({ "facebook.id": profile.id }, function (err, user) {
                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err) {
                    return done(err);
                }

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser = new User();

                    // set all of the facebook information in our user model
                    newUser.facebook.id = profile.id; // set the users facebook id
                    newUser.facebook.token = token; // we will save the token that facebook provides to the user
                    newUser.facebook.name = `${profile.name.givenName} ${profile.name.familyName}`; // look at the passport user profile to see how names are returned
                    newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                    // save our user to the database
                    newUser.save(function (err) {
                        if (err) {
                            throw err;
                        }

                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }

            });
        });

    }));


    // =========================================================================
    // TWITTER =================================================================
    // =========================================================================
    passport.use(new TwitterStrategy({
        consumerKey: configAuth.twitterAuth.consumerKey,
        consumerSecret: configAuth.twitterAuth.consumerSecret,
        callbackURL: configAuth.twitterAuth.callbackURL,
    }, function (token, tokenSecret, profile, done) {
        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Twitter
        process.nextTick(function () {

            User.findOne({ "twitter.id": profile.id }, function (err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err) {
                    return done(err);
                }

                // if the user is found then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user, create them
                    var newUser = new User();

                    // set all of the user data that we need
                    newUser.twitter.id = profile.id;
                    newUser.twitter.token = token;
                    newUser.twitter.username = profile.username;
                    newUser.twitter.displayName = profile.displayName;

                    // save our user into the database
                    newUser.save(function (err) {
                        if (err) {
                            throw err;
                        }
                        return done(null, newUser);
                    });
                }
            });

        });
    }));


    // =========================================================================
    // LINKEDIN =================================================================
    // =========================================================================
    passport.use(new LinkedInStrategy({
        consumerKey: configAuth.linkedinAuth.clientID,
        consumerSecret: configAuth.linkedinAuth.clientSecret,
        callbackURL: configAuth.linkedinAuth.callbackURL,
    }, function (token, tokenSecret, profile, done) {
        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from LINKEDIN
        process.nextTick(function () {
            User.findOne({ "linkedIn.id": profile.id }, function (err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err) {
                    return done(err);
                }

                // if the user is found then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user, create them
                    var newUser = new User();

                    // set all of the user data that we need
                    newUser.linkedin.id = profile.id;
                    newUser.linkedin.token = token;
                    newUser.linkedin.username = profile.name.familyName;
                    newUser.linkedin.displayName = profile.displayName;

                    // save our user into the database
                    newUser.save(function (err) {
                        if (err) {
                            throw err;
                        }
                        return done(null, newUser);
                    });
                }
            });

        });
    }));
};
