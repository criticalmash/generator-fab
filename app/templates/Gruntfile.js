/*
 * Generated on <%= (new Date).toISOString().split('T')[0] %>
 * <%= pkg.name %> v<%= pkg.version %>
 * <%= pkg.homepage %>
 *
 * Copyright (c) <%= (new Date).getFullYear() %> <%= pkg.author.name %>
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      src: 'src',
      dist: 'dist'
    },

    watch: {
      assemble: {
        files: ['<%%= config.src %>/{content,templates}/{,*/}*.{md,hbs,yml}'],
        tasks: ['assemble']
      },
      sass: {
        files: ['<%%= config.src %>/scss/{,*/}*.{scss,css}'],
        tasks: ['sass:dev']
      },
      livereload: {
        options: {
          livereload: '<%%= connect.options.livereload %>'
        },
        files: [
          '<%%= config.dist %>/{,*/}*.html',
          '<%%= config.dist %>/assets/{,*/}*.css',
          '<%%= config.dist %>/assets/{,*/}*.js',
          '<%%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%%= config.dist %>'
          ]
        }
      }
    },

    assemble: {
      pages: {
        options: {
          flatten: true,
          assets: '<%%= config.dist %>/assets',
          layout: '<%%= config.src %>/templates/layouts/default.hbs',
          data: '<%%= config.src %>/data/*.{json,yml}',
          partials: '<%%= config.src %>/templates/partials/*.hbs'<% if(plugins && plugins.length > 0){ %>,
          plugins: [<% if(typeof plugins === 'object'){ _.each(plugins, function(name, i) { %>'<%= name %>'<% if(i < (plugins.length - 1)) { %>,<% } }); } else { %>'<%= name %>'<%} %>],<%}
          _.each(plugins, function(name, i) { if(name == 'permalinks') { %>
          permalinks: {
            preset: 'pretty'
          },<% }
          if(name == 'assemble-contrib-contextual') { %>
          contextual: {
            dest: 'tmp/'
          },<% }
          }); %>
        },
        files: {
          '<%%= config.dist %>/': ['<%%= config.src %>/templates/pages/*.hbs']
        }
      }
    },

    copy: {
      main:{
        files:[
          {
            src: 'src/assets/css/app.css',
            dest: '<%%= config.dist %>/assets/css/app.css'
          }
        ]
      },
      setup:{
        files:[
          {
            src: 'bower_components/foundation/scss/foundation.scss',
            dest: '<%%= config.src %>/assets/scss/app.scss'
          },
          {
            src: 'bower_components/foundation/scss/foundation/_settings.scss',
            dest: '<%%= config.src %>/assets/scss/_settings.scss'
          }
        ]
      }
    },

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'compressed'
          //outputStyle: 'nested',
          //sourceComments: 'map'  // remove for production
        },
        files: {
          'css/app.css': 'scss/app.scss'
        }
      },
      dev: {
        options: {
          //outputStyle: 'compressed'
          outputStyle: 'nested',
          //sourceComments: 'map'  // remove for production
        },
        files: {
          '<%%= config.src %>/assets/css/app.css': '<%%= config.src %>/assets/scss/app.scss'
        }
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%%= config.dist %>/**/*.{html,xml}']

  });

  grunt.loadNpmTasks('assemble');

  grunt.registerTask('setup', [
    'copy:setup'
  ]);

  grunt.registerTask('server', [
    'build',
    'sass:dev',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'copy',
    'assemble'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
