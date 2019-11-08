/**
 * 1  加载gulp这个模块
 */

//let gulp = require("gulp");

/**
 * 2 编写一个任务， 任务名称叫做first
 */

/* gulp.task("first", ()=>{
	console.log("这是我编写的第一个任务");
}); */

/**
 * 加载压缩JS的模块 gulp-uglify
 */

/* const uglify = require("gulp-uglify");

const babel = require("gulp-babel");


gulp.task("compileJS", ()=>{
	//读取源文件
	gulp.src("./src/test.js")
	//将新语法转为ES5
	.pipe( babel() )
	//将文件传送给 压缩工具进行压缩
	.pipe( uglify() )
	//将压缩后的内容，生成一个新文件
	.pipe( gulp.dest("./dist/") )
}); */



const gulp = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
//const csso = require("gulp-csso");
const webserver = require("gulp-webserver");


gulp.task("compileJS", ()=>{
	gulp.src("./src/**/*.js")
		.pipe( babel({
			presets: ["@babel/env"]
		}) )
		.pipe( uglify() )
		.pipe( gulp.dest("./dist/") )
})

gulp.task("compileCSS", ()=>{
	gulp.src("./src/**/*.css")
		.pipe( csso() )
		.pipe( gulp.dest("./dist/") )
})

gulp.task("server", ()=>{
	gulp.src("./src")
		.pipe( webserver({
			livereload: true,
			directoryListing: true
			// proxies : [
			// 	{
			// 		srouce: "/list",
			// 		target: "http://jd.com/xxxx/xxxx"
			// 	}
			// ]
		}) )
})

