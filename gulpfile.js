const gulp = require("gulp");

const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

const webserver = require("gulp-webserver");

const sass = require("gulp-sass");


gulp.task("server", ["build"], ()=>{
	gulp.src("./dist")
		.pipe( webserver({
			livereload : true,
			proxies:[{
				source:"/pp",
				target:"http://cms.xiu.com",
			},{
				source:"/bb",
				target:"http://139.9.0.154:8090",
			},{
				source:"/fl",
				target:"http://139.9.0.154:8080",
			}]
		}) )
		
	gulp.watch("./src/**/*.js", ["compileJS"]);
	gulp.watch("./src/**/*.html", ["compileHTML"]);
	gulp.watch("./src/**/*.scss", ["compileCSS"]);
})

gulp.task("build", ()=>{
	
	// base参数
	gulp.src("./src/scripts/**/*.js", {
		base: "./src"
	}).pipe( gulp.dest("./dist") );
	gulp.src("./src/**/*.html", {
		base: "./src"
	}).pipe( gulp.dest("./dist") );
	gulp.src("./src/**/*.scss", {
		base: "./src"
	}).pipe(sass({
		outputStyle : "expanded"  //设定生成代码风格
	}).on('error', sass.logError))
	.pipe( gulp.dest("./dist") );
		
	gulp.src("./src/static/**/*.*", {
		base: "./src"
	}).pipe( gulp.dest("./dist") )
})


gulp.task("compileJS", ()=>{
	gulp.src("./src/**/*.js")
		// .pipe(babel({
		// 	presets: ["@babel/env"]
		// }))
		// .pipe( uglify() )
		.pipe( gulp.dest("./dist") )
		gulp.src("./src/scritps/**/*.js",{
			base:"src"
		})
		// .pipe(babel({
		// 	presets: ["@babel/env"]
		// }))
		// .pipe( uglify() )
		.pipe( gulp.dest("./dist") )
})

gulp.task("compileHTML", ()=>{
	gulp.src("./src/**/*.html")
		.pipe( gulp.dest("./dist") )
})

gulp.task("compileCSS", ()=>{
	gulp.src("./src/**/*.scss")
		.pipe(sass({
			outputStyle : "expanded"  //设定生成代码风格
		}).on('error', sass.logError))
		.pipe( gulp.dest("./dist") )
})