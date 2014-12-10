module.exports = {
  options : {
    helpers: ['helper-moment', 'node_modules/*.js' ],
    layout: 'master.html',
    layoutdir: '<%= package.paths.src %>/_layouts',
    partials: '<%= package.paths.src %>/_partials/**/*.html',
    data: ['package.json', 'data/*.json']
  },

  dev : {
    options: {
      assets: '<%= package.paths.destination.dev %>/<%= package.paths.assets %>',
    },
    files: [{
      expand: true,
      cwd: '<%= package.paths.src %>/',
      dest: '<%= package.paths.destination.dev %>',
      src: ['**/*.html', '!_*/**']
    }]
  }
};
