module.exports = {
  options: {
    browsers: ['last 2 versions', 'ie 9']
  },
  dist: {
    expand: true,
    flatten: true,
    src: '<%= package.paths.destination.temp %>/<%= package.paths.assets.dev %>/css/*.css',
    dest: '<%= package.paths.destination.dev %>/<%= package.paths.assets.dev %>/css/'
  }
};
