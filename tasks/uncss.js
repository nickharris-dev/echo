module.exports = {
  dist: {
    files: {
      '<%= package.paths.destinations.dev %>/<%= package.paths.assets.dev %>/css/<%= package.filenames.css %>.css': ['<%= package.paths.destinations.dev %>/**/*.html']
    }
  }
};
