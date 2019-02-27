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
      templates: 'dist/templates/',
      styles: 'dist/styles/',
      images: 'dist/images/'
    },
    src: {
      html: 'src/index.html',
      templates: [
        'src/components/**/*.html',
        'src/directives/**/*.html'
      ],
      scripts: [
        'src/scripts/main.js',
        'src/scripts/filters.js',
        'src/scripts/services.js',
        'src/components/**/*.js',
        'src/directives/**/*.js'
      ],
      styles: 'src/styles/main.scss',
      images: 'src/images/**/*.{jpg,jpeg,png}'
    }
};

gulp.task('html', function() {
    gulp.src(path.src.html)
      .pipe(gulp.dest(path.dist.html));
    gulp.src(path.src.templates)
      .pipe(gulp.dest(path.dist.templates));
});

gulp.task('script', function() {
    gulp.src(path.src.scripts)
      .pipe(sourcemaps.init())
      .pipe(concat('index.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(path.dist.scripts));
});

gulp.task('script:build', function() {
  gulp.src(path.src.scripts)
    .pipe(concat('index.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.dist.scripts));
});

gulp.task('image', function() {
  gulp.src(path.src.images)
    .pipe(gulp.dest(path.dist.images));
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
      files: [
        path.dist.html,
        path.dist.templates,
        path.dist.styles,
        path.dist.scripts,
        path.dist.images
      ]
    });
    done();
});

gulp.task('watch', function() {
  gulp.watch(path.src.html, ['html']);
  gulp.watch(path.src.styles, ['style']);
  gulp.watch(path.src.scripts, ['script']);
  gulp.watch(path.src.images, ['image']);
});

gulp.task('default', ['watch', 'server']);
gulp.task('build', ['html', 'script:build', 'style:build', 'image']);