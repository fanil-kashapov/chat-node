'use strict';

const gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    less = require('gulp-less'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    babelify = require('babelify'),
    watch = require('gulp-watch'),
    html2js = require('gulp-html2js'),

    js_path = 'src/',
    tmp_path = 'src/app/../',
    less_path = 'content/less/';

gulp.task('commonjs', function() {
    
    return browserify([`${js_path}app.js`]).transform(babelify.configure({
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
});

gulp.task('templates', function() {
    return gulp.src(`${tmp_path}*.tpl.html`)
        .pipe(html2js('templates.js', {
            adapter: 'angular',
            name: 'chatApp'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('vendor', function() {
    return gulp.src('src/vendor/**/*.js')
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('less', function() {
    return gulp.src(`${less_path}*.less`)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('content'));

});

gulp.task('watch-js', function() {
    return gulp.watch([`${js_path}**/*.js`, `${js_path}**/**/*.js`, `${js_path}/*.js`], ['commonjs']);
});

gulp.task('watch-less', function() {
    return gulp.watch(`${less_path}*.less`, ['less']);
});

gulp.task('watch-templates', function() {
    return gulp.watch(`${tmp_path}*.tpl.html`, ['templates']);
});

gulp.task('default', ['commonjs', 'less', 'templates', 'vendor', 'watch-js', 'watch-less', 'watch-templates']);