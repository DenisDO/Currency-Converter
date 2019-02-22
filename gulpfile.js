const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();


const path = {
    app: {
      baseDir: 'app/',
      html: 'app/',
      scripts: 'app/scripts/',
      styles: 'app/styles/',
      images: 'app/images/'
    },
    src: {
      html: 'src/index.html',
      scripts: {
          main: 'src/scripts/main.js',
          services: 'src/scripts/services.js',
          controller: 'src/scripts/controller.js'
      },
      styles: 'src/styles/main.scss',
      images: 'src/images/**/*.{jpg,jpeg,png}'
    }
};

gulp.task('html', function() {
    gulp.src(path.src.html)
      .pipe(gulp.dest(path.app.html));
});

gulp.task('script', function() {
    return gulp.src([path.src.scripts.main, path.src.scripts.services, path.src.scripts.controller])
      .pipe(sourcemaps.init())
      .pipe(concat('index.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(path.app.scripts));
});

gulp.task('style', function() {
    gulp.src(path.src.styles)
      .pipe(sass())
      .pipe(gulp.dest(path.app.styles));
});

gulp.task('image', function() {
    gulp.src(path.src.images)
      .pipe(imagemin({
        progressive: true,
        interlaced: true
      }))
      .pipe(gulp.dest(path.app.images))
});

gulp.task('server', ['html', 'script', 'style'], function(done) {
    browserSync.init({
      server: {
        baseDir: path.app.baseDir
      },
      host: 'localhost',
      files: [path.app.html, path.app.scripts, path.app.styles]
    });
    done();
});

gulp.task('watch', function() {
  gulp.watch(path.src.html, ['html']);
  gulp.watch(path.src.styles, ['style']);
  gulp.watch(path.src.scripts.main, ['script']);
  gulp.watch(path.src.scripts.services, ['script']);
  gulp.watch(path.src.scripts.controller, ['script']);
});

gulp.task('default', ['watch', 'server']);