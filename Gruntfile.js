module.exports = function(grunt) {

  grunt.initConfig({
    browserify: {
      dev: {
        src: "lib/client/index.js",
        dest:"public/dist/bundle.js",
      },
      options: {
        watch:true
      }
    },
    bower: {
      dev: {
        dest: 'public/vendor/'
      }
    },
    supervisor: {
  target: {
    script: "index.js",
    options: {
      pollInterval: 500,
      extensions: [ "js,jade,css,html" ],
      exec: "node",
      debug: false,
      debugBrk: false,
      quiet: true
    }
  }
}
  });

  grunt.loadNpmTasks('grunt-bower');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-supervisor');

  grunt.registerTask('install', ['bower',"browserify"]);
  grunt.registerTask('start', ["browserify","supervisor"]);
};
