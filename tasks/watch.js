module.exports = {
  helpers: {
    files: 'helpers/*.js',
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
  criticalcss: {
    files: '<%= package.paths.assetsrc %>/css/**/critical.scss',
    tasks: ['config:dev', 'newer:scsslint', 'sass:critical', 'autoprefixer:critical']
  },
  css: {
    files: ['<%= package.paths.assetsrc %>/css/**/*.scss', '!<%= package.paths.assetsrc %>/css/**/critical.scss'],
    tasks: ['config:dev', 'newer:scsslint', 'sass:build', 'autoprefixer:dev', 'clean:temp']
  },
  scripts: {
    files: '<%= package.paths.assetsrc %>/js/**/*.js',
    tasks: ['config:dev', 'newer:jshint', 'newer:copy:javascript']
  },
  images: {
    files: '<%= package.paths.assetsrc %>/images/**/*.{png,jpg,jpeg,gif}',
    tasks: ['config:dev', 'newer:imagemin', 'newer:copy:images']
  },
  icons: {
    files: '<%= package.paths.src %>/**/*.ico',
    tasks: ['config:dev', 'newer:copy:images']
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
