module.exports = {
  options: {
    keepSpecialComments: 0,
    report: 'gzip'
  },
  dist: {
    files: [{
      expand: true,
      cwd: '<%= package.paths.destinations.dev %>/<%= package.paths.assets.dev %>/css',
      src: ['*.css', '!*.min.css'],
      dest: '<%= package.paths.destinations.dev %>/<%= package.paths.assets.dev %>/css'
    }],
  }
};
