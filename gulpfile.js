var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    browserify = require('gulp-browserify'),
    cleanCSS = require('gulp-clean-css'),
    connect = require('gulp-connect'),
    // del = require('del'),
    gulpif = require('gulp-if'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    plumber = require('gulp-plumber'),
    // rename = require("gulp-rename"),
    uglify = require('gulp-uglify');

var outputDir,
		env;

env = process.env.NODE_ENV || 'development';

if (env==='development') {
  outputDir = 'development/';
} else {
  outputDir = 'production/';
}

gulp.task('html', function() {
  gulp.src('development/*.html')
    .pipe(gulpif(env === 'production', htmlmin({collapseWhitespace: true})))
    .pipe(gulpif(env === 'production', gulp.dest(outputDir)))
    .pipe(connect.reload());
});

gulp.task('css', () => {
       gulp.src('src/*.css')
      .pipe(plumber())
      .pipe(autoprefixer({
        browsers: ['last 5 versions'],
        cascade: true
    }))
    .pipe(gulpif(env === 'production', cleanCSS({compatibility: 'ie8'})))
    // .pipe(rename("style.min.css"))
    .pipe(gulp.dest(outputDir + 'css'))
    .pipe(connect.reload());
});

gulp.task('scripts', function() {
      gulp.src('src/*.js')
      .pipe(plumber())
      // .pipe(browserify())
      .pipe(babel({
        presets: ['env']
      }))
      .pipe(gulpif(env === 'production', uglify())) 
      // .pipe(rename("script.min.js"))
      .pipe(gulp.dest(outputDir + 'js'))
      .pipe(connect.reload()); 
});

gulp.task('img', function() {
      gulp.src('development/img/*.*') 
      .pipe(gulpif(env === 'production', imagemin({ 
          interlaced: true,
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant()]
      })))
      .pipe(gulpif(env === 'production', gulp.dest(outputDir + 'img')))
      .pipe(connect.reload()); 
});

gulp.task('connect', function() {
  connect.server({
    root: outputDir,
    livereload: true
  });
});

gulp.task('video', function() {
  gulp.src('development/video/**/*')
  .pipe(gulpif(env === 'production', gulp.dest('production/video')));
});
// gulp.task('stream', ['webserver', 'css', 'scripts'], function () {
//   // Endless stream mode
//   return watch('app/*.css', { ignoreInitial: false })
//       .pipe(gulp.dest('app'));
// });
gulp.task('watch', function() {
  gulp.watch('src/*.css', ['css']);
  gulp.watch('development/*.html', ['html']);
  gulp.watch('src/*.js', ['scripts']);
  gulp.watch('development/img/**/*.*', ['img']);
});

gulp.task('default', ['html', 'css', 'scripts', 'img', 'video', 'connect', 'watch']);

// gulp.task('clean', function() {
//   return del.sync('builds/production'); 
// });

// gulp.task('build', ['clean', 'img', 'css', 'scripts'], function() {

//   var buildCss = gulp.src([ 
//       'app/css/style.css',
//       ])
//   .pipe(gulp.dest('dist/css'))

//   var buildJs = gulp.src('app/js/**/*') 
//   .pipe(gulp.dest('dist/js'))

//   var buildHtml = gulp.src('app/*.html') 
//   .pipe(gulp.dest('dist'));

//   var buildVideo = gulp.src('builds/development/video/**/*') 
//   .pipe(gulpif(env === 'production', gulp.dest('builds/production/video')));
// });