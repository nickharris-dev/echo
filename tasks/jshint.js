module.exports = {
  options: {
    reporter: require('jshint-stylish')
  },
  src: [
    '<%= package.paths.assetsrc %>/js/{,*/}*.js',
    'tasks/*.js',
    'package.json',
    'data/*.json',
    '!<%= package.paths.assetsrc %>/js/{,*/}*.min.js'
  ]
};
