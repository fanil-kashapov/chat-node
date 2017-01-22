var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    userSchema = new mongoose.Schema({
        email: { type: String, unique: true, lowercase: true },
        password: { type: String, select: false },
        displayName: String,
        picture: String,
        bitbucket: String,
        facebook: String,
        foursquare: String,
        google: String,
        github: String,
        instagram: String,
        linkedin: String,
        live: String,
        yahoo: String,
        twitter: String,
        twitch: String,
        spotify: String
    });


userSchema.pre('save', (next) => {
    if (!this.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(this.password, salt, function (err, hash) {
            this.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = (password, done) => {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        done(err, isMatch);
    });
};

module.exports = userSchema;
