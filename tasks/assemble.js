module.exports = {
  options : {
    assets: '<%= grunt.config.get("assets") %>',
    helpers: ['helper-moment', 'handlebars-helpers', 'helpers/*.js' ],
    layout: 'master.hbs',
    layoutdir: '<%= package.paths.src %>/_layouts',
    partials: '<%= package.paths.src %>/_partials/**/*.hbs',
    data: ['package.json', 'data/*.json']
  },

  build : {
    files: [{
      expand: true,
      cwd: '<%= package.paths.src %>/',
      dest: '<%= grunt.config.get("dest") %>',
      src: ['**/*.hbs', '!_*/**']
    }]
  }
};
