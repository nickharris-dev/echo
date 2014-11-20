module.exports = {
  markup: {
    files: '<%= package.src %>/**/*.html',
    tasks: ['newer:assemble']
  },
  style: {
    files: '<%= package.src %>/<%= package.assets %>/css/**/*.scss',
    tasks: ['newer:sass', 'newer:autoprefixer']
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
