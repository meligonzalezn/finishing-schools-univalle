/*
	TASK LIST
	------------------
	01. font-fontawesome
	02. font-bootstrap
	03. js-demo
	04. js-vendor
	05. js-app
	06. plugins
	07. css-vendor
	
	08. default-html
	09. default-html-startup
	09. default-html-startup
	10. default-css
	11. default-css-rtl
	12. default-css-image
	13. default-watch
	14. default-webserver
	15. default-webserver-startup
	16. default
	17. default-startup
	
	18. material-html
	19. material-html-startup
	20. material-css
	21. material-css-rtl
	22. material-css-image
	23. material-watch
	24. material-webserver
	25. material-webserver-startup
	26. material
	27. material-startup
	
	28. apple-html
	29. apple-html-startup
	30. apple-css
	31. apple-css-rtl
	32. apple-css-image
	33. apple-watch
	34. apple-webserver
	35. apple-webserver-startup
	36. apple
	37. apple-startup
	
	38. transparent-html
	39. transparent-html-startup
	40. transparent-css
	41. transparent-css-rtl
	42. transparent-css-image
	43. transparent-watch
	44. transparent-webserver
	45. transparent-webserver-startup
	46. transparent
	47. transparent-startup
	
	48. facebook-html
	49. facebook-html-startup
	50. facebook-css
	51. facebook-css-rtl
	52. facebook-css-image
	53. facebook-watch
	54. facebook-webserver
	55. facebook-webserver-startup
	56. facebook
	57. facebook-startup
	
	58. google-html
	59. google-html-startup
	60. google-css
	61. google-css-rtl
	62. google-css-image
	63. google-watch
	64. google-webserver
	65. google-webserver-startup
	66. google
	67. google-startup
	
	68. all-html
	69. all-css
*/


var gulp         = require('gulp');
var sass         = require('gulp-sass')(require('sass'));
var minifyCSS    = require('gulp-clean-css');
var concat       = require('gulp-concat');
var sourcemaps   = require('gulp-sourcemaps');
var livereload   = require('gulp-livereload');
var connect      = require('gulp-connect');
var header       = require('gulp-header');
var uglify       = require('gulp-uglify-es').default;
var merge        = require('merge-stream');
var fileinclude  = require('gulp-file-include');
var autoprefixer = require('gulp-autoprefixer');
var distPath     = '../template';


// 01. font-fontawesome
gulp.task('font-fontawesome', function() {
  return gulp.src(['node_modules/@fortawesome/fontawesome-free/webfonts/*'])
  	.pipe(gulp.dest(distPath + '/assets/webfonts/'));
});


// 02. font-bootstrap
gulp.task('font-bootstrap', function() {
	return gulp.src(['node_modules/bootstrap-icons/font/fonts/*'])
  	.pipe(gulp.dest(distPath + '/assets/css/fonts/'));
});


// 03. js-demo
gulp.task('js-demo', function(){
	return gulp.src([ 'js/demo/**' ])
		.pipe(gulp.dest(distPath + '/assets/js/demo/'));
});


// 04. js-vendor
gulp.task('js-vendor', function(){
  return gulp.src([
  	'node_modules/pace-js/pace.min.js',
  	'node_modules/jquery/dist/jquery.min.js',
  	'node_modules/jquery-ui-dist/jquery-ui.min.js',
  	'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
  	'node_modules/perfect-scrollbar/dist/perfect-scrollbar.min.js',
  	'node_modules/js-cookie/dist/js.cookie.js'
		])
		.pipe(sourcemaps.init())
		.pipe(concat('vendor.min.js'))
		.pipe(sourcemaps.write())
		.pipe(uglify())
		.pipe(gulp.dest(distPath + '/assets/js/'))
		.pipe(livereload());
});


// 05. js-app
gulp.task('js-app', function(){
  return gulp.src([
  	'js/app.js',
  	])
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write())
    .pipe(uglify())
    .pipe(gulp.dest(distPath + '/assets/js/'))
    .pipe(livereload());
});


// 06. plugins
gulp.task('plugins', function() {
	var pluginFiles = [
  	'node_modules/@fortawesome/**',
  	'node_modules/@fullcalendar/**',
		'node_modules/@highlightjs/**',
		'node_modules/abpetkov-powerange/**',
		'node_modules/angular/**',
		'node_modules/angular-ui-bootstrap/**',
		'node_modules/angular-ui-router/**',
  	'node_modules/animate.css/**',
		'node_modules/apexcharts/**',
		'node_modules/blueimp-file-upload/**',
		'node_modules/blueimp-gallery/**',
		'node_modules/blueimp-canvas-to-blob/**',
		'node_modules/blueimp-load-image/**',
		'node_modules/blueimp-tmpl/**',
  	'node_modules/bootstrap/**',
		'node_modules/bootstrap-datepicker/**',
		'node_modules/bootstrap-daterangepicker/**',
		'node_modules/bootstrap-datetime-picker/**',
  	'node_modules/bootstrap-icons/**',
		'node_modules/bootstrap-social/**',
		'node_modules/bootstrap-timepicker/**',
		'node_modules/bootstrap3-wysihtml5-bower/**',
		'node_modules/chart.js/**',
		'node_modules/ckeditor/**',
		'node_modules/clipboard/**',
		'node_modules/d3/**',
		'node_modules/datatables.net/**',
		'node_modules/datatables.net-autofill/**',
		'node_modules/datatables.net-autofill-bs5/**',
		'node_modules/datatables.net-bs5/**',
		'node_modules/datatables.net-buttons/**',
		'node_modules/datatables.net-buttons-bs5/**',
		'node_modules/datatables.net-colreorder/**',
		'node_modules/datatables.net-colreorder-bs5/**',
		'node_modules/datatables.net-fixedcolumns/**',
		'node_modules/datatables.net-fixedcolumns-bs5/**',
		'node_modules/datatables.net-fixedheader/**',
		'node_modules/datatables.net-fixedheader-bs5/**',
		'node_modules/datatables.net-keytable/**',
		'node_modules/datatables.net-keytable-bs5/**',
		'node_modules/datatables.net-responsive/**',
		'node_modules/datatables.net-responsive-bs5/**',
		'node_modules/datatables.net-rowreorder/**',
		'node_modules/datatables.net-rowreorder-bs5/**',
		'node_modules/datatables.net-scroller/**',
		'node_modules/datatables.net-scroller-bs5/**',
		'node_modules/datatables.net-select/**',
		'node_modules/datatables.net-select-bs5/**',
		'node_modules/datepickk/**',
		'node_modules/dropzone/**',
		'node_modules/flag-icon-css/**',
		'node_modules/flot/**',
		'node_modules/gritter/**',
		'node_modules/intro.js/**',
		'node_modules/ion-rangeslider/**',
		'node_modules/ionicons/**',
		'node_modules/isotope-layout/**',
  	'node_modules/jquery/**',
		'node_modules/jquery-knob/**',
		'node_modules/jquery-migrate/**',
		'node_modules/jquery-mockjax/**',
		'node_modules/jquery-sparkline/**',
  	'node_modules/jquery-ui-dist/**',
		'node_modules/jquery.maskedinput/**',
  	'node_modules/js-cookie/**',
		'node_modules/jstree/**',
		'node_modules/jszip/**',
		'node_modules/jvectormap-content/**',
		'node_modules/jvectormap-next/**',
		'node_modules/kbw-countdown/**',
		'node_modules/lightbox2/**',
		'node_modules/lity/**',
		'node_modules/masonry-layout/**',
		'node_modules/moment/**',
		'node_modules/nvd3/**',
		'node_modules/oclazyload/**',
  	'node_modules/pace-js/**',
		'node_modules/parsleyjs/**',
		'node_modules/pdfmake/**',
  	'node_modules/perfect-scrollbar/**',
  	'node_modules/photoswipe/**',
		'node_modules/raphael/**',
		'node_modules/select-picker/**',
		'node_modules/select2/**',
		'node_modules/simple-line-icons/**',
		'node_modules/spectrum-colorpicker2/**',
		'node_modules/summernote/**',
		'node_modules/sweetalert/**',
		'node_modules/swiper/**',
		'node_modules/switchery/**',
		'node_modules/tag-it/**',
		'node_modules/x-editable-bs4/**'
	];
	
	return gulp.src(pluginFiles, { base: './node_modules/' })
		.pipe(gulp.dest(distPath + '/assets/plugins'));
});


// 07. css-vendor
gulp.task('css-vendor', function(){
  return gulp.src([
		'node_modules/animate.css/animate.min.css',
		'node_modules/@fortawesome/fontawesome-free/css/all.min.css',
		'node_modules/jquery-ui-dist/jquery-ui.min.css',
		'node_modules/pace-js/themes/black/pace-theme-flash.css',
		'node_modules/perfect-scrollbar/css/perfect-scrollbar.css'
		])
		.pipe(concat('vendor.min.css'))
		.pipe(minifyCSS({debug: true}, (details) => {
      console.log(`${details.name}: ${details.stats.originalSize}`);
      console.log(`${details.name}: ${details.stats.minifiedSize}`);
    }))
		.pipe(gulp.dest(distPath + '/assets/css/'))
		.pipe(livereload());
});




// 08. default-html
gulp.task('default-html', function() {
  return gulp.src(['./html/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      rootPath: './',
      context: {
      	theme: 'default'
      }
    }))
    .pipe(gulp.dest(distPath + '/template_html'))
    .pipe(livereload());
});


// 09. default-html-startup
gulp.task('default-html-startup', function() {
  return gulp.src(['./html-startup/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      rootPath: './',
      context: {
      	theme: 'default'
      }
    }))
    .pipe(gulp.dest(distPath + '/template_html_startup'))
    .pipe(livereload());
});


// 10. default-css
gulp.task('default-css', function(){
  return gulp.src([
		'scss/default/styles.scss'
	])
	.pipe(sass())
	.pipe(concat('app.min.css'))
	.pipe(autoprefixer())
	.pipe(minifyCSS())
	.pipe(gulp.dest(distPath + '/assets/css/default/'))
	.pipe(livereload());
});


// 11. default-css-rtl
gulp.task('default-css-rtl', function(){
	return gulp.src([
		'scss/default/styles.scss'
	])
	.pipe(header('$enable-rtl: true;'))
	.pipe(sass())
	.pipe(concat('app-rtl.min.css'))
	.pipe(autoprefixer())
	.pipe(minifyCSS())
	.pipe(gulp.dest(distPath + '/assets/css/default/'))
	.pipe(livereload());
});


// 12. default-css-image
gulp.task('default-css-image', function(){
	return gulp.src([ 'scss/default/images/**' ])
		.pipe(gulp.dest(distPath + '/assets/css/default/images'));
});


// 13. default-watch
gulp.task('default-watch', function () {
	livereload.listen();
	
  gulp.watch('html/**/**/*.html', gulp.series(gulp.parallel(['default-html'])));
  gulp.watch('html-startup/**/*.html', gulp.series(gulp.parallel(['default-html-startup'])));
  gulp.watch('scss/default/**/*.scss', gulp.series(gulp.parallel(['default-css'])));
  gulp.watch('js/**/*.js', gulp.series(gulp.parallel(['js-app', 'js-demo'])));
});


// 14. default-webserver
gulp.task('default-webserver', function() {
	connect.server({
		name: 'Color Admin',
		root: [distPath, distPath + '/template_html/'],
		port: 8000,
		livereload: true,
		fallback: 'index.html'
	});
});


// 15. default-webserver-startup
gulp.task('default-webserver-startup', function() {
	connect.server({
		name: 'Color Admin',
		root: [distPath, distPath + '/template_html_startup/'],
		port: 8000,
		livereload: true,
		fallback: 'index.html'
	});
});


// 16. default
gulp.task('default', gulp.series(gulp.parallel([
	'font-fontawesome', 
	'font-bootstrap',
	'js-demo',
	'js-vendor', 
	'js-app', 
	'css-vendor', 
	'default-css',
	'default-css-rtl',
	'default-css-image', 
	'default-html', 
	'default-html-startup', 
	'default-webserver', 
	'default-watch'
])));


// 17. default-startup
gulp.task('default-startup', gulp.series(gulp.parallel([
	'font-fontawesome', 
	'font-bootstrap',
	'js-demo', 
	'js-vendor', 
	'js-app', 
	'css-vendor', 
	'default-css',
	'default-css-rtl',
	'default-css-image', 
	'default-html', 
	'default-html-startup', 
	'default-webserver-startup', 
	'default-watch'
])));




// 18. material-html
gulp.task('material-html', function() {
  return gulp.src(['./html/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      rootPath: './',
      context: {
      	theme: 'material'
      }
    }))
    .pipe(gulp.dest(distPath + '/template_material'))
    .pipe(livereload());
});


// 19. material-html-startup
gulp.task('material-html-startup', function() {
  return gulp.src(['./html-startup/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      rootPath: './',
      context: {
      	theme: 'material'
      }
    }))
    .pipe(gulp.dest(distPath + '/template_material_startup'))
    .pipe(livereload());
});


// 20. material-css
gulp.task('material-css', function(){
  return gulp.src([
		'scss/material/styles.scss'
	])
	.pipe(sass())
	.pipe(concat('app.min.css'))
	.pipe(autoprefixer())
	.pipe(minifyCSS())
	.pipe(gulp.dest(distPath + '/assets/css/material/'))
	.pipe(livereload());
});


// 21. material-css-rtl
gulp.task('material-css-rtl', function(){
	return gulp.src([
		'scss/material/styles.scss'
	])
	.pipe(header('$enable-rtl: true;'))
	.pipe(sass())
	.pipe(concat('app-rtl.min.css'))
	.pipe(autoprefixer())
	.pipe(minifyCSS())
	.pipe(gulp.dest(distPath + '/assets/css/material/'));
});


// 22. material-css-image
gulp.task('material-css-image', function(){
	return gulp.src([ 'scss/material/images/**' ])
		.pipe(gulp.dest(distPath + '/assets/css/material/images'));
});


// 23. material-watch
gulp.task('material-watch', function () {
	livereload.listen();
  gulp.watch('html/**/**.html', gulp.series(gulp.parallel(['material-html'])));
  gulp.watch('html-startup/**/**.html', gulp.series(gulp.parallel(['material-html-startup'])));
  gulp.watch('scss/**/**.scss', gulp.series(gulp.parallel(['material-css'])));
  gulp.watch('js/**/*.js', gulp.series(gulp.parallel(['js-app', 'js-demo'])));
});


// 24. material-webserver
gulp.task('material-webserver', function() {
	connect.server({
		name: 'Color Admin Material',
		root: [distPath, distPath + '/template_material/'],
		port: 8000,
		livereload: true,
		fallback: 'index.html'
	});
});


// 25. material-webserver-startup
gulp.task('material-webserver-startup', function() {
	connect.server({
		name: 'Color Admin Material',
		root: [distPath, distPath + '/template_material_startup/'],
		port: 8000,
		livereload: true,
		fallback: 'index.html'
	});
});


// 26. material
gulp.task('material', gulp.series(gulp.parallel([
	'font-fontawesome',
	'font-bootstrap',
	'js-demo', 
	'js-vendor', 
	'js-app', 
	'css-vendor', 
	'material-css',
	'material-css-rtl',
	'material-css-image', 
	'material-html', 
	'material-html-startup', 
	'material-webserver', 
	'material-watch'
])));


// 27. material-startup
gulp.task('material-startup', gulp.series(gulp.parallel([
	'font-fontawesome',
	'font-bootstrap',
	'js-demo', 
	'js-vendor', 
	'js-app', 
	'css-vendor', 
	'material-css',
	'material-css-rtl',
	'material-css-image', 
	'material-html', 
	'material-html-startup', 
	'material-webserver-startup', 
	'material-watch'
])));




// 28. apple-html
gulp.task('apple-html', function() {
  return gulp.src(['./html/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      rootPath: './',
      context: {
      	theme: 'apple'
      }
    }))
    .pipe(gulp.dest(distPath + '/template_apple'))
    .pipe(livereload());
});


// 29. apple-html-startup
gulp.task('apple-html-startup', function() {
  return gulp.src(['./html-startup/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      rootPath: './',
      context: {
      	theme: 'apple'
      }
    }))
    .pipe(gulp.dest(distPath + '/template_apple_startup'))
    .pipe(livereload());
});


// 30. apple-css
gulp.task('apple-css', function(){
  return gulp.src([
		'scss/apple/styles.scss'
	])
	.pipe(sass())
	.pipe(concat('app.min.css'))
	.pipe(autoprefixer())
	.pipe(minifyCSS())
	.pipe(gulp.dest(distPath + '/assets/css/apple/'))
	.pipe(livereload());
});


// 31. apple-css-rtl
gulp.task('apple-css-rtl', function(){
	return gulp.src([
		'scss/apple/styles.scss'
	])
	.pipe(header('$enable-rtl: true;'))
	.pipe(sass())
	.pipe(concat('app-rtl.min.css'))
	.pipe(autoprefixer())
	.pipe(minifyCSS())
	.pipe(gulp.dest(distPath + '/assets/css/apple/'));
});


// 32. apple-css-image
gulp.task('apple-css-image', function(){
	return gulp.src([ 'scss/apple/images/**' ])
		.pipe(gulp.dest(distPath + '/assets/css/apple/images'));
});


// 33. apple-watch
gulp.task('apple-watch', function () {
	livereload.listen();
  gulp.watch('html/**/**.html', gulp.series(gulp.parallel(['apple-html'])));
  gulp.watch('html-startup/**/**.html', gulp.series(gulp.parallel(['apple-html-startup'])));
  gulp.watch('scss/**/**.scss', gulp.series(gulp.parallel(['apple-css'])));
  gulp.watch('js/**/*.js', gulp.series(gulp.parallel(['js-app', 'js-demo'])));
});


// 34. apple-webserver
gulp.task('apple-webserver', function() {
	connect.server({
		name: 'Color Admin Apple',
		root: [distPath, distPath + '/template_apple/'],
		port: 8000,
		livereload: true,
		fallback: 'index.html'
	});
});


// 35. apple-webserver-startup
gulp.task('apple-webserver-startup', function() {
	connect.server({
		name: 'Color Admin Apple',
		root: [distPath, distPath + '/template_apple_startup/'],
		port: 8000,
		livereload: true,
		fallback: 'index.html'
	});
});


// 36. apple
gulp.task('apple', gulp.series(gulp.parallel([
	'font-fontawesome',
	'font-bootstrap',
	'js-demo', 
	'js-vendor', 
	'js-app', 
	'css-vendor', 
	'apple-css',
	'apple-css-rtl',
	'apple-css-image', 
	'apple-html', 
	'apple-html-startup', 
	'apple-webserver', 
	'apple-watch'
])));


// 37. apple-startup
gulp.task('apple-startup', gulp.series(gulp.parallel([
	'font-fontawesome',
	'font-bootstrap',
	'js-demo', 
	'js-vendor', 
	'js-app', 
	'css-vendor', 
	'apple-css',
	'apple-css-rtl',
	'apple-css-image', 
	'apple-html', 
	'apple-html-startup', 
	'apple-webserver-startup', 
	'apple-watch'
])));




// 38. transparent-html
gulp.task('transparent-html', function() {
  return gulp.src(['./html/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      rootPath: './',
      context: {
      	theme: 'transparent'
      }
    }))
    .pipe(gulp.dest(distPath + '/template_transparent'))
    .pipe(livereload());
});


// 39. transparent-html-startup
gulp.task('transparent-html-startup', function() {
  return gulp.src(['./html-startup/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      rootPath: './',
      context: {
      	theme: 'transparent'
      }
    }))
    .pipe(gulp.dest(distPath + '/template_transparent_startup'))
    .pipe(livereload());
});


// 40. transparent-css
gulp.task('transparent-css', function(){
  return gulp.src([
		'scss/transparent/styles.scss'
	])
	.pipe(sass())
	.pipe(concat('app.min.css'))
	.pipe(autoprefixer())
	.pipe(minifyCSS())
	.pipe(gulp.dest(distPath + '/assets/css/transparent/'))
	.pipe(livereload());
});


// 41. transparent-css-rtl
gulp.task('transparent-css-rtl', function(){
	return gulp.src([
		'scss/transparent/styles.scss'
	])
	.pipe(header('$enable-rtl: true;'))
	.pipe(sass())
	.pipe(concat('app-rtl.min.css'))
	.pipe(autoprefixer())
	.pipe(minifyCSS())
	.pipe(gulp.dest(distPath + '/assets/css/transparent/'));
});


// 42. transparent-css-image
gulp.task('transparent-css-image', function(){
	return gulp.src([ 'scss/transparent/images/**' ])
		.pipe(gulp.dest(distPath + '/assets/css/transparent/images'));
});


// 43. transparent-watch
gulp.task('transparent-watch', function () {
	livereload.listen();
  gulp.watch('html/**/**.html', gulp.series(gulp.parallel(['transparent-html'])));
  gulp.watch('html-startup/**/**.html', gulp.series(gulp.parallel(['transparent-html-startup'])));
  gulp.watch('scss/**/**.scss', gulp.series(gulp.parallel(['transparent-css'])));
  gulp.watch('js/**/*.js', gulp.series(gulp.parallel(['js-app', 'js-demo'])));
});


// 44. transparent-webserver
gulp.task('transparent-webserver', function() {
	connect.server({
		name: 'Color Admin Transparent',
		root: [distPath, distPath + '/template_transparent/'],
		port: 8000,
		livereload: true,
		fallback: 'index.html'
	});
});


// 45. transparent-webserver-startup
gulp.task('transparent-webserver-startup', function() {
	connect.server({
		name: 'Color Admin Transparent',
		root: [distPath, distPath + '/template_transparent_startup/'],
		port: 8000,
		livereload: true,
		fallback: 'index.html'
	});
});


// 46. transparent
gulp.task('transparent', gulp.series(gulp.parallel([
	'font-fontawesome',
	'font-bootstrap',
	'js-demo', 
	'js-vendor', 
	'js-app', 
	'css-vendor', 
	'transparent-css',
	'transparent-css-rtl',
	'transparent-css-image', 
	'transparent-html', 
	'transparent-html-startup', 
	'transparent-webserver', 
	'transparent-watch'
])));


// 47. transparent-startup
gulp.task('transparent-startup', gulp.series(gulp.parallel([
	'font-fontawesome',
	'font-bootstrap',
	'js-demo', 
	'js-vendor', 
	'js-app', 
	'css-vendor', 
	'transparent-css',
	'transparent-css-rtl',
	'transparent-css-image', 
	'transparent-html', 
	'transparent-html-startup', 
	'transparent-webserver-startup', 
	'transparent-watch'
])));




// 48. facebook-html
gulp.task('facebook-html', function() {
  return gulp.src(['./html/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      rootPath: './',
      context: {
      	theme: 'facebook'
      }
    }))
    .pipe(gulp.dest(distPath + '/template_facebook'))
    .pipe(livereload());
});


// 49. facebook-html-startup
gulp.task('facebook-html-startup', function() {
  return gulp.src(['./html-startup/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      rootPath: './',
      context: {
      	theme: 'facebook'
      }
    }))
    .pipe(gulp.dest(distPath + '/template_facebook_startup'))
    .pipe(livereload());
});


// 50. facebook-css
gulp.task('facebook-css', function(){
  return gulp.src([
		'scss/facebook/styles.scss'
	])
	.pipe(sass())
	.pipe(concat('app.min.css'))
	.pipe(autoprefixer())
	.pipe(minifyCSS())
	.pipe(gulp.dest(distPath + '/assets/css/facebook/'))
	.pipe(livereload());
});


// 51. facebook-css-rtl
gulp.task('facebook-css-rtl', function(){
	return gulp.src([
		'scss/facebook/styles.scss'
	])
	.pipe(header('$enable-rtl: true;'))
	.pipe(sass())
	.pipe(concat('app-rtl.min.css'))
	.pipe(autoprefixer())
	.pipe(minifyCSS())
	.pipe(gulp.dest(distPath + '/assets/css/facebook/'));
});


// 52. facebook-css-image
gulp.task('facebook-css-image', function(){
	return gulp.src([ 'scss/facebook/images/**' ])
		.pipe(gulp.dest(distPath + '/assets/css/facebook/images'));
});


// 53. facebook-watch
gulp.task('facebook-watch', function () {
	livereload.listen();
  gulp.watch('html/**/**.html', gulp.series(gulp.parallel(['facebook-html'])));
  gulp.watch('html-startup/**/**.html', gulp.series(gulp.parallel(['facebook-html-startup'])));
  gulp.watch('scss/**/**.scss', gulp.series(gulp.parallel(['facebook-css'])));
  gulp.watch('js/**/*.js', gulp.series(gulp.parallel(['js-app', 'js-demo'])));
});


// 54. facebook-webserver
gulp.task('facebook-webserver', function() {
	connect.server({
		name: 'Color Admin Facebook',
		root: [distPath, distPath + '/template_facebook/'],
		port: 8000,
		livereload: true,
		fallback: 'index.html'
	});
});


// 55. facebook-webserver-startup
gulp.task('facebook-webserver-startup', function() {
	connect.server({
		name: 'Color Admin Facebook',
		root: [distPath, distPath + '/template_facebook_startup/'],
		port: 8000,
		livereload: true,
		fallback: 'index.html'
	});
});


// 56. facebook
gulp.task('facebook', gulp.series(gulp.parallel([
	'font-fontawesome',
	'font-bootstrap',
	'js-demo', 
	'js-vendor', 
	'js-app', 
	'css-vendor', 
	'facebook-css',
	'facebook-css-rtl',
	'facebook-css-image', 
	'facebook-html', 
	'facebook-html-startup', 
	'facebook-webserver', 
	'facebook-watch'
])));


// 57. facebook-startup
gulp.task('facebook-startup', gulp.series(gulp.parallel([
	'font-fontawesome',
	'font-bootstrap',
	'js-demo', 
	'js-vendor', 
	'js-app', 
	'css-vendor', 
	'facebook-css',
	'facebook-css-rtl',
	'facebook-css-image', 
	'facebook-html', 
	'facebook-html-startup', 
	'facebook-webserver-startup', 
	'facebook-watch'
])));




// 58. google-html
gulp.task('google-html', function() {
  return gulp.src(['./html/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      rootPath: './',
      context: {
      	theme: 'google'
      }
    }))
    .pipe(gulp.dest(distPath + '/template_google'))
    .pipe(livereload());
});


// 59. google-html-startup
gulp.task('google-html-startup', function() {
  return gulp.src(['./html-startup/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      rootPath: './',
      context: {
      	theme: 'google'
      }
    }))
    .pipe(gulp.dest(distPath + '/template_google_startup'))
    .pipe(livereload());
});


// 60. google-css
gulp.task('google-css', function(){
  return gulp.src([
		'scss/google/styles.scss'
	])
	.pipe(sass())
	.pipe(concat('app.min.css'))
	.pipe(autoprefixer())
	.pipe(minifyCSS())
	.pipe(gulp.dest(distPath + '/assets/css/google/'))
	.pipe(livereload());
});


// 61. google-css-rtl
gulp.task('google-css-rtl', function(){
	return gulp.src([
		'scss/google/styles.scss'
	])
	.pipe(header('$enable-rtl: true;'))
	.pipe(sass())
	.pipe(concat('app-rtl.min.css'))
	.pipe(autoprefixer())
	.pipe(minifyCSS())
	.pipe(gulp.dest(distPath + '/assets/css/google/'));
});


// 62. google-css-image
gulp.task('google-css-image', function(){
	return gulp.src([ 'scss/google/images/**' ])
		.pipe(gulp.dest(distPath + '/assets/css/google/images'));
});


// 63. google-watch
gulp.task('google-watch', function () {
	livereload.listen();
  gulp.watch('html/**/**.html', gulp.series(gulp.parallel(['google-html'])));
  gulp.watch('html-startup/**/**.html', gulp.series(gulp.parallel(['google-html-startup'])));
  gulp.watch('scss/**/**.scss', gulp.series(gulp.parallel(['google-css'])));
  gulp.watch('js/**/*.js', gulp.series(gulp.parallel(['js-app', 'js-demo'])));
});


// 64. google-webserver
gulp.task('google-webserver', function() {
	connect.server({
		name: 'Color Admin Google',
		root: [distPath, distPath + '/template_google/'],
		port: 8000,
		livereload: true,
		fallback: 'index.html'
	});
});


// 65. google-webserver-startup
gulp.task('google-webserver-startup', function() {
	connect.server({
		name: 'Color Admin Google',
		root: [distPath, distPath + '/template_google_startup/'],
		port: 8000,
		livereload: true,
		fallback: 'index.html'
	});
});


// 66. google
gulp.task('google', gulp.series(gulp.parallel([
	'font-fontawesome',
	'font-bootstrap',
	'js-demo', 
	'js-vendor', 
	'js-app', 
	'css-vendor', 
	'google-css',
	'google-css-rtl',
	'google-css-image', 
	'google-html', 
	'google-html-startup', 
	'google-webserver', 
	'google-watch'
])));


// 67. google-startup
gulp.task('google-startup', gulp.series(gulp.parallel([
	'font-fontawesome',
	'font-bootstrap',
	'js-demo', 
	'js-vendor', 
	'js-app', 
	'css-vendor', 
	'google-css',
	'google-css-rtl',
	'google-css-image', 
	'google-html', 
	'google-html-startup', 
	'google-webserver-startup', 
	'google-watch'
])));




// 68. all-html
gulp.task('all-html', gulp.series(gulp.parallel([
	'default-html', 
	'default-html-startup', 
	'apple-html', 
	'apple-html-startup', 
	'material-html', 
	'material-html-startup', 
	'facebook-html', 
	'facebook-html-startup', 
	'transparent-html', 
	'transparent-html-startup', 
	'google-html', 
	'google-html-startup'
])));


// 69. all-css
gulp.task('all-css', gulp.series(gulp.parallel([
	'default-css',
	'default-css-rtl',
	'default-css-image',
	'apple-css',
	'apple-css-rtl',
	'apple-css-image',
	'material-css',
	'material-css-rtl',
	'material-css-image',
	'facebook-css',
	'facebook-css-rtl',
	'facebook-css-image',
	'transparent-css',
	'transparent-css-rtl',
	'transparent-css-image',
	'google-css',
	'google-css-rtl',
	'google-css-image'
])));