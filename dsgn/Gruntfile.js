module.exports = function(grunt) {
    require('jit-grunt')(grunt, {
      sprite: 'grunt-spritesmith'
    });
    var base_dir = 'static/';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            development: {
                options: {
                    compress: true,
                    optimization: 2
                },
                files: {
                    "css/style.css": "css/style.less" // destination file and source file
                }
            }
        },

        concat: {
             dist: {
                src: [
                    'js/lib/jquery-1.11.2.min.js',
                    'js/lib/bootstrap.min.js',
                    'js/lib/placeholders.min.js',
                    'js/lib/responsive-tabs.js'
                ],
                dest: 'js/lib.js',
            },
            css: {
                src: [
                    'css/sprites.css',
                    'css/plugins/*.css',
                    'css/style.css'
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
    grunt.registerTask('deploy', ['less', 'sprite', 'concat']);
    grunt.registerTask('default', ['less', 'sprite', 'concat', 'watch']);

};