module.exports = {
  options : {
    helpers: ['helper-moment', 'node_modules/*.js' ],
    layout: 'master.html',
    layoutdir: '<%= package.src %>/_layouts',
    partials: '<%= package.src %>/_partials/**/*.html',
    data: ['package.json', 'data/*.json']
  },

  dev : {
    options: {
      assets: '<%= package.dest_dev %>/<%= package.assets %>',
    },
    files: [{
      expand: true,
      cwd: '<%= package.src %>/',
      dest: '<%= package.dest_dev %>',
      src: ['**/*.html', '!_*/**']
    }]
  }
};
