'use strict';

// Gulp Packages
// =============
  var autoprefixer = require('gulp-autoprefixer');
  var browserSync = require('browser-sync');
  var changed = require('gulp-changed');
  var cssmin = require('gulp-cssmin');
  var del = require('del');
  var environments = require('gulp-environments');
  var filter = require('gulp-filter');
  var gulp = require('gulp');
  var imagemin = require('gulp-imagemin');
  var notify = require('gulp-notify');
  var rename = require('gulp-rename');
  var sass = require('gulp-sass');
  var shell = require('gulp-shell');
  var sourcemaps = require('gulp-sourcemaps');

// Universal Settings
// ==================
  // Grab package.json
  var pkg = require('./package.json');
  // Resued task options
  var autoprefixerOptions = {
        browsers: ['last 1 version', '> 5%']
      };
  // Browsersync instances
  var proxy = browserSync.create('proxy');
  var assetServer = browserSync.create('assetServer');
  // Environments
  var dev = environments.development;
  var staging = environments.make("staging");
  var production = environments.production;

// Paths
// =====
  var paths = {
    src: {
      images: './src/assets/images/',
      style: './src/assets/css/',
      theme: './src/theme/'
    },
    dest: {
      images: './www/assets/images/',
      style: './www/assets/css/',
      theme: './www/wordpress-default/wp-content/themes/helenstephens/'
    }
  }
// Files
// =====
  var srcfiles = {
    sassvariables: paths.src.style + '**/variables.scss',
    sasshelpers: paths.src.style + '**/helpers.scss',
    criticalstyles: paths.src.style + 'critical.scss',
    headerstyles: paths.src.style + '**/header.scss'
  }

// Markup
// ======
  gulp.task('templates', function(){
    return gulp.src(paths.src.theme + '**/*')
      .pipe(changed(paths.dest.theme))
      .pipe(gulp.dest(paths.dest.theme))
      .pipe(dev(proxy.stream({match: '**/*'})));
  });

// Styles
// ======
  gulp.task('style', function(){
    var sassOptions = {
      style: 'expanded'
    };

    return gulp.src([
        paths.src.style + '*.scss',
        '!' + srcfiles.criticalstyles
      ])
      .pipe(changed(paths.dest.style))
      .pipe(dev(sourcemaps.init({loadMaps: true})))
      .pipe(sass(sassOptions).on('error', function(err){ notify().write(err); }))
      .pipe(autoprefixer())
      .pipe(dev(sourcemaps.write('./')))
      .pipe(production(cssmin()))
      .pipe(gulp.dest(paths.dest.style))
      .pipe(dev(proxy.stream({match: '**/*.css'})));
  });
  gulp.task('criticalstyle', function(){
    var renameOptions = {
      extname: '.php'
    };
    var sassOptions = {
      style: 'expanded'
    };

    return gulp.src(srcfiles.criticalstyles)
      .pipe(sass(sassOptions).on('error', function(err){
        notify().write(err);
      }))
      .pipe(autoprefixer())
      .pipe(cssmin())
      .pipe(rename(renameOptions))
      .pipe(gulp.dest(paths.src.theme));
  });

// Images
// ======
  gulp.task('images', function(){
    return gulp.src(paths.src.images + '**/*')
      .pipe(changed(paths.dest.images))
      .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}]
      }))
      .pipe(gulp.dest(paths.dest.images))
      .pipe(dev(proxy.stream({match: '**/images/*'})));
  });


// Utilities
// =========
  gulp.task('clean', function(cb){
    return del([
      paths.dest.images,
      paths.dest.style,
      './www/wordpress-default/wp-content/themes/*',
      '!./www/wordpress-default/wp-content/themes/index.php'
    ], cb);
  });

  gulp.task('vagrant', function() {
    return gulp.src('README.md', {read: false})
      .pipe(shell([
        'vagrant up'
      ]))
      .pipe(notify({
        'icon': 'src/assets/images/apple-touch-icon.png',
        'message': 'Vagrant box up'
      }));
  });

  gulp.task('server', function() {
    var proxyOptions = {
      proxy: 'local.wordpress.dev',
      open: false
    };
    var assetsOptions = {
      server: {
        baseDir: './www/assets',
        directory: true
      },
      open: false
    };

    proxy.init(proxyOptions, function(){
      assetServer.init(assetsOptions);
    });
  });

  gulp.task('watch', function() {
    // Theme files
    gulp.watch(paths.src.theme + '**/*', gulp.parallel('templates'));
    // Styles
    gulp.watch([
      paths.src.style + '**/*.scss',
      '!' + srcfiles.sassvariables,
      '!' + srcfiles.sasshelpers,
      '!' + srcfiles.criticalstyles,
      '!' + srcfiles.headerstyles
    ], gulp.parallel('style'));
    // Critical Styles
    gulp.watch([
      srcfiles.sassvariables,
      srcfiles.sasshelpers,
      srcfiles.criticalstyles,
      srcfiles.headerstyles
    ], gulp.parallel('theme', 'style'));
    // Images
    gulp.watch(paths.src.images + '**/*', gulp.parallel('images'));
  });

gulp.task('theme', gulp.series('criticalstyle', 'templates'), function(){});
gulp.task('build', gulp.parallel('theme', 'style', 'images'), function(){});
gulp.task('serve', gulp.parallel('watch', 'server'), function(){});

gulp.task('default', gulp.series('vagrant', 'clean', 'build', 'serve'), function(){});

