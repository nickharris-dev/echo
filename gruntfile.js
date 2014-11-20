module.exports = function(grunt) {
  'use strict';
  var path = require("path");

  // measures the time each task takes
  require('time-grunt')(grunt);

  // load grunt config
  require('load-grunt-config')(grunt, {
    configPath: path.join(process.cwd(), 'tasks'),
    loadGruntTasks: {
        pattern: ['grunt-*', 'assemble']
    }
  });

};
