var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var bs = require('browser-sync').create();
var clean = require('gulp-clean');
var run = require('gulp-run');
var ts = require('gulp-typescript');

var sourceServer = ['src/server/**/*.ts', 'src/lib/**/*.ts', 'src/common/**/*.ts'];
var sourceServerTests = ['src/server/**/*.spec.ts', 'src/lib/**/*.spec.ts', 'src/common/**/*.spec.ts'];
var ignoreServer = ['src/server/**/*.ts', 'src/lib/**/*.ts', 'src/common/**/*.ts'];
var buildServer = ['output/build/server', 'output/build/lib', 'output/build/common'];
var buildServerNodemon = ['output/build/server', 'output/build/lib', 'output/build/common'];
// var sourceClient = ['./src/client/**/*.ts', './src/common/**/*.ts'];
// var buildClient = ['./output/build/client', './output/build/common'];
// var buildClientNodemon = ['./output/build/client', './output/build/common'];

gulp.task('server', function () {
  return nodemon({
    watch: sourceServer,
    ignore: sourceServerTests,
    exec: 'ts-node ./src/server/app.ts',
    ext: 'ts',
    verbose: true
  });
});
gulp.task('build-clean', function(cb) {
	return gulp.src('output/build', {read: false})
  	.pipe(clean());
});

function doBuild(cb) {
  var tsProject = ts.createProject('tsconfig.json');
  return tsProject.src()
    .pipe(tsProject())
    .pipe(gulp.dest('output/build'));
}
gulp.task('build', doBuild);
gulp.task('re-build', ['build-clean'], doBuild);
gulp.task('watch', ['build'], function(cb) {
  gulp.watch(sourceServer, ['build']);
});