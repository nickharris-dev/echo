module.exports = {
  options: {
    browsers: ['last 2 versions', 'ie 9'],
  },
  critical: {
    options: {
      map: false
    },
    files: {
      '<%= package.paths.src %>/_partials/critical-css.hbs' : '<%= package.paths.temp %>/critical-css.hbs'
    }
  },
  dev: {
    options: {
      map: true
    },
    expand: true,
    flatten: true,
    src: '<%= package.paths.temp %>/css/*.css',
    dest: '<%= package.paths.assets.dev %>/css/'
  },
  production: {
    options: {
      map: true
    },
    expand: true,
    flatten: true,
    src: [
      '<%= package.paths.temp %>/css/*.css',
      '!<%= package.paths.temp %>/css/dev.css'
    ],
    dest: '<%= package.paths.assets.production %>/css/'
  },
};
