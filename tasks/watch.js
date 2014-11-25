module.exports = {
  data: {
    files: ['package.json','data/*.json'],
    tasks: 'assemble'
  },
  templates: {
    files: ['<%= package.src %>/_layouts/*.html','<%= package.src %>/_partials/*.html'],
    tasks: 'assemble'
  },
  markup: {
    files: '<%= package.src %>/*.html',
    tasks: 'newer:assemble'
  },
  style: {
    files: '<%= package.src %>/<%= package.assets %>/css/**/*.scss',
    tasks: ['sass', 'newer:autoprefixer']
  },
  scripts: {
    files: '<%= package.src %>/<%= package.assets %>/js/**/*.js',
    tasks: ['newer:jshint:beforeconcat', 'newer:copy:javascript']
  },
  images: {
    files: '<%= package.src %>/<%= package.assets %>/images/*',
    tasks: ['newer:imagemin', 'newer:copy:images']
  },
  videos: {
    files: '<%= package.src %>/<%= package.assets %>/videos/**',
    tasks: ['newer:copy:videos']
  },
  livereload: {
      options: { livereload: true },
      files: ['<%= package.dest_dev %>/**/*']
  }
};
