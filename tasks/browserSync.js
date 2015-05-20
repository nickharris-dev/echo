module.exports = function (grunt) {
  return {
    bsFiles: {
      src: [
        '<%= package.paths.destinations.dev %>/**/*',
        '!<%= package.paths.destinations.dev %>/**/*.html'
      ]
    },
    options: {
      open: false,
      server: {
        baseDir: '<%= package.paths.destinations.dev %>',
      },
      watchTask: true
    }
  };
};
