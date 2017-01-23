module.exports = {
    // App Settings
    MONGO_URI: process.env.MONGO_URI || 'localhost:27017',
    TOKEN_SECRET: process.env.TOKEN_SECRET || 'YOUR_UNIQUE_JWT_TOKEN_SECRET',

    // OAuth 2.0
    FACEBOOK_SECRET: process.env.FACEBOOK_SECRET || 'c1f8847b1a6db54600119fd8fbe628fb',
    GOOGLE_SECRET: process.env.GOOGLE_SECRET || 'O5suNtbRzaDYmXMtrQ8Cs4-o',
    GITHUB_SECRET: process.env.GITHUB_SECRET || '285979848d44c51d21fd4d27ea870b4e3ab51bb8',
    LINKEDIN_SECRET: process.env.LINKEDIN_SECRET || 'U9WwzgJo7d5mLdaO',

    // OAuth 1.0
    TWITTER_KEY: process.env.TWITTER_KEY || 'tsTCARpMX2c1TT3vdrnUpn73C',
    TWITTER_SECRET: process.env.TWITTER_SECRET || '9K6SiDWeqwJOdfHvijQC1ZAwWgJbODY3XI071tTFWxVRoPg8ol'
};