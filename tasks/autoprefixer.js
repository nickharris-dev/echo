module.exports = {
  options: {
    browsers: ['last 2 versions', 'ie 9'],
    map: true
  },
  dev: {
    expand: true,
    flatten: true,
    src: '<%= package.paths.destinations.temp %>/css/*.css',
    dest: '<%= package.paths.assets.dev %>/css/'
  },
  production: {
    expand: true,
    flatten: true,
    src: '<%= package.paths.destinations.temp %>/css/*.css',
    dest: '<%= package.paths.assets.production %>/css/'
  },
};
