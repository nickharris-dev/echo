module.exports = {
  build: {
    options: {
      sourcemap: true
    },
    files: [{
      expand: true,
      cwd: '<%= package.paths.assetsrc %>/css',
      dest: '<%= package.paths.temp %>/css',
      src: ['*.scss'],
      ext: '.css'
    }]
  },
  critical: {
    options: {
      sourcemap: false
    },
    files: {
      '<%= package.paths.temp %>/critical-css.hbs' : '<%= package.paths.assetsrc %>/css/critical.scss'
    }
  }
};
