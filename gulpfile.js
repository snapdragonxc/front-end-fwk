var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
//
//
gulp.task('pages-js', function(){
   gulp.src('example/src/scripts/app/*.js')
   .pipe(concat('app.js'))
  /* .pipe(uglify()) */
   .pipe(gulp.dest('example/www/scripts/'));
});
//
gulp.task('css', function(){
   gulp.src('example/src/styles/*.css')
   .pipe(concat('styles.css'))
   .pipe(minify())
   .pipe(gulp.dest('example/www/styles/'));
});
//
gulp.task('default',['pages-js','css'],function(){
});
