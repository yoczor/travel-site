var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssvars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var cssImport = require('postcss-import');
var browserSync =  require('browser-sync').create();
var mixins = require('postcss-mixins');


function reload(done) {
    browserSync.reload();
    done();
}


function browserSyncFunc(done) {
    browserSync.init({
        notify:false,
        server: {
            baseDir: "app"
        }
    });
    done();
}

function css(){
    return(
            gulp
                .src('./app/assets/styles/styles.css')
                .pipe(postcss([cssImport, mixins,cssvars, nested, autoprefixer]))
                .on('error', function (errInfo) {
                    console.log(errInfo.toString());
                    this.emit('end');
                })
                .pipe(gulp.dest('./app/temp/styles'))
    )
}

function watchFiles(){
    gulp.watch('./app/assets/styles/**/*.css', gulp.series(cssInject,css));
    gulp.watch('./app/index.html', gulp.series(reload));

}

function cssInject() {
    return gulp.src('./app/temp/styles/styles.css')
        .pipe(browserSync.stream());

}

const watch = gulp.parallel(browserSyncFunc,watchFiles);

exports.watch = watch;

