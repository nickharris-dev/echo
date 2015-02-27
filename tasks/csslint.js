module.exports = {
  options: {
    csslintrc: 'config/.csslintrc'
  },
  dist: {
    src: ['<%= package.paths.destinations.dev %>/<%= package.paths.assets.dev %>/css/*.css']
  }
};
