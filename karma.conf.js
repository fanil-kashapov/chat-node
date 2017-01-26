module.exports = function(config) {
    config.set({

        basePath: '.',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['browserify', 'jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'node_modules/angular/angular.min.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'src/app.js',
            'src/**/*.js',
            'src/**/*.test.js'
        ],


        exclude: [
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/app.js': ['browserify'],
            'src/**/*.js': ['browserify'],
            'src/**/*.test.js': ['browserify']
        },

        // configure jasmine.frameworks
        browserify: {
            debug: true,
            transform: [['babelify', { presets: ['es2015'] , plugins: ['transform-object-assign'] }]]
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha'],

         // List of plugins to load.
        // A plugin can be a string (in which case it will be required by Karma)
        // or an inlined plugin - Object.
        // By default, Karma loads all sibling NPM modules which have a name starting
        // with karma-*.
        //plugins: ['karma-browserify', 'karma-jasmine', 'karma-phantomjs-launcher', 'karma-spec-reporter'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}

    


    


    


    


    

    