"use strict"

var gulp = require('gulp');
var connect = require('gulp-connect'); // runs a local dev server
var open = require('gulp-open'); // open a url in a web browser
var browserify = require('browserify'); //bundles JS
var reactify = require('reactify'); //transforms react JSX to JS
var source = require('vinyl-source-stream'); //use conventional text streams with gulp
var concat = require('gulp-concat'); // concatenates files
var lint = require('gulp-eslint'); // Lint JS files, including JSX

var config = {
	port: 9005,
	devBaseUrl: 'http://localhost',
	pathes:{
		html: './src/*.html',
		js: './src/**/*.js',
		images: './src/images/*',
		css : [
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
			'node_modules/toastr/toastr.css'
		],
		dist: './dist',
		mainJs: './src/main.js'
	}
}

//start a local development server 
gulp.task('connect',function(){
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});


gulp.task('open',['connect'],function(){
	gulp.src('dist/index.html')
		.pipe(open({
			uri: config.devBaseUrl + ':' + config.port + '/'
		}));
});

gulp.task('html', function(){
	gulp.src(config.pathes.html)
		.pipe(gulp.dest(config.pathes.dist))
		.pipe(connect.reload());
});

gulp.task('js',function(){
	browserify(config.pathes.mainJs)
		.transform(reactify)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.pathes.dist + '/scripts'))
		.pipe(connect.reload());
});

gulp.task('css', function(){
	gulp.src(config.pathes.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.pathes.dist + '/css'));
});

// to publish images
gulp.task('images', function() {
	gulp.src(config.pathes.images)
		.pipe(gulp.dest(config.pathes.dist + '/images'))
		.pipe(connect.reload());

		//publish favoicon
		gulp.src('./src/favoicon.ico')
			.pipe(gulp.dest(config.pathes.dist));
});

gulp.task('lint', function(){
	return gulp.src(config.pathes.js)
		.pipe(lint({config: 'eslint.config.json'}))
		.pipe(lint.format());
});

gulp.task('watch',function(){
	gulp.watch(config.pathes.html,['html']);
	gulp.watch(config.pathes.js,['js','lint']);
});

gulp.task('default',['html', 'js','css', 'images', 'lint', 'open', 'watch']);