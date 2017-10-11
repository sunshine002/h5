var gulp = require('gulp');
/**
 * gulp-livereload的使用
 */
// var livereload = require('gulp-livereload');
// gulp.task('watch', function () {    // 这里的watch，是自定义的，写成live或者别的也行
// 	var server = livereload();

// 	// app/**/*.*的意思是 app文件夹下的 任何文件夹 的 任何文件
// 	gulp.watch('app/**/*.*', function (file) {
// 		server.changed(file.path);
// 	});
// });

/**
 * gulp-sourcemaps 引入 
 */
var sourcemaps = require('gulp-sourcemaps');

/**
 * gulp-connect的使用
 */
var connect = require('gulp-connect');
gulp.task('webserver', function () {
	connect.server({
		livereload: true,
		// 服务器初始化时所访问的目录文件，默认为根目录
		// root: 'docs'
		// open: true, // 服务器启动时自动打开网页
		// port:80,
		// host:'gulp.dev'
	});
	gulp.src(['src','docs','src/my/iSliderExtend/common/index.js'])
	// 开启sourcemaps
	.pipe(sourcemaps.init())
})
// 实时更新
gulp.task('src', function () {
	gulp.src(['src/**', 'src/**/*', 'src/**/**', 'src/**/**/*', 'src/**/**/**', 'src/**/**/**/*'])
		.pipe(connect.reload())
		// 复制文件
		.pipe(gulp.dest('docs'))
		
});
// 监控并执行实时更新
gulp.task('watch', function () {
	gulp.watch(['src/**', 'src/**/*', 'src/**/**', 'src/**/**/*', 'src/**/**/**', 'src/**/**/**/*'], ['src']);
});

/**
 * webserver的使用
 */
/* var webserver = require('gulp-webserver');
gulp.task('webserver', function () {
	gulp.src('./docs')
		.pipe(webserver({
			port: 80,//端口
			// host: '172.20.0.235',//域名
			liveload: true,//实时刷新代码。不用f5刷新

			directoryListing: {
				path: './',
				enable: true
			}
		}))
});
gulp.task('default',['webserver']);  */

/**
 * 打包合并js文件，应用的require.js
 */

//require合并
/* var concat = require('gulp-concat');
gulp.task('rjs', function () {
	gulp.src('./src/my/iSliderVertical/js/index.js')
		// .pipe(amdOptimize("main", {
		// 	//require config
		// 	paths: {
		// 		"jquery": "../../libs/jquery/dist/jquery.min",
		// 		"jquery.serializeJSON": "../../libs/jquery.serializeJSON/jquery.serializejson.min",
		// 		"sug": "src/js/suggestion/suggestion",
		// 		"validate": "../util/src/js/util/validate",
		// 		"urlParam": "../util/src/js/util/url.param"
		// 	},
		// 	shim: {
		// 		"jquery.serializeJSON": ['jquery']
		// 	}
		// }))
		.pipe(concat("index.js"))           //合并
		.pipe(gulp.dest("/docs/my/iSliderVertical/js/"))          //输出保存
}); */

/**
 * 拷贝文件：集成成watch任务中了。。
 */
//复制文件夹
// gulp.task('copy', function () {
// 	// 注意分级别拷贝
// 	return gulp.src(['src/**', 'src/**/*', 'src/**/**', 'src/**/**/*'])
// 		.pipe(gulp.dest('docs'));
// });

/**
 * 打包合并js文件，应用的require.js
 */
var requirejsOptimize = require('gulp-requirejs-optimize');
gulp.task('rjs', function () {
	return gulp.src(['./src/my/iSliderVertical/js/index.js','./src/my/iSliderExtend/js/index.js','./src/my/iSliderExtend/common/index.js'])
		// 处理目标文件
		.pipe(requirejsOptimize())
		// 输出编译后的文件,docs前不能加 ./  !!!!!!!!!!!!!!
		// .pipe(gulp.dest('./docs/my/iSliderVertical/js'));
		.pipe(gulp.dest('./docs/my/iSliderVertical/js'))
		.pipe(gulp.dest('./docs/my/iSliderExtend/js'))
		.pipe(gulp.dest('./docs/my/iSliderExtend/common'))
});



gulp.task('default', ['webserver', 'watch', 'rjs']);
