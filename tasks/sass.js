module.exports = {
  build: {
    options: {
      sourcemap: true
    },
    files: [{
      '<%= package.paths.destinations.temp %>/css/<%= package.filenames.css %>.css': '<%= package.paths.assetsrc %>/css/main.scss'
    }]
  }
};
