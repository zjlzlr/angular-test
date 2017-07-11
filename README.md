# angular-test
1. angular基础测试实例 
2. 在DIV中弹框实例（一些常用的弹框如bootstrap都在body中弹框）
3. 下拉输入框指令（基于bootstrap typeahead）
# 基础框架
1. angular + angularui + require + bootstrap
# 运行
1. 把项目加入webstorm
2. 右击html/index.html-->open in browser-->chorme


1 测试框架
2 环境搭建
2.1 安装依赖包
2.2 生成karma配置文件
2.3 项目目录
3 测试实例
3.1 测试入口文件app.js
3.2 controller测试
3.3 service测试
3.4 指令测试
4 运行
测试框架
karma + jasmine
环境搭建
安装依赖包
1.在项目目录下，npm init生成package.json文件
2.在项目目录下运行：
  npm install -g karma --save-dev
  npm install karma-jasmine jasmine-core  angular-mocks@1.5.x  karma-phantomjs-launcher karma-read-json karma-requirejs requirejs-text --save-dev
  注：angular-mocks@1.5.x：与angular版本配套
         karma-read-json： 模拟数据从json文件读取
         karma-requirejs：require模块化
         requirejs-text： 指令中加载模板
         karma-phantomjs-launcher： 生成不同类型的浏览器运行环境
生成karma配置文件
1.项目下新建文件夹tests,在tests下运行karma init 一路向下，生成karma.conf.js配置文件,选择require选项会一起生成tem-main.js
2.附上配置文件：
karma.conf.js
 Collapse source
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
test-main.js
 Collapse source
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
项目目录
主要涉及app.js，controller，service，directive的测试
 Collapse source
angularTest
    |--html
        |--css
        |--views 
        |--js
            |--controller
                |--testController.js
            |--directive
                |--testDirective.js
                |--testDirective.html
            |--service
                |--testService.js
            |--lib
            |--app.js
        |--tests
            |--mock
                |--data.json
            |--unit
                |--test_app.spec.js
                |--test_controller.spec.js
                |--test_directive.spec.js
                |--test_service.spec.js
            |--karma.conf.js
            |--test-main.js
        |--main.js
        |--package.json
        |--index.html
 
测试实例
测试入口文件app.js
注：mock测试需要在app.js引入angular-mocks.js文件，并在模块依赖中加入ngMock,加入以后可以使用$httpBackend进行数据mock,angular自身的$httpBackend不好用
app.js
 Collapse source
define(['ngAMD','uiRouter', 'angularMocks', 'select','sanitize','angulardrag','bootstrapTypeahead','typeahead'],function(ngAMD,uiRouter){
    var app = angular.module('myApp',['ngMock', "ui.router",'ui.select','ngSanitize','angular-drag', 'bootstrap3-typeahead']);
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
test_app.spec.js
 Collapse source
define(['app','ngAMD','uiRouter', 'select','sanitize','angulardrag','bootstrapTypeahead','typeahead'], function (app, angularAMD) {
    describe('app.js', function () {
        console.log('### Running test_app.js ###');
        it('app should be defined.', function () {
            expect(app).toBeDefined();
        });
        it('angularAMD must be bootstrapped', function (done) {
            var i = 0, retries = 5;
            var interval = setInterval(function () {
                var bootstrapped = true;
                i += 1;
                try {
                    var a = angularAMD.appname();
                } catch(err) {
                    bootstrapped = false;
                    console.log("Waiting for angularAMD to boostrap, attempt " + i + ".  Error: " + err);
                }
                if (bootstrapped) {
                    clearInterval(interval);
                    console.log('### angularAMD bootstrapped.',a);
                    done()
                } else {
                    if (i>retries) {
                        clearInterval(interval);
                    }
                }
            }, 999)
        });
    });
});
controller测试
 
testController.js:
 Collapse source
define(["app"],function(app){
    app.register.controller("TestController",function($scope, $http){
        $scope.getUsers = function () {
            $http.get('Users/users.json').success(function(data){
                $scope.users = data;
            });
        }
        $scope.message = 'hello test controller';
    })
})
test_controller.spec.js
 Collapse source
define(['app', 'ngAMD', 'controller/testController'],function(app, angularAMD){
    describe('test-controller.js', function () {
        console.log('### Running test-controller_test.js');
        var scope, ctrl, $httpBackend;
        var expected = {
            "name": "zlr",
            "date": "Sat Dec 21 12:56:53 EST 2013",
        };
        beforeEach(function () {
          angularAMD.inject(function ($rootScope, $controller, _$httpBackend_) {
              $httpBackend = _$httpBackend_;
              scope = $rootScope.$new();
              ctrl = $controller('TestController', {
                  $scope: scope
              });
          });
        });
        it('app should be defined.', function () {
            expect(app).toBeDefined();
        });
        it('should have scope.message string in controller', function () {
            expect(scope.message).toBeDefined();
            expect(scope.message).toBe('hello test controller');
        });
        it('should fetch list of users', function() {
            $httpBackend.when('GET', 'Users/users.json').respond(expected);
            scope.getUsers();
            $httpBackend.flush();
            expect(scope.users.name).toBe('zlr');
            expect(scope.users).toEqual(expected);
            //输出结果以方便查看
            console.log('users-----------:',scope.users.name);
        });
    });
})
service测试
testService.js
 Collapse source
'use strict';
define(['app'], function (app) {
    app.register.service('TestService',
        function($http,$q) {
            return {
                testAuth: function($scope){
                    var deferred = $q.defer();
                    //http 服务请求
                    $http({method: 'GET', url: '/auth.py'}).then(
                        function(response){
                            deferred.resolve(response.data);
                        },
                        function (response) {
                            deferred.reject(response);
                        }
                    );
                    //返回http 服务请求的promise
                    return deferred.promise;
                },
                testUser: function($scope){
                    var deferred = $q.defer();
                    //http 服务请求
                    $http({method: 'GET', url: '/user.py'}).then(
                        function(response){
                            deferred.resolve(response.data);
                        },
                        function (response) {
                            deferred.reject(response);
                        }
                    );
                    //返回http 服务请求的promise
                    return deferred.promise;
                }
            };
        }
    );
});
test_service.spec.js
 Collapse source
define(['app','ngAMD', 'readJSON', 'service/testService'], function (app, angularAMD) {
    describe('karma testService', function () {
        console.log('### Running test-service.js');
        var $httpBackend, $rootScope, result, json_result, testService;
        var expected = {
            "period": "day",
            "date": "Sat Dec 21 12:56:53 EST 2013",
        };
        beforeEach(function () {
            angularAMD.inject(function (TestService, _$rootScope_, _$httpBackend_) {
                $rootScope = _$rootScope_;
                $httpBackend = _$httpBackend_;
                testService = TestService;
            });
        });
        it('service data string', function () {
            $httpBackend.whenGET('/auth.py').respond(expected);
            var promise = testService.testAuth($rootScope);
                promise.then(function(data) {
                    result = data;
                });
            $httpBackend.flush();
             //强迫传递到当前作用域
            $rootScope.$apply();
            expect(result).toEqual(expected);
        });
        it('service mock data', function () {
            $httpBackend.whenGET('/auth.py').respond(expected);
            var promise = testService.testAuth($rootScope);
                promise.then(function(data) {
                    result = data;
                });
            $httpBackend.flush();
             //强迫传递到当前作用域
            $rootScope.$apply();
            expect(result).toEqual(expected);
        });
        it('service mock JSON', function () {
            //从文件中读取模拟返回数据 ,注意JSON文件格式，key值必需加双""  
            var valid_respond = readJSON('tests/mock/data.json');
            $httpBackend.whenGET('/user.py').respond(valid_respond);
            var promise = testService.testUser($rootScope);
                promise.then(function(data) {
                    json_result = data;
                });
            $httpBackend.flush();
             //强迫传递到当前作用域
            $rootScope.$apply();
            expect(json_result).toEqual(valid_respond);
        });
    });
})
data.json
 Collapse source
{
    "data": {"name": "zlr"},
    "status":0
}
指令测试
testDirective.js
 Collapse source
define(["app"],function(app){
    app.register.directive('testDirective', ['$http',function($http) {
        return {
            restrict:"E",
            scope:{
                'message': '@message'
            },
            templateUrl: 'js/directive/testDirective.html',
            link: function(scope, elem, attrs) {
               scope.name = 'name: zlr';
            }
        };
    }]);
})
testDirective.html
 Collapse source
<div>
    <span>jasmine test directive</span>
    <button type="button">event</button>
    <div>name:{{name}}</div>
    <div>message:{{message}}</div>
</div>
test_directive.spec.js
 Collapse source
define(['app', 'ngAMD', 'text!directive/testDirective.html', 'directive/testDirective'],
function (app, angularAMD, testDirective_html) {
    describe('testDirective', function () {
        console.log('### Running directive_test.js');
        var $compile, $scope, $rootScope, elem;
        beforeEach(function () {
            angularAMD.inject(function (_$compile_, _$rootScope_, $templateCache) {
                $rootScope = _$rootScope_;
                $compile = _$compile_;
                $scope = $rootScope.$new();
                $templateCache.put('js/directive/testDirective.html', testDirective_html);
            });
        });
        it('test message attribute', function () {
            var id_string = 'Qy3marXUsk';
            elem = angular.element('<test-directive message="' + id_string + '"></test-directive>');
            $compile(elem)($scope);
            $scope.$digest();
            expect(elem.find('span').text()).toBe('jasmine test directive');
        });
        it('访问指令scope', function () {
            var isolatedScope = elem.isolateScope();           
            expect(isolatedScope.name).toEqual('name: zlr');
        });
    });
});
运行
在karma.conf.js目录下执行karma start测试
 
 
