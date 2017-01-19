/**
 * Created by Administrator on 2016/1/3.
 */
/*
angular.module('myApp', [])
    .controller('IndexController', [ '$scope',function ($scope) {
        $scope.name="zlr";
    } ])*/
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
    $scope.direct="test";
});
app.directive('myDirective',function(){
    return{
        restrict: 'AE',
        require:'?ngModel',
        scope:{
            myName : '@'//隔离作用域访问父作用域属性
        },
        replace:true,
        template:"<span ng-click='testClick()'>selfDefined{{myName}}:=={{aa}}=={{bb}}--{{firstName}}</span>",// selfDefined9:==aaaa==bbbb00000
        link: function(scope, element, attrs,ngModel) {
            debugger;
            //这里也可以给属性赋值
            scope.bb="bbbb00000";
            //测试link事件方法
            /*element.bind('click',function(event){
                debugger;
            })*/
        },
        controller:function($scope, $element, $transclude, $log){
            debugger;
            //测试controller方法
            $scope.testClick=function(){
                alert(1);
            }
            //这里可以给scope赋值
            $scope.aa="aaaa";
        }
    };
})

