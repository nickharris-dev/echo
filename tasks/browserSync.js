module.exports = function (grunt) {
  return {
    bsFiles: {
      src: [
        '<%= package.paths.destinations.dev %>/**/*',
        '!<%= package.paths.destinations.dev %>/**/*.html',
        '!<%= package.paths.destinations.dev %>/**/critical.css'
      ]
    },
    options: {
      server: {
        baseDir: '<%= package.paths.destinations.dev %>',
      },
      watchTask: true
    }
  };
};
