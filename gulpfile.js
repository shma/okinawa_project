var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');

//JS圧縮
gulp.task('minify-js', function() {
    return gulp.src("public/js/*.js")
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'));
        //.pipe(gulp.dest('js')); 上書きする場合
});

//CSS圧縮
gulp.task('minify-css', function() {
    return gulp.src("public/css/*.css")
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css/'));
        //.pipe(gulp.dest('css')); 上書きする場合
});
