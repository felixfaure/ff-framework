module.exports = function(grunt) {
    'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    // All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

		concat: {
            perso: {
				src: ['ressources/js/perso/*.js'], // Fichiers scripts perso
				dest: 'ressources/js/build/perso.js',
			},
            plugins: {
				src: ['ressources/js/libs/*.js'], // Tous les plugins et libs
				dest: 'ressources/js/build/plugins.js',
			},
			header: {
				src: ['ressources/js/header/*.js'], // Fichiers scripts header
				dest: 'ressources/js/build/header.js',
			},
            prod: {
				src: ['ressources/js/libs/*.js','ressources/js/perso/*.js'], // Fichiers scripts perso + plugins
				dest: 'ressources/js/build/production.js',
			},
        },

		uglify: {
			options: {
                compress: {
                    warnings: false
                },
                mangle: true,
				// sourceMap: true
			},
			prod: {
				src: 'ressources/js/build/production.js',
				dest: 'js/production.min.js'
			},
			header: {
				src: 'ressources/js/build/header.js',
				dest: 'js/header.min.js'
			}
		},

		sass: {
			dist: {
				options: {
					style: 'expanded',
					sourcemap: true
				},
				files: {
					'ressources/css/build/style.dev.unprefixed.css': 'ressources/css/style.scss'
				}
			}
		},

		autoprefixer: {
			options: {
				browsers: [
                    // 'last 2 version',
                    "Android 2.3",
                    "Android >= 4",
                    "Chrome >= 20", //35
                    "Firefox >= 24", //31
                    "Explorer >= 8", //9
                    "iOS >= 6", //7
                    "Opera >= 12",
                    "Safari >= 6" //7.1
                ],
				map: true
			},
			single_file: {
				src: 'ressources/css/build/style.dev.unprefixed.css',
				dest: 'ressources/css/build/style.dev.css'
			},
		},

		cssmin: {
			options: {
				sourceMap: true
			},
			target: {
				files: {
					'style.css': ['ressources/css/build/style.dev.css']
				}
			}
		},

		browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        "style.css",
                        "*.html",
                        "*.php",
                        "js/*.js",
                        "img/*"
                    ]
                },
                options: {
					proxy: "localhost/ff-framework",
                    watchTask: true // < VERY important
                }
            }
        },

		watch: {
			options: {
				livereload: false,
			},
			scripts: {
				files: ['ressources/js/build/**/*.js'],
				//tasks: ['modernizr', 'concat', 'uglify'],
				tasks: ['concat', 'uglify'],
				options: {
					spawn: false,
				}
			},
			css: {
				files: ['ressources/css/*.scss', 'ressources/css/**/*.scss'],
				tasks: ['sass', 'autoprefixer', 'cssmin'],
				options: {
					spawn: false,
				}
			}
		}

    });

	require('load-grunt-tasks')(grunt);

    // grunt.registerTask('default', ['sass', 'autoprefixer', 'cssmin', 'concat', 'uglify', 'imagemin', "browserSync", "watch"]);
    // grunt.registerTask('default', ["browserSync", "watch"]);
    grunt.registerTask('default', ['sass', 'autoprefixer', 'cssmin', 'concat', 'uglify']);
    grunt.registerTask('live', ['sass', 'autoprefixer', 'cssmin', 'concat', 'uglify', 'browserSync', 'watch']);

};
