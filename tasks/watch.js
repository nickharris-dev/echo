module.exports = {
  data: {
    files: ['package.json','data/*.json'],
    tasks: ['config:dev', 'replace', 'assemble', 'htmlmin', 'clean:temp']
  },
  templates: {
    files: '<%= package.paths.src %>/_*/**/*.hbs',
    tasks: ['config:dev', 'replace', 'assemble', 'htmlmin', 'clean:temp']
  },
  markup: {
    files: ['<%= package.paths.src %>/**/*.hbs', '!<%= package.paths.src %>/_*/**/*.hbs'],
    tasks: ['config:dev', 'newer:replace', 'newer:assemble', 'newer:htmlmin', 'clean:temp']
  },
  style: {
    files: '<%= package.paths.assetsrc %>/css/**/*.scss',
    tasks: ['config:dev', 'newer:scsslint', 'sass', 'autoprefixer:dev', 'clean:temp']
  },
  scripts: {
    files: '<%= package.paths.assetsrc %>/js/**/*.js',
    tasks: ['config:dev', 'newer:jshint', 'newer:copy:javascript']
  },
  images: {
    files: '<%= package.paths.assetsrc %>/images/**/*.{png,jpg,jpeg,gif}',
    tasks: ['config:dev', 'newer:imagemin', 'newer:copy:images']
  },
  svg: {
    files: '<%= package.paths.assetsrc %>/images/**/*.svg',
    tasks: ['config:dev', 'newer:svgmin', 'newer:copy:svg']
  },
  videos: {
    files: '<%= package.paths.assetsrc %>/videos/**',
    tasks: ['config:dev', 'newer:copy:videos']
  }
};
