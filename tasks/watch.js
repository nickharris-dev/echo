module.exports = {
  data: {
    files: ['package.json','data/*.json'],
    tasks: 'assemble'
  },
  templates: {
    files: '<%= package.paths.src %>/_*/**/*.hbs',
    tasks: 'assemble'
  },
  markup: {
    files: ['<%= package.paths.src %>/**/*.hbs', '!<%= package.paths.src %>/_*/**/*.hbs'],
    tasks: 'newer:assemble'
  },
  style: {
    files: '<%= package.paths.src %>/<%= package.paths.assets.dev %>/css/**/*.scss',
    tasks: ['libsass', 'newer:autoprefixer']
  },
  scripts: {
    files: '<%= package.paths.src %>/<%= package.paths.assets.dev %>/js/**/*.js',
    tasks: ['newer:jshint', 'newer:copy:javascript']
  },
  images: {
    files: '<%= package.paths.src %>/<%= package.paths.assets.dev %>/images/**/*.{png,jpg,jpeg,gif}',
    tasks: ['newer:imagemin', 'newer:copy:images']
  },
  svg: {
    files: '<%= package.paths.src %>/<%= package.paths.assets.dev %>/images/**/*.svg',
    tasks: ['newer:svgmin', 'newer:copy:svg']
  },
  videos: {
    files: '<%= package.paths.src %>/<%= package.paths.assets.dev %>/videos/**',
    tasks: ['newer:copy:videos']
  }
};
