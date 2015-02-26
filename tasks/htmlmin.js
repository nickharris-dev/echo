module.exports = {
  dist: {
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
      cwd: '<%= package.paths.destinations.dev %>/',
      dest: '<%= package.paths.destinations.dev %>',
      src: '**/*.html'
    }]
  }
};
