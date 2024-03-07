

module.exports = function (grunt) {

    // Configure the tasks.

    grunt.initConfig({
        // specify tasks.
        uglify: {
            target: {
                files: {
                    "dest/js/main.min.js": ["src/js/*.js"]
                }
            }
        },

        // Configure minify css.
        cssmin: {
            target: {
                files: [
                    {
                        expand: true,
                        cwd: "src/css",
                        src: ["*.css", "!*.min.css"],
                        dest: "dest/css",
                        ext: ".min.css"
                    }

                ]
            }
        }

    })

    // Load libraries.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Setting up Tasks.
    grunt.registerTask('default', ['uglify', 'cssmin']);
}