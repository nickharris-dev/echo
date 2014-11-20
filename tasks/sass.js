module.exports = {
  dist: {
    options: {
      style: 'expanded',
      sourcemap: true
    },
    files: [{
      '<%= package.dest_temp %>/<%= package.assets %>/css/web.designer.css': '<%= package.src %>/<%= package.assets %>/css/main.scss'
    }]
  }
};
