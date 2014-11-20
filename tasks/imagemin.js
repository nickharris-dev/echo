module.exports = {
  options: {
    cache: false
  },

  dist: {
    files: [{
      expand: true,
      cwd: '<%= package.src %>/',
      src: ['**/*.{png,jpg,jpeg,gif,svg}'],
      dest: '<%= package.src %>/'
    }]
  }
};
