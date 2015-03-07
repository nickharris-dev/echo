module.exports = {
  data: {
    files: ['package.json','data/*.json'],
    tasks: ['assemble', 'htmlmin']
  },
  templates: {
    files: '<%= package.paths.src %>/_*/**/*.hbs',
    tasks: ['assemble', 'htmlmin']
  },
  markup: {
    files: ['<%= package.paths.src %>/**/*.hbs', '!<%= package.paths.src %>/_*/**/*.hbs'],
    tasks: ['newer:assemble', 'newer:htmlmin']
  },
  style: {
    files: '<%= package.paths.assetsrc %>/css/**/*.scss',
    tasks: ['newer:scsslint', 'sass', 'autoprefixer:dev','clean:temp', 'csslint']
  },
  scripts: {
    files: '<%= package.paths.assetsrc %>/js/**/*.js',
    tasks: ['newer:jshint', 'newer:copy:javascript']
  },
  images: {
    files: '<%= package.paths.assetsrc %>/images/**/*.{png,jpg,jpeg,gif}',
    tasks: ['newer:imagemin', 'newer:copy:images']
  },
  svg: {
    files: '<%= package.paths.assetsrc %>/images/**/*.svg',
    tasks: ['newer:svgmin', 'newer:copy:svg']
  },
  videos: {
    files: '<%= package.paths.assetsrc %>/videos/**',
    tasks: ['newer:copy:videos']
  }
};
