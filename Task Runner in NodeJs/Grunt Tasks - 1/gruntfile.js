

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
        }
    })

    // Load libraries.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Setting up Tasks.
    grunt.registerTask('default', ['uglify']);
}