module.exports = function(config) {
    config.set({

        basePath: '.',
        frameworks: ['browserify', 'jasmine'],

        files: [
            'node_modules/angular/angular.min.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'src/app.js',
            'src/**/*.js',
            'test/**/*test.js'
        ],


        exclude: [
        ],

        preprocessors: {
            'src/app.js': ['browserify'],
            'src/**/*.js': ['browserify'],
            'test/**/*test.js': ['browserify']
        },

        browserify: {
            debug: true,
            transform: ['babelify', 'stringify']
        },

        reporters: ['progress'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_DEBUG,

        autoWatch: true,

        browsers: ['PhantomJS'],

        singleRun: false
    });
};