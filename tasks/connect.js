var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = {
	options: {
    port: 8080,
    hostname: 'localhost'
  },
  dev: {
    options: {
      middleware: function (connect) {
        return [
          require('connect-livereload')(),
          mountFolder(connect, '.dev')
        ];
      }
    }
  }
};
