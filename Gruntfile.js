module.exports = function(grunt) {
    'use strict';

    //configuration for all the tasks that are going to run
    grunt.initConfig({

        clean: ['build/'],

        jshint: { //task name
            options: {
                //these options apply to all targets
                jshintrc: '.jshintrc',
                ignores: ['src/js/vendor/**']
            },
            all: { //target name (upt o you what you call it)
                files: { //target-specific action
                    src: ['src/js/**/*.js', 'test/specs/**/*.js', 'Gruntfile.js']
                        //the files you want jshint to run
                }
            }
            // you can have multiple targets per task
        },

        sass: {
            all: {
                files: {
                    'build/css/styles.css': 'src/sass/main.scss'
                }
            }
        },

        copy: {
            html: {
                files: [{ // ------from here-----  get this ------ go to ----
                    expand: true, cwd: 'src/', src: ['index.html'], dest: 'build/'
                }]
            },
            vendorjs: {
                files: [{
                    expand: true,
                    cwd: 'src/js/',
                    src: ['vendor/jquery/dist/jquery.min.js'],
                    dest: 'build/js/'
                }]
            }
        },

        concat: {
            js: {
                options: {
                    sourceMap: true
                },
                src: ['src/js/*.js'],
                //if there is another folder to find, specify that folder,
                //make sure the first js file that has to run is specified first
                dest: 'build/js/main.js'
                //create a new file that all js files will merge into
            }
        },

        connect: {
                server: {
                    options: {
                        port: 8888,
                        base: '.' //one dot means current directory,
                                //test will run in the current directory
                    }
                }
        },
        mocha: {
            all: {
                options: {
                    urls: ['http://localhost:8888/test/GhTracker.html']
                }
            }
        },

        watch: {
            sass: {
                files: ['src/sass/**/*.scss'],
                tasks: ['sass']
            },
            js: {
                files: ['src/js/*.js'],
                tasks: ['jshint', 'test', 'concat']
            },
            html: {
                files: ['src/index.html'],
                tasks: ['copy:html']
            }
        }
    });

    //loading plugings
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //setting up task aliases
    grunt.registerTask('test', ['connect', 'mocha']);
    grunt.registerTask('build', ['clean', 'jshint', 'test', 'concat', 'sass', 'copy']);
    grunt.registerTask('default', ['build']);




};
