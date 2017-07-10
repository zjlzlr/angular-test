// Karma configuration
// Generated on Wed Jul 05 2017 10:32:26 GMT+0800 (中国标准时间)

module.exports = function(config) {
  config.set({

    // 一定要加
    basePath: '../',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'requirejs'],


    // require需要的文件必需都在这包含
    files: [
        "tests/test-main.js", 
        { pattern: 'node_modules/requirejs-text/text.js', included: false },
        { pattern: 'node_modules/angular-mocks/angular-mocks.js', included: false },
        { pattern: 'node_modules/karma-read-json/karma-read-json.js', included: false },
        { pattern: 'js/lib/*.js', included: false },
        { pattern: 'js/*.js', included: false },
        { pattern: 'js/**/*.js', included: false },
        { pattern: 'js/**/*.html', included: false },
        { pattern: "tests/unit/*.spec.js", included: false },
        { pattern: "tests/mock/*.json", included: false },
        
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
