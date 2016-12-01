module.exports = function(grunt) {
    grunt.initConfig({
//        distFolder: 'dist',
        pkg: grunt.file.readJSON('package.json'),        
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                "esversion": 6,
                browser: true
            },
            uses_defaults: ['app/src/*.js']
        },

        qunit: {
            all_tests: ['specs/*.html']
        }      
    }); 
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    
    grunt.registerTask('default', ['jshint']);
};