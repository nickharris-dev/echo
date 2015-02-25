module.exports = {
  options: {
    cache: false
  },

  dist: {
    files: [{
      expand: true,
      cwd: '<%= package.paths.src %>/',
      src: ['**/*.{png,jpg,jpeg,gif}'],
      dest: '<%= package.paths.src %>/'
    }]
  }
};
