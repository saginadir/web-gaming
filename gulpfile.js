"use strict";

let gulp = require('gulp');
let mainBowerFiles = require('main-bower-files');
let less = require('gulp-less');
let rename = require('gulp-rename');
let cleanCSS = require('gulp-clean-css');
let babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');


gulp.task('bower', function() {
    return gulp.src(mainBowerFiles(), {
            base: 'bower_components'
        })
        .pipe(gulp.dest('public/lib'));
});

gulp.task('bootstrap:prepareLess', ['bower'], function() {
    return gulp.src('less/bootstrap/variables.less')
        .pipe(gulp.dest('public/lib/bootstrap/less'));
});

gulp.task('bootstrap:compileLess', ['bootstrap:prepareLess'], function() {
    return gulp.src('public/lib/bootstrap/less/bootstrap.less')
        .pipe(less())
        .pipe(gulp.dest('public/lib/bootstrap/dist/css'))
        .pipe(rename('bootstrap.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('public/lib/bootstrap/dist/css'));
});

gulp.task('requirejs:compileConfig', function() {
    return gulp.src(['public/lib/requirejs/require.js','public/lib/requirejs/config.js'])
        .pipe(concat("require.compiled.js"))
        .pipe(gulp.dest('public/lib/requirejs/'))
});

gulp.task('babel-es6', ['requirejs:compileConfig'] , function() {
    return gulp.src('public/src/general/es6/*')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('public/src/general/dist/'))
});

gulp.task('watch', function() {
    gulp.watch(
        ['less/bootstrap/variables.less','bower.json'],
        ['bootstrap:compileLess']);
});

