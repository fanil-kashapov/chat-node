var ids = {
    facebookAuth: {
        clientID: "1759990717620651", // your App ID
        clientSecret: "7053a06f2852140bd688da3b51b267f7", // your App Secret
        callbackURL: "http://localhost:3000/auth/facebook/callback",
    },

    twitterAuth: {
        consumerKey: "tsTCARpMX2c1TT3vdrnUpn73C",
        consumerSecret: "9K6SiDWeqwJOdfHvijQC1ZAwWgJbODY3XI071tTFWxVRoPg8ol",
        callbackURL: "http://127.0.0.1:3000/auth/twitter/callback",
    },

    linkedinAuth: {
        clientID: "77m72mf8cl4ico",
        clientSecret: "U9WwzgJo7d5mLdaO",
        callbackURL: "http://localhost:3000/auth/linkedin/callback",
    },
};

module.exports = ids;
