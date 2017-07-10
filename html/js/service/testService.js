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