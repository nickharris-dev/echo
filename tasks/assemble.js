module.exports = {
  options : {
    assets: '<%= grunt.config.get("assets") %>',
    helpers: ['helper-moment', 'handlebars-helpers', 'helpers/*.js' ],
    layout: 'master.hbs',
    layoutdir: '<%= package.paths.temp %>/_layouts',
    partials: '<%= package.paths.temp %>/_partials/**/*.hbs',
    data: ['package.json', 'data/*.json'],
  },

  build : {
    files: [{
      expand: true,
      cwd: '<%= package.paths.temp %>/',
      dest: '<%= grunt.config.get("dest") %>',
      src: ['**/*.hbs', '!_*/**']
    }]
  }
};
