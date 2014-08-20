module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      serve: {
        files: [
          'public/**/*.html',
          'public/styles/**/*.css',
          'public/js/**/*.js',
          'public/images/**/*.*'
        ],
        options: {
          livereload: true
        }
      }
    },
    connect: {
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              connect.static('public')
            ];
          }
        }
      }
    },
    execute: {
      serve: {
        src: ['main.js']
      }
    },
    concurrent: {
      serve: ['execute:serve','watch:serve']
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-concurrent');

  //Custom tasks
  grunt.registerTask('serve', [
    'concurrent:serve'
  ]);

};