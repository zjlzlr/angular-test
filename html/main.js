require.config({

    baseUrl: "js",
    paths:{
         angular: 'lib/angular', //1.3版本
         select:'lib/select',
         sanitize :'lib/angular-sanitize',
       /* angular: 'lib/test/angular',  //1.5版本
        select:'lib/test/select',
        sanitize :'lib/test/angular-sanitize',*/
        bootstrap:'lib/bootstrap.min',
        uiRouter:'lib/angular-ui-router.min',
        ngAMD: 'lib/angularAMD',
        jquery: 'lib/jquery.min',
        bootstrapTypeahead:'lib/bootstrap3-typeahead',
        typeahead:'lib/angular-bootstrap3-typeahead',
        angulardrag:'lib/angular-drag',

        oneController:"controller/oneController",
        twoController:"controller/twoController",
        threeController:"controller/threeController",
        fourController:"controller/fourController"
    },
    shim:{
        'jquery': {
            'exports': 'jquery'
        },
        'bootstrap': {
            deps: ['jquery']
        },
        'angular': {
            deps: ['jquery','bootstrap'],
            exports: 'angular'
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
    deps: ['app'],//初始加载app.js

    urlArgs:'t=20151229'

});