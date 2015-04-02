module.exports = {
  dist: {
    files: [{
      expand: true,
      cwd: '<%= package.paths.src %>/',
      src: '**/*.svg',
      dest: '<%= package.paths.src %>/'
    }]
  }
};
