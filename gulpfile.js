const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();


const path = {
    app: {
      baseDir: 'app/',
      html: 'app/',
      scripts: 'app/scripts/',
      styles: 'app/styles/'
    },
    src: {
      html: 'src/index.html',
      scripts: {
          main: 'src/scripts/main.js',
          services: 'src/scripts/services.js',
          controller: 'src/scripts/controller.js'
      },
      styles: 'src/styles/main.scss'
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

gulp.task('script:build', function() {
  return gulp.src([path.src.scripts.main, path.src.scripts.services, path.src.scripts.controller])
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.app.scripts));
});

gulp.task('style', function() {
    gulp.src(path.src.styles)
      .pipe(sass())
      .pipe(gulp.dest(path.app.styles));
});

gulp.task('style:build', function() {
  gulp.src(path.src.styles)
    .pipe(sass())
    .pipe(gulp.dest(path.app.styles));
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
gulp.task('build', ['html', 'script:build', 'style:build']);