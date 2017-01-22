var jwt = require('jwt-simple'),
    request = require('request'),
    config = require('./server/config');

/*
 |--------------------------------------------------------------------------
 | Login Required Middleware
 |--------------------------------------------------------------------------
 */
function ensureAuthenticated(req, res, next) {
    if (!req.header('Authorization')) {
        return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
    }
    var token = req.header('Authorization').split(' ')[1];

    var payload = null;
    try {
        payload = jwt.decode(token, config.TOKEN_SECRET);
    } catch (err) {
        return res.status(401).send({ message: err.message });
    }

    if (payload.exp <= moment().unix()) {
        return res.status(401).send({ message: 'Token has expired' });
    }
    req.user = payload.sub;
    next();
}

/*
 |--------------------------------------------------------------------------
 | Generate JSON Web Token
 |--------------------------------------------------------------------------
 */
function createJWT(user) {
    var payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(payload, config.TOKEN_SECRET);
}

/*
 |--------------------------------------------------------------------------
 | Login with Google
 |--------------------------------------------------------------------------
 */
app.post('/auth/google', function(req, res) {
    var accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
    var peopleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: config.GOOGLE_SECRET,
        redirect_uri: req.body.redirectUri,
        grant_type: 'authorization_code'
    };

    // Step 1. Exchange authorization code for access token.
    request.post(accessTokenUrl, { json: true, form: params }, function(err, response, token) {
        var accessToken = token.access_token;
        var headers = { Authorization: 'Bearer ' + accessToken };

        // Step 2. Retrieve profile information about the current user.
        request.get({ url: peopleApiUrl, headers: headers, json: true }, function(err, response, profile) {
            if (profile.error) {
                return res.status(500).send({ message: profile.error.message });
            }
            // Step 3a. Link user accounts.
            if (req.header('Authorization')) {
                User.findOne({ google: profile.sub }, function(err, existingUser) {
                    if (existingUser) {
                        currentUser = existingUser;
                        var token = createJWT(existingUser);
                        return res.send({ token: token, user: existingUser });
                    }
                    var token = req.header('Authorization').split(' ')[1];
                    var payload = jwt.decode(token, config.TOKEN_SECRET);
                    User.findById(payload.sub, function(err, user) {
                        if (!user) {
                            return res.status(400).send({ message: 'User not found' });
                        }
                        user.google = profile.sub;
                        user.picture = user.picture || profile.picture.replace('sz=50', 'sz=200');
                        user.displayName = user.displayName || profile.name;
                        user.save(function() {
                            currentUser = user;
                            var token = createJWT(user);
                            res.send({ token: token, user: existingUser });
                        });
                    });
                });
            } else {
                // Step 3b. Create a new user account or return an existing one.
                User.findOne({ google: profile.sub }, function(err, existingUser) {
                    if (existingUser) {
                        currentUser = existingUser;
                        var token = createJWT(user);
                        res.send({ token: token, user: existingUser });
                    }
                    var user = new User();
                    user.google = profile.sub;
                    user.picture = profile.picture.replace('sz=50', 'sz=200');
                    user.displayName = profile.name;
                    user.save(function(err) {
                        currentUser = user;
                        var token = createJWT(user);
                        res.send({ token: token, user: user });
                    });
                });
            }
        });
    });
});

/*
 |--------------------------------------------------------------------------
 | Login with GitHub
 |--------------------------------------------------------------------------
 */
app.post('/auth/github', function(req, res) {
    var accessTokenUrl = 'https://github.com/login/oauth/access_token';
    var userApiUrl = 'https://api.github.com/user';
    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: config.GITHUB_SECRET,
        redirect_uri: req.body.redirectUri
    };

    // Step 1. Exchange authorization code for access token.
    request.get({ url: accessTokenUrl, qs: params }, function(err, response, accessToken) {
        accessToken = qs.parse(accessToken);
        var headers = { 'User-Agent': 'Satellizer' };

        // Step 2. Retrieve profile information about the current user.
        request.get({ url: userApiUrl, qs: accessToken, headers: headers, json: true }, function(err, response, profile) {

            // Step 3a. Link user accounts.
            if (req.header('Authorization')) {
                User.findOne({ github: profile.id }, function(err, existingUser) {
                    if (existingUser) {
                        currentUser = existingUser;
                        var token = createJWT(existingUser);
                        return res.send({ token: token, user: existingUser });
                    }
                    var token = req.header('Authorization').split(' ')[1];
                    var payload = jwt.decode(token, config.TOKEN_SECRET);
                    User.findById(payload.sub, function(err, user) {
                        if (!user) {
                            return res.status(400).send({ message: 'User not found' });
                        }
                        user.github = profile.id;
                        user.picture = user.picture || profile.avatar_url;
                        user.displayName = user.displayName || profile.name;
                        user.save(function() {
                            currentUser = user;
                            var token = createJWT(user);
                            res.send({ token: token, user: user });
                        });
                    });
                });
            } else {
                // Step 3b. Create a new user account or return an existing one.
                User.findOne({ github: profile.id }, function(err, existingUser) {
                    if (existingUser) {
                        currentUser = existingUser;
                        var token = createJWT(existingUser);
                        return res.send({ token: token, user: existingUser });
                    }
                    var user = new User();
                    user.github = profile.id;
                    user.picture = profile.avatar_url;
                    user.displayName = profile.name;
                    user.save(function() {
                        currentUser = user;
                        var token = createJWT(user);
                        res.send({ token: token, user: user });
                    });
                });
            }
        });
    });
});


/*
 |--------------------------------------------------------------------------
 | Login with LinkedIn
 |--------------------------------------------------------------------------
 */
app.post('/auth/linkedin', function(req, res) {
    var accessTokenUrl = 'https://www.linkedin.com/uas/oauth2/accessToken';
    var peopleApiUrl = 'https://api.linkedin.com/v1/people/~:(id,first-name,last-name,email-address,picture-url)';
    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: config.LINKEDIN_SECRET,
        redirect_uri: req.body.redirectUri,
        grant_type: 'authorization_code'
    };

    // Step 1. Exchange authorization code for access token.
    request.post(accessTokenUrl, { form: params, json: true }, function(err, response, body) {
        if (response.statusCode !== 200) {
            return res.status(response.statusCode).send({ message: body.error_description });
        }
        var params = {
            oauth2_access_token: body.access_token,
            format: 'json'
        };

        // Step 2. Retrieve profile information about the current user.
        request.get({ url: peopleApiUrl, qs: params, json: true }, function(err, response, profile) {

            // Step 3a. Link user accounts.
            if (req.header('Authorization')) {
                User.findOne({ linkedin: profile.id }, function(err, existingUser) {
                    if (existingUser) {
                        currentUser = existingUser;
                        var token = createJWT(existingUser);
                        return res.send({ token: token, user: existingUser });
                    }
                    var token = req.header('Authorization').split(' ')[1];
                    var payload = jwt.decode(token, config.TOKEN_SECRET);
                    User.findById(payload.sub, function(err, user) {
                        if (!user) {
                            return res.status(400).send({ message: 'User not found' });
                        }
                        user.linkedin = profile.id;
                        user.picture = user.picture || profile.pictureUrl;
                        user.displayName = user.displayName || profile.firstName + ' ' + profile.lastName;
                        user.save(function() {
                            currentUser = user;
                            var token = createJWT(existingUser);
                            return res.send({ token: token, user: existingUser });
                        });
                    });
                });
            } else {
                // Step 3b. Create a new user account or return an existing one.
                User.findOne({ linkedin: profile.id }, function(err, existingUser) {
                    if (existingUser) {
                        currentUser = existingUser;
                        var token = createJWT(existingUser);
                        return res.send({ token: token, user: existingUser });
                    }
                    var user = new User();
                    user.linkedin = profile.id;
                    user.picture = profile.pictureUrl;
                    user.displayName = profile.firstName + ' ' + profile.lastName;
                    user.save(function() {
                        currentUser = user;
                        var token = createJWT(user);
                        return res.send({ token: token, user: user });
                    });
                });
            }
        });
    });
});


/*
 |--------------------------------------------------------------------------
 | Login with Facebook
 |--------------------------------------------------------------------------
 */
app.post('/auth/facebook', function(req, res) {
    var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name'];
    var accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
    var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
    var params = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: config.FACEBOOK_SECRET,
        redirect_uri: req.body.redirectUri
    };

    // Step 1. Exchange authorization code for access token.
    request.get({ url: accessTokenUrl, qs: params, json: true }, function(err, response, accessToken) {
        if (response.statusCode !== 200) {
            return res.status(500).send({ message: accessToken.error.message });
        }

        // Step 2. Retrieve profile information about the current user.
        request.get({ url: graphApiUrl, qs: accessToken, json: true }, function(err, response, profile) {
            if (response.statusCode !== 200) {
                return res.status(500).send({ message: profile.error.message });
            }
            if (req.header('Authorization')) {
                User.findOne({ facebook: profile.id }, function(err, existingUser) {
                    if (existingUser) {
                        currentUser = existingUser;
                        return res.send({ token: createJWT(existingUser), user: existingUser });
                    }
                    var token = req.header('Authorization').split(' ')[1];
                    var payload = jwt.decode(token, config.TOKEN_SECRET);
                    User.findById(payload.sub, function(err, user) {
                        if (!user) {
                            return res.status(400).send({ message: 'User not found' });
                        }
                        user.facebook = profile.id;
                        user.picture = user.picture || 'https://graph.facebook.com/v2.3/' + profile.id + '/picture?type=large';
                        user.displayName = user.displayName || profile.name;
                        user.save(function() {
                            currentUser = user;
                            return res.send({ token: createJWT(existingUser), user: existingUser });
                        });
                    });
                });
            } else {
                // Step 3. Create a new user account or return an existing one.
                User.findOne({ facebook: profile.id }, function(err, existingUser) {
                    if (existingUser) {
                        currentUser = existingUser;
                        return res.send({ token: createJWT(existingUser), user: existingUser });
                    }
                    var user = new User();
                    user.facebook = profile.id;
                    user.picture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
                    user.displayName = profile.name;
                    user.save(function() {
                        currentUser = user;
                        return res.send({ token: createJWT(user), user: user });
                    });
                });
            }
        });
    });
});


/*
 |--------------------------------------------------------------------------
 | Login with Twitter
 |--------------------------------------------------------------------------
 */
app.post('/auth/twitter', function(req, res) {
    var requestTokenUrl = 'https://api.twitter.com/oauth/request_token';
    var accessTokenUrl = 'https://api.twitter.com/oauth/access_token';
    var profileUrl = 'https://api.twitter.com/1.1/users/show.json?screen_name=';

    // Part 1 of 2: Initial request from Satellizer.
    if (!req.body.oauth_token || !req.body.oauth_verifier) {
        var requestTokenOauth = {
            consumer_key: config.TWITTER_KEY,
            consumer_secret: config.TWITTER_SECRET,
            callback: req.body.redirectUri
        };

        // Step 1. Obtain request token for the authorization popup.
        request.post({ url: requestTokenUrl, oauth: requestTokenOauth }, function(err, response, body) {
            var oauthToken = qs.parse(body);

            // Step 2. Send OAuth token back to open the authorization screen.
            res.send(oauthToken);
        });
    } else {
        // Part 2 of 2: Second request after Authorize app is clicked.
        var accessTokenOauth = {
            consumer_key: config.TWITTER_KEY,
            consumer_secret: config.TWITTER_SECRET,
            token: req.body.oauth_token,
            verifier: req.body.oauth_verifier
        };

        // Step 3. Exchange oauth token and oauth verifier for access token.
        request.post({ url: accessTokenUrl, oauth: accessTokenOauth }, function(err, response, accessToken) {

            accessToken = qs.parse(accessToken);

            var profileOauth = {
                consumer_key: config.TWITTER_KEY,
                consumer_secret: config.TWITTER_SECRET,
                oauth_token: accessToken.oauth_token
            };

            // Step 4. Retrieve profile information about the current user.
            request.get({
                url: profileUrl + accessToken.screen_name,
                oauth: profileOauth,
                json: true
            }, function(err, response, profile) {

                // Step 5a. Link user accounts.
                if (req.header('Authorization')) {
                    User.findOne({ twitter: profile.id }, function(err, existingUser) {
                        if (existingUser) {
                            currentUser = existingUser;
                            return res.send({ token: createJWT(existingUser), user: existingUser });
                        }

                        var token = req.header('Authorization').split(' ')[1];
                        var payload = jwt.decode(token, config.TOKEN_SECRET);

                        User.findById(payload.sub, function(err, user) {
                            if (!user) {
                                return res.status(400).send({ message: 'User not found' });
                            }

                            user.twitter = profile.id;
                            user.displayName = user.displayName || profile.name;
                            user.picture = user.picture || profile.profile_image_url.replace('_normal', '');
                            user.save(function(err) {
                                currentUser = user;
                                return res.send({ token: createJWT(existingUser), user: existingUser });
                            });
                        });
                    });
                } else {
                    // Step 5b. Create a new user account or return an existing one.
                    User.findOne({ twitter: profile.id }, function(err, existingUser) {
                        if (existingUser) {
                            currentUser = existingUser;
                            return res.send({ token: createJWT(existingUser), user: existingUser });
                        }

                        var user = new User();
                        user.twitter = profile.id;
                        user.displayName = profile.name;
                        user.picture = profile.profile_image_url.replace('_normal', '');
                        user.save(function() {
                            currentUser = user;
                            return res.send({ token: createJWT(user), user: user });
                        });
                    });
                }
            });
        });
    }
});

/*
 |--------------------------------------------------------------------------
 | Unlink Provider
 |--------------------------------------------------------------------------
 */
app.post('/auth/unlink', ensureAuthenticated, function(req, res) {
    var provider = req.body.provider;
    var providers = ['facebook', 'foursquare', 'google', 'github', 'instagram',
        'linkedin', 'live', 'twitter', 'twitch', 'yahoo'
    ];

    if (providers.indexOf(provider) === -1) {
        return res.status(400).send({ message: 'Unknown OAuth Provider' });
    }

    User.findById(req.user, function(err, user) {
        if (!user) {
            return res.status(400).send({ message: 'User Not Found' });
        }
        user[provider] = undefined;
        user.save(function() {
            currentUser = '';
            res.status(200).end();
        });
    });
});