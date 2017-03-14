var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
// var bs = require('browser-sync').create();
var clean = require('gulp-clean');
var run = require('gulp-run');
var ts = require('gulp-typescript');
// var webpack = require('webpack-stream');

var sourceServer = ['src/server/**/*.ts', 'src/lib/**/*.ts', 'src/common/**/*.ts'];
var sourceServerTests = ['src/server/**/*.spec.ts', 'src/lib/**/*.spec.ts', 'src/common/**/*.spec.ts'];
var ignoreServer = ['src/server/**/*.ts', 'src/lib/**/*.ts', 'src/common/**/*.ts'];
var buildServer = ['output/build/server', 'output/build/lib', 'output/build/common'];
var buildServerNodemon = ['output/build/server', 'output/build/lib', 'output/build/common'];
// var sourceClient = ['./src/client/**/*.ts', './src/common/**/*.ts'];
// var buildClient = ['./output/build/client', './output/build/common'];
// var buildClientNodemon = ['./output/build/client', './output/build/common'];

gulp.task('server', ["build-dev"], function () {
  // run()
  return nodemon({
    watch: 'output/dev/server/app.js',
    // ignore: sourceServerTests,
    exec: 'ts-node ./output/dev/server/app.js',
    ext: 'ts'
  });
});
// gulp.task('webpack-server', function () {
//   return gulp.src('./src/server/app')
//     .pipe(webpack(require('./webpack.config.js')))
//     .pipe(gulp.dest('./output/dev/server'));
// });
gulp.task('default', ['server']);

//////////////////////////////////////////////////////////////
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackConfig = require("./webpack.config.js");
var path = require('path');

// dev build watch
gulp.task("build-dev", ["webpack:build-dev"], function() {
	gulp.watch(["src/server/**/*.ts", "src/common/**/*.ts"], ["webpack:build-dev"]);
});

// modify some webpack config options
var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = "sourcemap";

// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);

gulp.task("webpack:build-dev", function(callback) {
	// run webpack
	devCompiler.run(function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build-dev", err);
		gutil.log("[webpack:build-dev]", stats.toString({
			colors: true
		}));
		callback();
	});
});

// prod build
gulp.task("build", function(callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);
	myConfig.output.path = path.join(__dirname, 'output/dist/server');
	myConfig.plugins = myConfig.plugins.concat(
		new webpack.DefinePlugin({
			"process.env": {
				// This has effect on the react lib size
				"NODE_ENV": JSON.stringify("production")
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin()
	);

	// run webpack
	webpack(myConfig, function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build", err);
		gutil.log("[webpack:build]", stats.toString({
			colors: true
		}));
		callback();
	});
});
