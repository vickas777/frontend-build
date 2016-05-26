'use strict';

const isDev = process.env.NODE_ENV === 'dev' || !process.env.NODE_ENV;

const gulp = require('gulp');
const prefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const rigger = require('gulp-rigger');
const cssmin = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const rimraf = require('rimraf');
const browserSync = require("browser-sync");
const gulpIf = require('gulp-if');
const notify = require('gulp-notify');
const combine = require('stream-combiner2').obj;
const reload = browserSync.reload;

let path = {
  build: {
    html: 'build/',
    js: 'build/js/',
    css: 'build/css/',
    img: 'build/img/',
    fonts: 'build/fonts/'
  },
  src: {
    html: 'src/*.html',
    js: 'src/js/main.js',
    style: 'src/style/main.scss',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  watch: {
    html: 'src/**/*.html',
    js: 'src/js/**/*.js',
    style: 'src/style/**/*.scss',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  clean: './build'
};

let config = {
  server: {
    baseDir: "./build"
  },
  host: 'localhost',
  port: 9090,
  logPrefix: "Build system"
};

gulp.task('html:build', function () {
  return combine(
    gulp.src(path.src.html),
    rigger(),
    gulp.dest(path.build.html),
    reload({stream: true})
  ).on('error', notify.onError(function (err) {
    return {
      title: "HTML",
      message: err.message
    };
  }));
});

gulp.task('js:build', function () {
  return combine(
    gulp.src(path.src.js),
    gulpIf(isDev, sourcemaps.init()),
    rigger(),
    uglify(),
    gulpIf(isDev, sourcemaps.write()),
    gulp.dest(path.build.js),
    reload({stream: true})
  ).on('error', notify.onError(function (err) {
    return {
      title: "JavaScript",
      message: err.message
    };
  }));
});

gulp.task('style:build', function () {
  return combine(
    gulp.src(path.src.style),
    gulpIf(isDev, sourcemaps.init()),
    sass(),
    prefixer(),
    cssmin(),
    gulpIf(isDev, sourcemaps.write()),
    gulp.dest(path.build.css),
    reload({stream: true})
  ).on('error', notify.onError(function (err) {
    return {
      title: "Styles",
      message: err.message
    };
  }));
});

gulp.task('image:build', function () {
  return combine(
    gulp.src(path.src.img),
    imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      interlaced: true
    }),
    gulp.dest(path.build.img),
    reload({stream: true})
  ).on('error', notify.onError(function (err) {
    return {
      title: "Images",
      message: err.message
    };
  }));
});

gulp.task('fonts:build', function () {
  return gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
    .on('error', notify.onError(function (err) {
      return {
        title: "Fonts",
        message: err.message
      };
    }));
});

gulp.task('watch', function () {
  gulp.watch(path.watch.html, gulp.series('html:build'));
  gulp.watch(path.watch.style, gulp.series('style:build'));
  gulp.watch(path.watch.js, gulp.series('js:build'));
  gulp.watch(path.watch.img, gulp.series('image:build'));
  gulp.watch(path.watch.fonts, gulp.series('fonts:build'));
});

gulp.task('webserver', function () {
  browserSync(config);
});

gulp.task('clean', function (cb) {
  rimraf(path.clean, cb);
});


gulp.task('default', gulp.series('clean',
  gulp.parallel( 'html:build', 'js:build', 'style:build', 'fonts:build', 'image:build' ),
  gulp.parallel('watch', 'webserver'))
);
