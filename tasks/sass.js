module.exports = {
  dist: {
    options: {
      sourcemap: true
    },
    files: [{
      '<%= package.paths.destinations.temp %>/<%= package.paths.assets.dev %>/css/<%= package.filenames.css %>.css': '<%= package.paths.src %>/<%= package.paths.assets.dev %>/css/main.scss'
    }]
  }
};
