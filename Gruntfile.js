/**
 * configuration for grunt tasks
 * @module Gruntfile
 */

module.exports = function(grunt) {
  /** load tasks */
  require('load-grunt-tasks')(grunt);

  /** config for build paths */
  var config = {
    dist: {
      dir: 'dist/',
      js: 'dist/Util.js'
    },
    src: {
      dir: 'src/'
    },
    tmp: {
      dir: 'tmp/'
    }
  };

  /** paths to files */
  var files = {

    /** src files */
    src: [
      'Util.js'
    ]
  };

  /* # # # # # # # # # # # # # # # # # # # # */
  /* # # # # # # # # # # # # # # # # # # # # */
  /* # # # # # # # # # # # # # # # # # # # # */
  /* # # # # # # # # # # # # # # # # # # # # */

  /** config for grunt tasks */
  var taskConfig = {
    concat: {
      src: {
        options: {
          // stripBanners: true
          banner: 'angular.module("Util", [])\n' +
          '.service("Util", [\n' +
          '"$q",\n' +
          '"$filter",\n' +
          'function($q, $filter) {\n\n',
          footer: '\n\n' +
          'return service;\n\n}' +
          '\n]);'
        },
        src: (function() {
          var cwd = config.src.dir;

          return files.src.map(function(path) {
            return cwd + path;
          });
        })(),
        dest: config.dist.js
      }
    }
  };

  /* # # # # # # # # # # # # # # # # # # # # */
  /* # # # # # # # # # # # # # # # # # # # # */
  /* # # # # # # # # # # # # # # # # # # # # */
  /* # # # # # # # # # # # # # # # # # # # # */

  // register default & custom tasks

  grunt.initConfig(taskConfig);

  grunt.registerTask('default', [
    'build'
  ]);

  grunt.registerTask('build', [
    'concat'
  ]);

};