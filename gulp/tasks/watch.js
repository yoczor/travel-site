var gulp = require('gulp');
var browserSync =  require('browser-sync').create();



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
