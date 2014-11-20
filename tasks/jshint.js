module.exports = {
  beforeconcat: {
    files: [{
      expand: true,
      cwd: '<%= package.src %>/',
      src: ['**/*.js', '!**/front.end.web.developer.js'],
      dest: '<%= package.dest_dev %>/'
    }]
  },
  beforeconcat: {
    files: ['<%= package.dest_dev %>/assets/js/front.end.web.developer.js']
  }
};
