module.exports = {
  options: {
    browsers: ['last 2 versions', 'ie 9']
  },
  dist: {
    expand: true,
    flatten: true,
    src: '<%= package.dest_temp %>/<%= package.assets %>/css/*.css',
    dest: '<%= package.dest_dev %>/<%= package.assets %>/css/'
  }
};
