const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();


const path = {
    dist: {
      baseDir: 'dist/',
      html: {
        index: 'dist/',
        components: 'dist/components/',
        directives: 'dist/directives/'
      },
      scripts: 'dist/scripts/',
      styles: 'dist/styles/'
    },
    src: {
      html: {
        index: 'src/index.html',
        components: {
          cyrrencyConverter: 'src/components/currency_converter/template.html'
        },
        directives: {
          noInternetWrapper: 'src/directives/no_internet_wrapper/template.html'
        }
      },
      scripts: {
          main: 'src/scripts/main.js',
          components: {
            cyrrencyConverter: {
              index: 'src/components/currency_converter/index.js',
              controller: 'src/components/currency_converter/currency_converter.controller.js'
            }
          },
          directives: {
            noInternetWrapper: 'src/directives/no_internet_wrapper/index.js'
          },
          services: 'src/scripts/services.js',
          filters: 'src/scripts/filters.js'
      },
      styles: 'src/styles/main.scss'
    }
};

gulp.task('html', function() {
    gulp.src(path.src.html.index)
      .pipe(gulp.dest(path.dist.html.index));
    gulp.src(path.src.html.components.cyrrencyConverter)
      .pipe(gulp.dest(path.dist.html.components));
    gulp.src(path.src.html.directives.noInternetWrapper)
      .pipe(gulp.dest(path.dist.html.directives));
});

gulp.task('script', function() {
    return gulp.src([path.src.scripts.main, path.src.scripts.components.cyrrencyConverter.index, path.src.scripts.directives.noInternetWrapper, path.src.scripts.services, path.src.scripts.filters, path.src.scripts.components.cyrrencyConverter.controller])
      .pipe(sourcemaps.init())
      .pipe(concat('index.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(path.dist.scripts));
});

gulp.task('script:build', function() {
  return gulp.src([path.src.scripts.main, path.src.scripts.components.cyrrencyConverter.index, path.src.scripts.directives.noInternetWrapper, path.src.scripts.services, path.src.scripts.filters, path.src.scripts.components.cyrrencyConverter.controller])
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
      files: [path.dist.html.index, path.dist.scripts, path.dist.styles]
    });
    done();
});

gulp.task('watch', function() {
  gulp.watch(path.src.html.index, ['html']);
  gulp.watch(path.src.scripts.components.cyrrencyConverter.index, ['html']);
  gulp.watch(path.src.scripts.directives.noInternetWrapper, ['html']);
  gulp.watch(path.src.styles, ['style']);
  gulp.watch(path.src.scripts.main, ['script']);
  gulp.watch(path.src.scripts.currencyConverter, ['script']);
  gulp.watch(path.src.scripts.noInternerWrapper, ['script']);
  gulp.watch(path.src.scripts.services, ['script']);
  gulp.watch(path.src.scripts.filters, ['script']);
  gulp.watch(path.src.scripts.components.cyrrencyConverter.controller, ['script']);
});

gulp.task('default', ['watch', 'server']);
gulp.task('build', ['html', 'script:build', 'style:build']);