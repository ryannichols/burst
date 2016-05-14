var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    prefixer = require('gulp-autoprefixer'),
    webpack = require("webpack-stream"),
    gutil = require("gulp-util"),
    clean = require("gulp-clean"),
    runSequence = require('run-sequence'),
    prefixer = require('gulp-autoprefixer');

var webPackConfig = require('./webpack.config.js');

var paths = {
      sass_start: './src/sass/styles.scss',
      sass_dest: './static/css',
      sass_watch: './src/sass/**/*.scss',

      js_start: './src/js/app.jsx',
      js_dest: './static/js',
      js_watch: ['./src/js/**/*.jsx', './src/js/**/*.js'],

      clean: ['./static/js/','./static/css/'],
      sassCache: "/tmp/sass-cache"
    };

var displayError = function(error) {

    // Initial building up of the error
    var errorString = '[' + error.plugin + ']';
    errorString += ' ' + error.message.replace("\n",''); // Removes new line at the end

    // If the error contains the filename or line number add it to the string
    if(error.fileName)
        errorString += ' in ' + error.fileName;

    if(error.lineNumber)
        errorString += ' on line ' + error.lineNumber;

    // This will output an error like the following:
    // [gulp-sass] error message in file_name on line 1
    console.error(errorString);
    return errorString;
}

gulp.task('sass', function () {
  return stream = gulp.src(paths.sass_start)
    .pipe(sass())
      .on("error", function (err) {
        throw new gutil.PluginError("sass", displayError(err));
      })
    .pipe(prefixer({
      browsers: ['last 2 versions', 'ie >=10'],
      cascade: false
    }))
      .on("error", function (err) {
        throw new gutil.PluginError("sass", displayError(err));
      })
    .pipe(gulp.dest(paths.sass_dest));
});

gulp.task('js', function (cb) {
  return gulp.src(paths.js_start)
    .pipe(webpack(webPackConfig))
    .pipe(gulp.dest(paths.js_dest))
});



gulp.task("clean", function () {
  return gulp.src(paths.clean, {read: false})
    .pipe(clean());
});

gulp.task('build', ['clean'], function(cb) {
  runSequence(['sass', 'js'], cb);
});

gulp.task('watch', ['build'], function (cb) {
  gulp.watch(paths.sass_watch, ['sass']);
  gulp.watch(paths.js_watch, ['js']);
  cb();
});

gulp.task('default', ['clean', 'build', 'watch']);




