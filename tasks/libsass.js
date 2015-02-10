module.exports = {
  dist: {
    options: {
      sourcemap: true
    },
    files: [{
      '<%= package.dest_temp %>/<%= package.assets %>/css/manchester.american.football.css': '<%= package.src %>/<%= package.assets %>/css/main.scss'
    }]
  }
};
