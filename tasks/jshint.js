module.exports = {
  beforeconcat: {
    files: [{
      expand: true,
      cwd: '<%= package.paths.src %>/',
      src: ['**/*.js', '!**/front.end.web.developer.js'],
      dest: '<%= package.paths.destinations.dev %>/'
    }]
  },
  beforeconcat: {
    files: ['<%= package.paths.destinations.dev %>/assets/js/front.end.web.developer.js']
  }
};
