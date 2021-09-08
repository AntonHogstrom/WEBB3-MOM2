//Gulp Methods
const {src, dest, watch, series, parallel} = require('gulp');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const postCss = require('gulp-postcss');
const cssNano = require('cssnano');
const autoPrefixer = require('autoprefixer');
const htmlMin = require('gulp-htmlmin');
const browserSync = require('browser-sync').create();
const sourceMap = require('gulp-sourcemaps');
const imageMin = require('gulp-imagemin');
const webp = require('gulp-webp');

//directories
const files = {
    htmlPath: "src/**/*.html",
    cssPath: "src/css/*.css",
    jsPath: "src/js/*.js",
    imgPath: "src/IMG/*"
}

//HTML-task, returns HTML-files from files.htmlPath and copy them over to destination pub (folder)
function copyHTML() { 
    return src(files.htmlPath)
    .pipe(htmlMin({ collapseWhitespace: true }))
    .pipe(dest('pub'));
}

//JS-task, contatinate, minify JS-files.
function jsTask() {
    return src(files.jsPath)
    .pipe(sourceMap.init())
        .pipe(concat('main.js'))
        .pipe(terser())
    .pipe(sourceMap.write('../maps'))
    .pipe(dest('pub/js'));
}

//CSS-task, contatinate, minify CSS-files
function cssTask() {
    return src(files.cssPath)
    .pipe(sourceMap.init())
        .pipe(concat('main.css'))
        .pipe(postCss([ autoPrefixer(), cssNano() ]))
    .pipe(sourceMap.write('../maps'))
    .pipe(dest('pub/css'))
    .pipe(browserSync.stream());
}

//IMG-task, returns images, optimizes
function imgTask() {
    return src(files.imgPath)
    .pipe(imageMin())
    .pipe(dest('pub/IMG'))
}

//WEBP-task, returns images, optimizes
function webpTask() {
    return src(files.imgPath)
    .pipe(webp())
    .pipe(dest('pub/img/webp'));
}

//Watch-task, 
function watchTask() {

    browserSync.init({
        server: "./pub"
    });

    watch(files.jsPath, jsTask).on('change', browserSync.reload);
    watch(files.htmlPath, copyHTML).on('change', browserSync.reload);
    watch(files.cssPath, cssTask).on('change', browserSync.reload);
    watch(files.imgPath, (imgTask, webpTask)).on('change', browserSync.reload);
}




exports.default = series(
    parallel(copyHTML, jsTask, cssTask, imgTask, webpTask),
    watchTask
);