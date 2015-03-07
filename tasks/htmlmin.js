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
      cwd: '<%= grunt.config.get("dest") %>/',
      dest: '<%= grunt.config.get("dest") %>',
      src: '**/*.html'
    }]
  }
};
