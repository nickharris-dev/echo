module.exports = function (grunt) {
    return {
        bsFiles: {
          src: [
            '<%= package.paths.destinations.dev %>/**/*'
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
