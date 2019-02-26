const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();


const path = {
    dist: {
      baseDir: 'dist/',
      html: 'dist/',
      scripts: 'dist/scripts/',
      styles: 'dist/styles/'
    },
    src: {
      html: 'src/index.html',
      scripts: 'src/js/**/*.js',
      styles: 'src/styles/main.scss'
    }
};

gulp.task('html', function() {
    gulp.src(path.src.html)
      .pipe(gulp.dest(path.dist.html));
});

gulp.task('script', function() {
    return gulp.src([path.src.scripts])
      .pipe(sourcemaps.init())
      .pipe(concat('index.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(path.dist.scripts));
});

gulp.task('script:build', function() {
  return gulp.src([path.src.scripts])
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.dist.scripts));
});

gulp.task('style', function() {
    gulp.src(path.src.styles)
      .pipe(sass())
      .pipe(gulp.dest(path.dist.styles));
});

gulp.task('style:build', function() {
  gulp.src(path.src.styles)
    .pipe(sass())
    .pipe(gulp.dest(path.dist.styles));
});

gulp.task('server', ['html', 'script', 'style'], function(done) {
    browserSync.init({
      server: {
        baseDir: path.dist.baseDir
      },
      host: 'localhost',
      files: [path.dist.html, path.dist.scripts, path.dist.styles]
    });
    done();
});

gulp.task('watch', function() {
  gulp.watch(path.src.html, ['html']);
  gulp.watch(path.src.styles, ['style']);
  gulp.watch(path.src.scripts, ['script']);
});

gulp.task('default', ['watch', 'server']);
gulp.task('build', ['html', 'script:build', 'style:build']);
