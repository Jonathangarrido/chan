// File: Gulpfile.js
'use strict';

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    jadephp = require('gulp-jade-php'),
    jade = require('gulp-jade'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify');

// DESARROLLO
  // Servidor web de desarrollo
    gulp.task('server', function(){
      connect.server({
        root: './src',
        port: 6060,
        livereload: true
      });
    })

  // Compila los template a html o php
    gulp.task('templates', function() {
      gulp.src('./src/templates/*.jade')
        .pipe(jade({ // jade:html | jadephp: php
          pretty: true, // true: no compress | false: compress
        }))
        .pipe(gulp.dest('./src'))
        .pipe(connect.reload());
    });
  // Preprocesa archivos SASS a CSS y recarga los cambios
    gulp.task('css', function() {
      gulp.src('./src/css/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))// compact | compressed
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(sourcemaps.write())
        .pipe(concat('./main.css'))
        .pipe(gulp.dest('./src/css'))
        .pipe(connect.reload());
    });
  // Busca errores en el JS y nos los muestra por pantalla
    gulp.task('jshint', function() {
      return gulp.src('./src/js/src/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(uglify())
        .pipe(concat('./main.min.js'))
        .pipe(gulp.dest('./src/js/'))
        .pipe(connect.reload());
    });





gulp.task('watch', function() {
  gulp.watch(['./src/templates/**/*.jade'], ['templates']);
  gulp.watch(['./src/css/**/*.scss'], ['css']);
  gulp.watch(['./src/js/**/*.js', './Gulpfile.js'], ['jshint']);
});


gulp.task('default', ['server','watch']);