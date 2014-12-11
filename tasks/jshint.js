module.exports = {
  options: {
    reporter: require('jshint-stylish')
  },
  src: [
    '<%= package.paths.src %>/<%= package.paths.assets.dev %>/js/{,*/}*.js',
    'tasks/*.js',
    'package.json',
    'data/*.json',
    '!<%= package.paths.src %>/<%= package.paths.assets.dev %>/js/{,*/}*.min.js'
  ]
};
