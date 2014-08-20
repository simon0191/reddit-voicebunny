module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      serve: {
        files: ['public/**/*.html','public/styles/**/*.css','public/js/**/*.js','public/images/**/*.*'],
        options: {
          livereload: true,
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
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  //Custom tasks
  grunt.registerTask('serve', [
    'connect:livereload',
    'watch:serve',
  ]);

};