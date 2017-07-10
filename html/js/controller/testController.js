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