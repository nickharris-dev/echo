module.exports = {
  dist: {
    options: {
      variables: {
        'environment': '<%= grunt.config.get("environment") %>'
      },
      force: true
    },
    files: [{
      expand: true,
      cwd: '<%= package.paths.src %>/',
      dest: '<%= package.paths.temp %>',
      src: ['**/*.hbs']
    }]
  }
};
