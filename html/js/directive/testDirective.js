define(["app"],function(app){
    app.register.directive('testDirective', ['$http',function($http) {
        return {
            restrict:"E",
            require: 'ngModel',
            scope:{
                'orders': '=ngModel',
                'message': '@message',
                'cities': '=',
                'saveMap': '&',
                'marginTop': '@'
            },
            templateUrl: 'js/directive/testDirective.html',
            link: function(scope, elem, attrs) {
               scope.name = 'name: zlr';
            }
        };
    }]);
})