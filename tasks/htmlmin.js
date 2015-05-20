module.exports = {
  build: {
    options: {
      removeComments: true,
      collapseWhitespace: true,
      conservativeCollapse: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true
    },
    files: [{
      expand: true,
      cwd: '<%= package.paths.temp %>/',
      dest: '<%= grunt.config.get("dest") %>',
      src: '**/*.html'
    }]
  }
};
