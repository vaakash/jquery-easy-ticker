module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                banner: '/*jQuery easy ticker v<%= pkg.version %> - (c) 2020 <%= pkg.author %>*/'
            },
            my_target: {
                files: {
                    'dist/jquery.easy-ticker.min.js': ['src/jquery.easy-ticker.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['uglify']);

};