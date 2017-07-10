
    'use strict';

    /*
    Create list of file to run in test.  Making sure that app_test.js is
    always the first to run
    */
    var firstFile, firstFileREGEXP = /test\.spec\.js$/i,
        testFiles = [], testFilesREGEXP = /(spec|test)\.js$/i
    ;

    Object.keys(window.__karma__.files).forEach(function (file) {    
        if (firstFileREGEXP.test(file)) {
            firstFile = file;
        } else if (testFilesREGEXP.test(file)) {
            testFiles.push(file);
        }
    });

    if (firstFile) {
        testFiles.unshift(firstFile);
    }

    require.config({
        // 这个baseUrl要注意根目录/base/
        baseUrl: '/base/js',
        paths:{
            'select':'lib/test/select',
            'sanitize' :'lib/test/angular-sanitize',
            'bootstrap':'lib/bootstrap.min',
            'uiRouter':'lib/angular-ui-router.min',
            'ngAMD': 'lib/angularAMD',
            'jquery': 'lib/jquery.min',
            'bootstrapTypeahead':'lib/bootstrap3-typeahead',
            'typeahead':'lib/angular-bootstrap3-typeahead',
            'angular': 'lib/test/angular',
            'angulardrag': 'lib/angular-drag',
            // 测试新增
            'readJSON': '../node_modules/karma-read-json/karma-read-json',
            'text': '../node_modules/requirejs-text/text',
            'angularMocks': '../node_modules/angular-mocks/angular-mocks',
        },
        shim:{
            'jquery': {
                'exports': 'jquery'
            },
            'readJSON': {
                exports: 'readJSON'
            },
            'bootstrap': {
                deps: ['jquery']
            },
            'angular': {
                deps: ['jquery','bootstrap'],
                exports: 'angular'
            },
            'angularMocks': {
                deps: ['angular']
            },
            'uiRouter': {
                deps: ['angular']
            },
            'select': {
                deps: ['angular']
            },
            'angulardrag': {
                deps: ['angular']
            },
            'sanitize': {
                deps: ['angular']
            },
            'typeahead': {
                deps: ['angular']
            }
        },
        // dynamically load all test files
        deps: testFiles,

        // we have to kickoff jasmine, as it is asynchronous
        callback: window.__karma__.start
    })
