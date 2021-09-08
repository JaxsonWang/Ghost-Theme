const {series, watch, src, dest, parallel} = require('gulp');
const pump = require('pump');

// gulp plugins and utils
const livereload = require('gulp-livereload');
const connect = require('gulp-connect');
const postcss = require('gulp-postcss');
const zip = require('gulp-zip');
const uglify = require('gulp-uglify');
const beeper = require('beeper');
const rename = require('gulp-rename');
const sass = require('gulp-sass');

// postcss plugins
const autoprefixer = require('autoprefixer');
const colorFunction = require('postcss-color-function');
const cssnano = require('cssnano');
const customProperties = require('postcss-custom-properties');
const easyimport = require('postcss-easy-import');

function serve(done) {
  livereload.listen();
  connect.server({
    host: '0.0.0.0',
    port: 2368,
    livereload: true
  });
  done();
}

sass.compiler = require('node-sass');

const handleError = (done) => {
  return function (err) {
    if (err) {
      beeper();
    }
    return done(err);
  };
};

function hbs(done) {
  pump([
    src(['*.hbs', 'partials/**/*.hbs', '!node_modules/**/*.hbs']),
    livereload()
  ], handleError(done));
}

function css(done) {
  const processors = [
    easyimport,
    customProperties({preserve: false}),
    colorFunction(),
    autoprefixer(),
    cssnano()
  ];

  pump([
    src('assets/main/main.scss', {sourcemaps: false}),
    sass().on('error', sass.logError),
    postcss(processors),
    rename({suffix: '.min'}),
    dest('assets/main/', {sourcemaps: '.'}),
    livereload()
  ], handleError(done));
}

function js(done) {
  pump([
    src('assets/main/main.js', {sourcemaps: false}),
    uglify(),
    rename({suffix: '.min'}),
    dest('assets/main/', {sourcemaps: '.'}),
    livereload()
  ], handleError(done));
}

function zipper(done) {
  const targetDir = 'dist/';
  const themeName = require('./package.json').name;
  const filename = themeName + '.zip';

  pump([
    src([
      '**',
      '!node_modules', '!node_modules/**',
      '!dist', '!dist/**'
    ]),
    zip(filename),
    dest(targetDir)
  ], handleError(done));
}

const cssWatcher = () => watch(['assets/main/main.scss'], css);
const jsWatcher = () => watch('assets/main/main.js', js);
const hbsWatcher = () => watch(['*.hbs', 'partials/**/*.hbs', '!node_modules/**/*.hbs'], hbs);
const watcher = parallel(cssWatcher, jsWatcher, hbsWatcher);
const build = series(css, js);
const dev = series(build, serve, watcher);

exports.build = build;
exports.zip = series(build, zipper);
exports.default = dev;
