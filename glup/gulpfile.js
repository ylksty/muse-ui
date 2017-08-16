/**
 * [gulp description]
 * @type {[type]}
 */
var gulp = require('gulp')
var spritesmith = require('gulp.spritesmith')

function sprite() {
    var spriteData = gulp.src('temp_imgs/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css',
        padding: 10,
    }))
    return spriteData.pipe(gulp.dest('output/'))
}

gulp.task('sprite', sprite)
