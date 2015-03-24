module.exports = {
  javascript: {
    files: [{
      expand: true,
      cwd: '<%= package.paths.src %>/',
      src: ['**/*.js'],
      dest: '<%= grunt.config.get("dest") %>/'
    }]
  },
  images: {
    files: [{
      expand: true,
      cwd: '<%= package.paths.src %>/',
      src: ['**/*.{png,jpg,jpeg,gif,ico}'],
      dest: '<%= grunt.config.get("dest") %>/'
    }]
  },
  svg: {
    files: [{
      expand: true,
      cwd: '<%= package.paths.src %>/',
      src: ['**/*.svg'],
      dest: '<%= grunt.config.get("dest") %>/'
    }]
  },
  videos: {
    files: [{
      expand: true,
      cwd: '<%= package.paths.src %>/',
      src: ['**/*.{webm,mp4,.ogg.theora}'],
      dest: '<%= grunt.config.get("dest") %>/'
    }]
  }
};
