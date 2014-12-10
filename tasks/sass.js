module.exports = {
  dist: {
    options: {
      style: 'expanded'
    },
    files: [{
      '<%= package.paths.destination.temp %>/<%= package.paths.assets.dev %>/css/web.designer.css': '<%= package.paths.src %>/<%= package.paths.assets.dev %>/css/main.scss'
    }]
  }
};
