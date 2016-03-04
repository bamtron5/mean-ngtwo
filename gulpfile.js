const gulp = require('gulp');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const watch = require('gulp-watch');
 
gulp.task('default', function(){
	gulp.src('routes/**/*.es6')
		.pipe(rename({extname:".js"}))
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('./routesBuilt'));
});


gulp.task('stream', function(){
	return gulp.src('routes/**/*.es6')
		.pipe(watch('routes/**/*.es6'))
		.pipe(rename({extname:".js"}))
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('./routesBuilt'))

		
});

gulp.task('callback', function(cb){
	gulp.src('routes/**/*.es6')
		.pipe(watch('routes/**/*.es6'))
		.pipe(rename({extname:".js"}))
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('./routesBuilt'))
		.on('end', cb)
});