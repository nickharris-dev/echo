module.exports = {
  options: {
    csslintrc: 'config/.csslintrc'
  },
  dev: {
    src: [
      '<%= package.paths.assets.dev %>/css/*.css',
      '!<%= package.paths.assets.dev %>/css/*.css.map'
    ]
  }
};
