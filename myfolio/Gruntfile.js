module.exports = function(grunt) {
    require('jit-grunt')(grunt, {
      sprite: 'grunt-spritesmith'
    });
    var base_dir = 'static/';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
             dist: {
                src: [
                    'js/lib/jquery-1.11.2.min.js'
                ],
                dest: 'js/lib.js',
            },
            css: {
                src: [
                    'css/style.css',
                    'css/sprites.css',
                    'css/plugins/*.css' //For owl slider

                ],
                dest: 'css/result.css'
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
        watch: {
            scripts: {
                files: ['../Gruntfile.js', '../js/script.js'],
                tasks: ['default'],
                options: {
                    spawn: false
                }
            },
            less: {
                files: ['css/*.less'],
                tasks: ['less', 'concat:css'],
                options: {
                    spawn: false
                }
            }
        }       
    });

//   Explicit tasks loading is not required because of jit-grunt usage https://github.com/shootaroo/jit-grunt
    grunt.file.setBase(base_dir);
    grunt.registerTask('deploy', ['sprite', 'concat']);
    grunt.registerTask('default', ['sprite', 'concat', 'watch']);

};