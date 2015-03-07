module.exports = {
  dev: {
    options: {
      variables: {
        'environment': 'development',
        'dest': '<%= package.paths.destinations.dev %>',
        'assets': '<%= package.paths.assets.dev %>'
      }
    }
  },
  production: {
    logOutput: false,
    options: {
      variables: {
        'environment': 'production',
        'dest': '<%= package.paths.destinations.production %>',
        'assets': '<%= package.paths.assets.production %>'
      }
    }
  }
};
