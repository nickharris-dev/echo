module.exports = {
  options: {
    browsers: ['last 2 versions', 'ie 9']
  },
  dist: {
    expand: true,
    flatten: true,
    src: '<%= package.paths.destinations.temp %>/<%= package.paths.assets.dev %>/css/*.css',
    dest: '<%= package.paths.destinations.dev %>/<%= package.paths.assets.dev %>/css/'
  }
};
