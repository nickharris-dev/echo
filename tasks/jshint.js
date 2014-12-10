module.exports = {
  beforeconcat: {
    files: [{
      expand: true,
      cwd: '<%= package.paths.src %>/',
      src: ['**/*.js', '!**/front.end.web.developer.js'],
      dest: '<%= package.paths.destination.dev %>/'
    }]
  },
  beforeconcat: {
    files: ['<%= package.paths.destination.dev %>/assets/js/front.end.web.developer.js']
  }
};
