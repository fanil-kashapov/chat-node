// app/routes.js

module.exports = function (app, passport) {
    /* Server routing */

    //Handle route "GET /", as in "http://localhost:8080/"
    app.get("/", function (req, res) {

        //Render the view called "index"
        res.render("index");

    });


    // route for login form
    // route for processing the login form
    // route for signup form
    // route for processing the signup form

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/',
            failureRedirect: '/'
        }));

    // route for logging out
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    // =====================================
    // TWITTER ROUTES ======================
    // =====================================
    // route for twitter authentication and login
    app.get('/auth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect: '/',
            failureRedirect: '/'
        })
    );

    // =====================================
    // LINKEDIN ROUTES ======================
    // =====================================
    // route for linkedID authentication and login
    app.get('/auth/linkedin', passport.authenticate('linkedin'));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/linkedin/callback',
        passport.authenticate('linkedin', {
            successRedirect: '/',
            failureRedirect: '/'
        })
    );
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
        return next();
    }

    // if they aren't redirect them to the home page
    res.redirect('/');
}