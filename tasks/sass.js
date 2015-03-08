module.exports = {
  build: {
    options: {
      sourcemap: true
    },
    files: [{
      '<%= package.paths.temp %>/css/<%= package.filenames.css %>.css': '<%= package.paths.assetsrc %>/css/main.scss',
      '<%= package.paths.temp %>/css/dev.css': '<%= package.paths.assetsrc %>/css/dev.scss'
    }]
  }
};
