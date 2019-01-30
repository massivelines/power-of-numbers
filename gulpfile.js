var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var requirejsOptimize = require('gulp-requirejs-optimize');
var del = require('del');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var strip = require('gulp-strip-comments');
var htmlmin = require('gulp-htmlmin');
var minify = require('gulp-minify');

// Clening dist folder
gulp.task('clean', function() {
  return del(['dist/**/*']);
});
gulp.task('cleanJs', function() {
  return del(['dist/.tmp', 'dist/js/*']);
});
gulp.task('cleanTmp', function() {
  return del(['dist/.tmp']);
});

// Copy HTML
gulp.task('copyHtml', function() {
  return gulp
    .src('src/*.html')
    .pipe(strip())
    .pipe(htmlmin({ collapseWhitespace: true, minifyJS: true }))
    .pipe(gulp.dest('dist'));
});

// Process SCSS
gulp.task('scss', function() {
  var options = {
    browsers: ['> 1%'],
    cascade: false,
    grid: 'autoplace',
  };

  return gulp
    .src('src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer(options)]))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'));
});

// Copy Assets
gulp.task('assets', function() {
  return gulp.src('src/assets/**/*').pipe(gulp.dest('dist/assets'));
});

// Copy libraries
gulp.task('copyLibs', function() {
  return (
    gulp
      .src('src/libs/**/*.js')
      // .pipe(strip())
      .pipe(
        minify({
          ext: {
            min: '.js',
          },
          noSource: true
        }),
      )
      .pipe(gulp.dest('dist/libs'))
  );
});

// Compiles js files along with source maps
gulp.task('babelJs', function() {
  return (
    gulp
      .src('src/js/**/*.js')
      .pipe(strip())
      .pipe(sourcemaps.init())
      .pipe(
        babel({
          presets: [['@babel/env', { modules: false }]],
        }),
      )
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dist/.tmp'))
  );
});

// Concatenating js files
gulp.task(
  'requireJs',
  gulp.series('babelJs', function() {
    return (
      gulp
        .src('dist/.tmp/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(
          requirejsOptimize({
            baseUrl: 'dist/.tmp',
            mainConfigFile: 'dist/.tmp/config.js',
            name: 'main',
            out: 'main.js',
            optimize: 'uglify2',
            generateSourceMaps: true,
            preserveLicenseComments: false,
            useSourceUrl: true,
          }),
        )
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'))
    );
  }),
);

// Build dist
gulp.task(
  'build',
  gulp.series(
    'clean',
    'copyLibs',
    'requireJs',
    'copyHtml',
    'assets',
    'scss',
    'cleanTmp',
  ),
);

// Watch
gulp.task('default', function() {
  gulp.watch('src/scss/**/*.scss', gulp.parallel(['scss']));
  gulp.watch('src/*.html', gulp.parallel(['copyHtml']));
  gulp.watch('src/js/**/*.js', gulp.parallel(['requireJs']));
  gulp.watch('src/libs/**/*.js', gulp.parallel(['copyLibs']));
});
