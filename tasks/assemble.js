module.exports = {
  options : {
    helpers: ['helper-moment', 'node_modules/*.js' ],
    layout: 'master.hbs',
    layoutdir: '<%= package.paths.src %>/_layouts',
    partials: '<%= package.paths.src %>/_partials/**/*.hbs',
    data: ['package.json', 'data/*.json']
  },

  dev : {
    options: {
      assets: '<%= package.paths.destinations.dev %>/<%= package.paths.assets.dev %>',
    },
    files: [{
      expand: true,
      cwd: '<%= package.paths.src %>/',
      dest: '<%= package.paths.destinations.dev %>',
      src: ['**/*.hbs', '!_*/**']
    }]
  }
};
