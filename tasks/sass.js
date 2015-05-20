module.exports = {
  build: {
    options: {
      sourcemap: true
    },
    files: [{
      expand: true,
      cwd: '<%= package.paths.assetsrc %>/css',
      dest: '<%= package.paths.temp %>/css',
      src: '*.scss',
      ext: '.css'
    }]
  }
};
