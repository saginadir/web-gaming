var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var less = require('gulp-less');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');

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

gulp.task('watch', function() {
    gulp.watch(
        ['less/bootstrap/variables.less','bower.json'],
        ['bootstrap:compileLess']);
});

