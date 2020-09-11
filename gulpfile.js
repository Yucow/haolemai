//一、导入模块
let gulp = require('gulp');
let concat = require('gulp-concat');
let htmlmin = require('gulp-htmlmin');
let imagemin = require('gulp-imagemin');
let rename = require('gulp-rename');
let uglify = require('gulp-uglify');
let cssnano = require('gulp-cssnano');
let babel = require('gulp-babel');
//二、发布任务
//优化js
function fnJS(){
    return gulp.src('./src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename({suffix : '.min'}))
        .pipe(gulp.dest('./dist/js'));
}
//优化css
function fnCSS(){
    return gulp.src('./src/sass/*.css')
        .pipe(cssnano())
        .pipe(rename({suffix : '.min'}))
        .pipe(gulp.dest('./dist/css'));
}
//优化图片
function fnImg(){
    return gulp.src('./src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'));
}
//复制html
function fnCopyIndex(){
    return gulp.src('./src/index.html') 
        .pipe(gulp.dest('./dist/'));
}
//优化html
function fnHtml(){
    return gulp.src('./src/html/*.html')
        .pipe(htmlmin())
        .pipe(rename({suffix : '.min'}))
        .pipe(gulp.dest('./dist/html'));
}
//监听任务
function fnWatch(){
    gulp.watch('./src/js/*.js',fnJS);
    gulp.watch('./src/sass/*.css',fnCSS);
    gulp.watch('./src/img/*',fnImg);
    gulp.watch('./src/html/*.html',fnHtml);
    gulp.watch('./index.html',fnCopyIndex);
    
}


//导出任务
exports.js = fnJS;
exports.css = fnCSS;
exports.img = fnImg;
exports.copyIndex = fnCopyIndex;
exports.html = fnHtml;
exports.default = fnWatch;