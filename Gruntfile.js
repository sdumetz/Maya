module.exports = function(grunt) {

  grunt.initConfig({
    concat:{
      options: {
        sourceMap:true,
        separator: ';'
      },
      dist: {
        src: ['lib/client/**/*.js',"lib/model/embedded-model.js"],
        dest: 'public/dist/bundle.js',
      }
    },
    bower: {
      dev: {
        dest: 'public/vendor/'
      }
    },
    less: {
      dev: {
        options: {
          paths: ["lib/less"]
        },
        files: {
          "public/dist/tiles.css": "lib/less/tiles.less"
        }
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
    },
    jshint: { // configure the task
      // lint your project's server code
      client: [ // some example files
        'lib/client/**/*.js',
      ]
    }
  });

  grunt.loadNpmTasks('grunt-bower');
  grunt.loadNpmTasks('grunt-supervisor');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('install', ['bower',"concat","less"]);
  grunt.registerTask('start', ["less","concat","supervisor"]);
  grunt.registerTask('test', ["jshint"]);
};
