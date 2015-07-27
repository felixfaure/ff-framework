module.exports = function(grunt) {

    // All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

		concat: {
            prod: {
				src: [
					'ressources/js/build/libs/*.js', // Tous les plugins et libs
					'ressources/js/build/perso/*.js'  // Fichiers scripts principeaux
				],
				dest: 'ressources/js/dev/production.js',
			},
			header: {
				src: ['ressources/js/build/header/*.js'],
				dest: 'ressources/js/dev/header.js',
			},
        },

		uglify: {
			// options: {
			// 	sourceMap: true
			// },
			prod: {
				src: 'ressources/js/dev/production.js',
				dest: 'js/production.min.js'
			},
			header: {
				src: 'ressources/js/dev/header.js',
				dest: 'js/header.min.js'
			}
		},

		sass: {
			dist: {
				options: {
					style: 'compact',
					sourcemap: true
				},
				files: {
					'ressources/css/build/style.dev.unprefixed.css': 'ressources/css/style.scss'
				}
			}
		},

		autoprefixer: {
			options: {
				browsers: ['last 2 version', 'ie 8'],
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
					proxy: "localhost/travers_media/rouen",
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
    grunt.registerTask('default', ['sass', 'autoprefixer', 'cssmin', 'concat', 'uglify', 'browserSync', 'watch']);

};
