'use strict';

const gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    mainfile = 'src/',
    babel = require('gulp-babel'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    templateCache = require('gulp-angular-templatecache'),
    merge2 = require('merge2'),
    babelify = require('babelify'),
    del = require('del'),
    html2js = require('gulp-html2js');

// gulp.task('clean-temp', function(){
//     return del(['temp']);
// });

// gulp.task('es6-commonjs',['clean-temp'], function(){
//     return gulp.src([`${mainfile}app.js`,`${mainfile}**/**/*.js`])
//         .pipe(babel({
//             presets: ['es2015']
//         }))
//         .pipe(gulp.dest('temp'));
// });

// gulp.task('bundle-commonjs-clean', function(){
//     return del(['es5/commonjs']);
// });

gulp.task('commonjs-bundle', function(){
    // var src = browserify(['temp/app.js']).bundle()
    //     .pipe(source('app.js'))
    //     .pipe(buffer())
    //     .pipe(sourcemaps.init({ loadMaps: true }));

    return browserify([`${mainfile}app.js`]).transform(babelify.configure({
        sourceMapsAbsolute: true,
        presets: ['es2015', 'react'],
        // Optional ignore regex - if any filenames **do** match this regex then
        // they aren't compiled
        ignore: /vendor/,

        // Optional only regex - if any filenames **don't** match this regex
        // then they aren't compiled
        only: /src/
    }))
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
        

    // var vendor = gulp.src('src/vendor/**/*.js')
    //     .pipe(concat('vendor.js'));
    // var tmp = gulp.src('src/app/templates/*.html')
    //         .pipe(html2js('angular.js', {
    //             adapter: 'angular',
    //             base: 'templates',
    //             name: 'chatApp'
    //         }))
    //         .pipe(gulp.dest('dist'));
    // // var tmp = gulp.src('src/app/templates/*.html')
    // //     //.pipe(minify and preprocess the template html here)
    // //     .pipe(templateCache('templates.js', { module: 'chatApp' }));

    // return merge2(src, vendor)
    //          .pipe(concat('app.js'))
    //          //.pipe(uglify())
    //          .pipe(gulp.dest('dist'));
});

gulp.task('templates', function(){
    return gulp.src('src/app/templates/*.html')
            .pipe(html2js('templates.js', {
                adapter: 'angular',
                name: 'chatApp'
            }))
            .pipe(gulp.dest('dist'));
});

gulp.task('vendor', function(){
    return gulp.src('src/vendor/**/*.js')
            .pipe(concat('vendor.js'))
            .pipe(gulp.dest('dist'));
});

gulp.task('commonjs', ['commonjs-bundle', 'templates', 'vendor']);