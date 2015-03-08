module.exports = {
  options: {
    browsers: ['last 2 versions', 'ie 9'],
    map: true
  },
  dev: {
    expand: true,
    flatten: true,
    src: '<%= package.paths.temp %>/css/*.css',
    dest: '<%= package.paths.assets.dev %>/css/'
  },
  production: {
    expand: true,
    flatten: true,
    src: [
      '<%= package.paths.temp %>/css/*.css',
      '!<%= package.paths.temp %>/css/dev.css'
    ],
    dest: '<%= package.paths.assets.production %>/css/'
  },
};
