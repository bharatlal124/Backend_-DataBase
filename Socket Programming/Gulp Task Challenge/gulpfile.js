import gulp from "gulp";
import imagemin from "gulp-imagemin";
import concat from "gulp-concat";

// For Concatenate file
gulp.task("default", () => {
  const sourceFiles = [
    "src/files/**/*.js",
    "src/files/**/*.json",
    "src/files/**/*.css",
    "src/files/**/*.html",
  ];

  return gulp
    .src(sourceFiles)
    .pipe(concat("all.js"))
    .pipe(gulp.dest("dest/files"));
});

// For image min
// gulp.task("default", () => {
//   return gulp.src("src/files/*").pipe(imagemin()).pipe(gulp.dest("dest/files"));
// });
