var gulp = require('gulp');
var clean = require('gulp-clean');
var open = require('open');
var nodemon = require('gulp-nodemon');
var runSeq = require('run-sequence')

gulp.task('start', function () {
    nodemon({
        script: 'app.js'
    });
});

gulp.task('run', ['start'], function () { open("http://localhost:2137") });

gulp.task('move', function () {
    gulp.src(['../PongGame/*.js', '../PongGame/*.html', '../PongGame/*.css', '../PongGame/*.ts'])
        .pipe(gulp.dest('./static/pong'));
});

gulp.task('clean', function () {
    gulp.src('./static/pong', { read: false })
        .pipe(clean());

});