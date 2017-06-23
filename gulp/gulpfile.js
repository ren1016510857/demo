/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-06-23 14:43:34
 * @version $Id$
	"gulp": "^3.9.1",
	"gulp-concat": "^2.6.1",
	"gulp-imagemin": "^3.3.0",
	"gulp-jshint": "^2.0.4",
	"gulp-minify-css": "^1.2.4",
	"gulp-minify-html": "^1.0.6",
	"gulp-sass": "^3.1.0",
	"gulp-uglify": "^3.0.0"
 */
	var gulp = require('gulp');
	var concat = require('gulp-concat');//文件合并
	var imagemin = require('gulp-imagemin');//压缩图片
	var pngquant = require('imagemin-pngquant'); //png图片压缩插件
	var jshint = require('gulp-jshint');//js代码检查
	var mincss = require('gulp-minify-css');//css压缩
	var minhtml = require('gulp-minify-html');//html压缩
	var sass = require('gulp-sass');//编译sass
	var uglify = require('gulp-uglify');//js压缩


	gulp.task('lint', function(){
		gulp.src(['src/js/*.js', '!src/js/*.min.js'])///获取文件，同时过滤掉.min.js文件
			.pipe(jshint())
			.pipe(jshint.reporter());//输出检查结果
	});


	gulp.task('compass', function() {
		gulp.src(['src/js/*.js', '!src/js/*.min.js'])
			.pipe(concat('all.js'))// 合并匹配到的js文件并命名为 "all.js"
			.pipe(gulp.dest('dist/js'))
			.pipe(uglify())
			.pipe(gulp.dest('dist/js'));//输出文件
	});

	gulp.task('mincss', function() {
		gulp.src(['src/css/*.css', '!src/css/*.min.css'])
			.pipe(concat('all.css'))// 合并匹配到的js文件并命名为 "all.css"
			.pipe(gulp.dest('dist/css'))
			.pipe(mincss())
			.pipe(gulp.dest('dist/css'));
	});

	gulp.task('minimg', function() {
		gulp.src('src/images/*')
			.pipe(imagemin({
	            progressive: true,
	            use: [pngquant()] //使用pngquant来压缩png图片
	        }))
	        .pipe(gulp.dest('dist/images'));

	});

	gulp.task('compile-sass', function () {//把scss文件转换为sass文件。
	    gulp.src('src/sass/*.sass')
		    .pipe(sass())
		    .pipe(gulp.dest('dist/css'));
	});

	gulp.task('htmlmini', function () {
	    gulp.src('src/*.html')
	        .pipe(minhtml())
	        .pipe(gulp.dest('dist/'));
	});

	gulp.task('watch',function(){
	    gulp.watch(['src/js/*.js', '!src/js/*.min.js'],['compass']);
	    gulp.watch(['src/css/*.css', '!src/css/*.min.css'],['mincss']);
	    gulp.watch(['src/*.html'],['htmlmini']);
	});

	// 定义默认任务,执行gulp会自动执行的任务
	gulp.task('default',['lint', 'compass', 'mincss', 'minimg', 'compile-sass', 'htmlmini']);
    // gulp.task('default', function(){
    //     gulp.run('lint', 'compass', 'mincss', 'minimg', 'compile-sass', 'htmlmini');

    //     // 监听js文件变化，当文件发生变化后会自动执行任务
    //     gulp.watch('./js/*.js', function(){
    //         gulp.run('lint','scripts');
    //     });
    // });
