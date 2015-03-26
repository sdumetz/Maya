module.exports = function(grunt) {

  grunt.initConfig({
    browserify: {
      dev: {
        src: "lib/client/index.js",
        dest:"public/dist/bundle.js",
      },
      options: {
        watch:true,
        ignore:"nedb"
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
    mochaTest: {
      test: {
          options:{
          reporter:"spec",
          ui:"bdd",
          require:"./test/common.js",
          colors:true,
          timeout:2000
        },
        src: ['test/**/*.js']
      }
    }


  });

  grunt.loadNpmTasks('grunt-bower');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-supervisor');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.registerTask('install', ['bower',"browserify","less"]);
  grunt.registerTask('start', ["less","browserify","supervisor"]);
  grunt.registerTask('test', ["mochaTest"]);
};
