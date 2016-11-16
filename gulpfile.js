'use strict';

const gulp = require('gulp');
const tslint = require('gulp-tslint');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');
const flatten = require('gulp-flatten');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');

gulp.task('clean', function () {
    return del([
        './static/*'
    ]);
});

/**
 * bower libs.
 */
gulp.task("libs-bower", () => {
    return gulp.src([
    ], { cwd: "bower_components/**" })
        .pipe(gulp.dest("static/libs"));
});

/**
 * bower libs.
 */
gulp.task("libs-npm", () => {
    return gulp.src([
        /*
        'core-js/client/*',
        'zone.js/dist/*',
        'reflect-metadata/*',
        'systemjs/dist/*'
        */
        'core-js/client/shim.min.js',
        'systemjs/dist/system-polyfills.js',
        'systemjs/dist/system.src.js',
        'reflect-metadata/Reflect.js',
        'rxjs/**',
        'zone.js/dist/**',
        '@angular/**'
    ], { cwd: "node_modules/**" })
        .pipe(gulp.dest("static/libs"));
});

/**
 * Copy all required libraries into build directory.
 */
gulp.task("font-awesome", () => {
    return gulp.src([
        'font-awesome-scss/fonts/*',
    ], { cwd: "node_modules/**" })
        .pipe(flatten())
        .pipe(gulp.dest("static/fonts"));
});
gulp.task('fonts', ['font-awesome']);

// favicon for iphone
gulp.task("favicon-fldr", () => {
    return gulp.src([
        'src/favicon/*.png',
    ])
        .pipe(flatten())
        .pipe(gulp.dest("static/favicon"));
});

// favicon.ico
gulp.task("favicon-ico", () => {
    return gulp.src([
        'src/favicon/*.ico',
    ])
        .pipe(flatten())
        .pipe(gulp.dest("static"));
});
gulp.task('favicon', ['favicon-ico', 'favicon-fldr']);

// img
gulp.task("img", () => {
    return gulp.src([
        'src/img/**',
    ])
        .pipe(flatten({ includeParents: 3 }))
        .pipe(gulp.dest("static/img"));
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'ts'], function () {
    browserSync.init({
        open: 'external',
        host: '127.0.0.1',
        proxy: '127.0.0.1:8080',
        port: 8081
    });

    gulp.watch("./src/sass/**/*.scss", ['sass']);
    gulp.watch("./src/app/**/*.ts", ['ts']);
    gulp.watch(["./views/**/*.html"]).on('change', browserSync.reload);
    gulp.watch("./src/js/tag-cloud/**/*.js", ['tag-cloud-js']);
    gulp.watch(["./src/views/**/*.html"]).on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src(["./src/sass/*.scss", "./src/sass/*.css"])
        .pipe(sourcemaps.init())
        .pipe(sass({
            sourceComments: 'map',
            errLogToConsole: true,
            includePaths: ['./src/sass/**/*.scss']
        }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(concat('app.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("./static/css"))
        .pipe(browserSync.stream({ match: '**/*.css' }));
});

// TypeScript compile
gulp.task('ts', function () {
    return gulp
        .src('./src/app/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./static/js'))
        .pipe(browserSync.stream());;
});

gulp.task('tslint', function () {
    return gulp.src('./src/app/**/*.ts')
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());
});


gulp.task('default', ['tslint', 'libs-npm', 'libs-bower', 'fonts', 'img', 'favicon', 'serve']);
gulp.task('fast', [/*'clean',*/ 'serve']);