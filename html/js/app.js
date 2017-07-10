define(['ngAMD','uiRouter', 'angularMocks', 'select','sanitize','angulardrag','bootstrapTypeahead','typeahead'],function(ngAMD,uiRouter){
    var app = angular.module('myApp',['ngMock', "ui.router",'ui.select','ngSanitize','angular-drag', 'bootstrap3-typeahead']);
    app.run(function($rootScope){
        //模板解析前判断
        $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
           //未登陆不让页面显示
        });
    });
    app.config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.when('', '/one');
        $stateProvider
            .state('one', ngAMD.route({
                url:'/one',
                templateUrl: 'views/one.html',
                controller: 'oneController'
            }))
            .state('one.two', ngAMD.route({
                url:'/two',
                templateUrl: 'views/two.html',
                controller: 'twoController'
            }))
            .state('one.three', ngAMD.route({
                url:'/three',
                templateUrl: 'views/three.html',
                controller: 'threeController'
            }))
            .state('four', ngAMD.route({
                url:'/four',
                templateUrl: 'views/four.html',
                controller: 'threeController'
            }));
    });
    ngAMD.bootstrap(app);
    return app;
})
