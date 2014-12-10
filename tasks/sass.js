module.exports = {
  dist: {
    options: {
      style: 'expanded'
    },
    files: [{
      '<%= package.paths.destination.temp %>/<%= package.paths.assets %>/css/web.designer.css': '<%= package.paths.src %>/<%= package.paths.assets %>/css/main.scss'
    }]
  }
};
