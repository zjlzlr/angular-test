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