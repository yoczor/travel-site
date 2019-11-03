var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssvars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var cssImport = require('postcss-import');

function css(){
    return(
        gulp
            .src('./app/assets/styles/styles.css')
            .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
            .pipe(gulp.dest('./app/temp/styles'))
    )
}
