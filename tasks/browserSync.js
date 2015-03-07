module.exports = function (grunt) {
  return {
    bsFiles: {
      src: [
      '<%= grunt.config.get("dest") %>/**/*'
      ]
    },
    options: {
      open: false,
      server: {
        baseDir: '<%= grunt.config.get("dest") %>',
      },
      watchTask: true
    }
  };
};
