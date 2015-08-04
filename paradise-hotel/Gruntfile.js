module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
             dist: {
                src: [
                    'js/libs/jquery-1.11.2.min.js',
                    'js/libs/placeholders.min.js',
                    'js/libs/select2.full.min.js',
                    'js/libs/owl.carousel.min.js',
                    'js/libs/bootstrap-datepicker.min.js'
                ],
                dest: 'js/libs.js',
            },
            css: {
                src: [
                    'css/sprites.css',
                    'css/plugins/*.css',
                    'css/reset.css',
                    'css/stylus/main.css'
                ],
                dest: 'css/style.css'
            }
        },
        sprite:{
            options: {
                livereload: true,
                total_height: 100,
            },
            icons: {
                src: 'images/sprite-icon/*.png',
                dest: 'images/spritesheet-icons.png',
                destCss: 'css/sprites.css',
                padding: 2,
                algorithm: 'binary-tree'
            },
            backs: {
                src: 'images/sprite-back/*.png',
                dest: 'images/spritesheet-backs.png',
                destCss: 'css/sprites-back.css',
                padding: 2,
                algorithm: 'top-down',
                algorithmOpts: {
                	sort: false
                }
            }
        },
        stylus: {
            compile: {
                options: {
                  paths: ['styl/', 'css/stylus'],
                },
                expand: true,
                cwd: 'styl/',
                src: '*.styl',
                dest: 'css/stylus',
                ext: '.css'
            }
        },
        watch: {
            scripts: {
                files: ['Gruntfile.js', 'js/script.js'],
                tasks: ['default'],
                options: {
                    spawn: false
                }
            },
            stylus: {
              files: ['*/*.*'],
              tasks: ['stylus:compile'],
              options : { livereload: 1337 },
            },
            concat: {
			    files: ['css/stylus/main.css'],
			    tasks: ['concat'],
			    options: {
                    spawn: false
                }
			  }
        }       
    });
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['stylus','sprite','concat', 'watch']);
};