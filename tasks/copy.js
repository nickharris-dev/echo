module.exports = {
  javascript: {
    files: [{
      expand: true,
      cwd: '<%= package.src %>/',
      src: ['**/*.js'],
      dest: '<%= package.dest_dev %>/'
    }]
  },
  images: {
    files: [{
      expand: true,
      cwd: '<%= package.src %>/',
      src: ['**/*.{png,jpg,jpeg,gif,svg}'],
      dest: '<%= package.dest_dev %>/'
    }]
  },
  videos: {
    files: [{
      expand: true,
      cwd: '<%= package.src %>/',
      src: ['**/*.{webm,mp4,.ogg.theora}'],
      dest: '<%= package.dest_dev %>/'
    }]
  }
};
