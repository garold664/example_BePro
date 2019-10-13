"use strict";
// This is gulpfile for Gulp 4 with absolutely new syntax!
var gulp = require("gulp");
var sass = require("gulp-sass");
  sass.compiler = require('node-sass');

var sourcemaps = require("gulp-sourcemaps");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");

var clean = require('del');
// var clean = require('gulp-clean');

// gulp.task("style", function(done) {

function style(done) {

   gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.reload({stream: true}));

    done();
}

// });


// gulp.task("images", function(done) {

function images(done) {

   gulp.src("source/img/**/*.{png,jpg,gif,svg}")
  .pipe(imagemin({
    optimizationLevel: 3,
    progressive: true
  }))
  .pipe(gulp.dest("build/img"));

  done();

}

// });

// gulp.task("clean", function(done) {

function cleanAll(done) {
    return clean("build");
}

// });

// gulp.task("copy", function(done) {

function copyAll(done) {

  return gulp.src(["source/fonts/**/*.{woff,woff2}", "source/img/**","source/js/**/*.{js,css}", "source/*.html"], {base: "source"})
    .pipe(gulp.dest("build"));

  done();


}

// });

// gulp.task("copy-html", function(done) {

function copyHtml(done) {

  gulp.src(["source/*.html"], {base: "source"})
    .pipe(gulp.dest("build"))
    .pipe(server.reload({stream: true}));

  done();
}


function copyJS(done) {

// заодно копируются файлы плагинов (js, css)
  gulp.src(["source/js/**/*{js,css}"], {base: "source"})
    .pipe(gulp.dest("build"))
    .pipe(server.reload({stream: true}));

  done();
}

// });

// gulp.task("serve", gulp.series("style"), function() {

function serve() {

  server.init({
    server: "build",
    notify: false,
    open: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.scss", gulp.series("style"));
  gulp.watch("source/*.html", gulp.series("copyHtml"));
  gulp.watch("source/img/**/*.{png,jpg,gif,svg}", gulp.series("images"));
  gulp.watch("source/js/**/*.{js,css}", gulp.series("copyJS"));
}
// });

exports.copyAll = copyAll;
exports.style = style;
exports.images = images;
exports.cleanAll = cleanAll;
exports.copyHtml = copyHtml;
exports.copyJS = copyJS;
exports.serve = serve;

exports.build = gulp.series(cleanAll, copyAll, style, images);

// gulp.task("build", gulp.series("clean", "copy", "style", "images"));
