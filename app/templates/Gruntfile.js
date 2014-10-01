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

    // Project metadata
    // pkg   : grunt.file.readJSON('package.json'),
    // vendor: grunt.file.readJSON('.bowerrc').directory,
    site  : grunt.file.readYAML('_config.yml'),

    config: {
      src: 'src',
      dist: 'dist'
    },

    watch: {
      assemble: {
        files: ['<%%= config.src %>/{content,templates}/{,*/}*.{md,hbs,yml}', '_config.yml'],
        tasks: ['assemble', 'copy:main']
      },
      sass: {
        files: ['<%%= config.src %>/scss/{,*/}*.{scss,css}'],
        tasks: ['sass:dev', 'copy:main']
      },
      livereload: {
        options: {
          livereload: '<%%= connect.options.livereload %>'
        },
        files: [
          '<%%= config.dist %>/{,*/}*.html',
          '<%%= config.dist %>/css/{,*/}*.css',
          '<%%= config.dist %>/js/{,*/}*.js',
          '<%%= config.dist %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
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
          site: '<%%= site %>',
          data: '<%%= config.src %>/data/*.{json,yml}',
          helpers: '<%%= site.helpers %>',
          partials: '<%%= config.src %>/templates/partials/*.hbs'<% if(plugins && plugins.length > 0){ %>
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
        // File info
        expand: true, // use extra file management features
        cwd: '<%%= config.src %>/content/', // we're telling grunt to use pages dir as our copy root
        src: '**/*.{md,hbs}',
        dest: '<%%= config.dist %>/' // whatevers in docs is now in here
      }
    },

    copy: {
      main:{
        files:[
          {
            expand: true,
            cwd: '<%= config.src %>/css',
            src: '*',
            dest: '<%= config.dist %>/css/'
          },
          {
            expand: true,
            cwd: 'bower_components/',
            src: '<%%= site.pagescripts.vendor %>',
            dest: '<%%= config.dist %>/js/vendor/'
          },
          {
            expand: true,
            cwd: 'bower_components/',
            src: '<%= site.jsmaps.vendor %>',
            dest: '<%= config.dist %>/js/vendor/'
          },
          {
            expand: true,
            cwd: 'src/js',
            src: '<%%= site.pagescripts.custom %>',
            dest: '<%%= config.dist %>/js/custom/'
          },
          {
            expand: true,
            cwd: 'src/img',
            src: ['<%%= config.src %>/img/**'],
            dest: '<%%= config.dist %>/img/'
          }
        ]
      },
      setup:{
        files:[
          {
            src: 'bower_components/foundation/scss/foundation.scss',
            dest: '<%%= config.src %>/scss/_foundation.scss'
          },
          {
            src: 'bower_components/foundation/scss/foundation/_settings.scss',
            dest: '<%%= config.src %>/scss/_settings.scss'
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
          '<%%= config.src %>/css/app.css': '<%%= config.src %>/scss/app.scss'
        }
      },
      dev: {
        options: {
          //outputStyle: 'compressed'
          // outputStyle: 'nested',
          sourceComments: 'map',  // remove for production
          sourceMap: 'sass',
        },
        files: {
          '<%%= config.src %>/css/app.css': '<%%= config.src %>/scss/app.scss'
        }
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%%= config.dist %>/**/*.{html,xml,css}']

  });

  grunt.loadNpmTasks('assemble');

  grunt.registerTask('setup', [
    'copy:setup'
  ]);

  grunt.registerTask('server', [
    'clean',
    'sass:dev',
    'copy:main',
    'assemble',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'sass:dist',
    'copy:main',
    'assemble'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
