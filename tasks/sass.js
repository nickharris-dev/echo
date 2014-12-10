module.exports = {
  dist: {
    options: {
      style: 'expanded'
    },
    files: [{
      '<%= package.paths.destinations.temp %>/<%= package.paths.assets.dev %>/css/<%= package.filenames.css %>.css': '<%= package.paths.src %>/<%= package.paths.assets.dev %>/css/main.scss'
    }]
  }
};
