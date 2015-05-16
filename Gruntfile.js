module.exports = function(grunt) {

  grunt.initConfig({
    concat:{
      options: {
        sourceMap:true,
        separator: ';'
      },
      dist: {
        src: ['lib/client/**/*.js'],
        dest: 'public/dist/bundle.js',
      },
      tests:{
        src:"test/client/tests/*.js",
        dest: 'test/client/tests.js',
      }
    },
    bower: {
      install: {
         options:{
           targetDir:"public/vendor",
           install:true
         }
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
    jshint: { // configure the task
      // lint your project's server code
      client: [
        'lib/client/**/*.js',
      ],
      options:{
        "unused": true,
        "esnext":true,
        "laxcomma":true
      }
    },
    mochaTest: {
    },
    mocha: {
      test: {
        src: ['test/client/index.html'],
        options: {
          run:true,
          log: true,
          logErrors: true
        },
      }
    },
    supervisor: {
      target: {
        script: "index.js",
        options: {
          pollInterval: 500,
          extensions: [ "js,node" ],
          exec: "node",
          debug: false,
          debugBrk: false,
          quiet: true
        }
      }
    },
    watch: {
       files: ['<%= less.dev.options.paths %>','<%= concat.dist.src %>'],
       tasks: ['less','concat:dist']
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-supervisor');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test'); //Mocha server-side test runner
  grunt.loadNpmTasks('grunt-mocha'); //Mocha client-side test runner
  //Instead of grunt-mocha, we can run this task to just output a link to the html file to be opened in browser (specific browser support test)
  grunt.registerTask('client-test', 'Client javascript test', function() {
    grunt.log.writeln(this.name + " available on file://"+__dirname+"/test/client/index.html");
  });
  //Directly used tasks :
  grunt.registerTask('install', ['bower:install',"concat","less"]);
  grunt.registerTask('start', ["less","concat:dist","supervisor"]);
  grunt.registerTask('test', ["jshint","concat:tests","mocha","client-test"]);
};
