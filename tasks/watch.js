module.exports = {
  data: {
    files: ['package.json','data/*.json'],
    tasks: 'assemble'
  },
  templates: {
    files: ['<%= package.paths.src %>/_layouts/*.html','<%= package.paths.src %>/_partials/*.html'],
    tasks: 'assemble'
  },
  markup: {
    files: '<%= package.paths.src %>/*.html',
    tasks: 'newer:assemble'
  },
  style: {
    files: '<%= package.paths.src %>/<%= package.paths.assets %>/css/**/*.scss',
    tasks: ['sass', 'newer:autoprefixer']
  },
  scripts: {
    files: '<%= package.paths.src %>/<%= package.paths.assets %>/js/**/*.js',
    tasks: ['newer:jshint:beforeconcat', 'newer:copy:javascript']
  },
  images: {
    files: '<%= package.paths.src %>/<%= package.paths.assets %>/images/*',
    tasks: ['newer:imagemin', 'newer:copy:images']
  },
  videos: {
    files: '<%= package.paths.src %>/<%= package.paths.assets %>/videos/**',
    tasks: ['newer:copy:videos']
  },
  livereload: {
      options: { livereload: true },
      files: ['<%= package.paths.destination.dev %>/**/*']
  }
};
