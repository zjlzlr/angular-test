define(["app",'service/rrcModalService'],function(app){
  app.register.controller("oneController",["$scope","$http","$timeout","$state",'rrcModalService',function($scope,$http,$timeout,$state,rrcModalService){
      $scope.user={};
      $scope.current={
          secondName:"Lily",

      };
      $scope.test=1;
      $scope.go = function(route){
          $state.go(route);
      };
      //select测试方法
      $scope.current.selectName1 = 2;
      $scope.selectName2 = 2;
      $scope.selects = [{id:1,name:'a1'},{id:2,name:'a2'},{id:3,name:'a3'}];
      $scope.changeSelect = function(){
          $scope.selectName = 'b';
      };
      //radio repeat测试
      $scope.radioList = [{id:1,name:'b1'},{id:2,name:'b2'},{id:3,name:'b3'}];
      $scope.getRadio = function(){
          console.log($scope.current.radio2);
      };
      $scope.iftest = function(){
          console.log($scope.current);
          debugger;
      };
      //子方法回调
      $scope.call_parent = function(obj){
          alert(obj);
      };
      $scope.openModal = function() {
          var options = {
              container: $('#onepage'),
              template: $('#modal1'),
              escapeClose: false,
              clickClose: false,
          };
          rrcModalService.openModal(options);
      };
      $scope.closeModal = function (event) {
          rrcModalService.closeModal(event);
      };
      $scope.change_number = function(obj){
          if(obj.val > 10){
              obj.val = 10;
          }
      }
      //原生js方法调用
      $('#testClick').click(function(){
          $scope.current.clickName = 'click me';
          $scope.$apply();
      });
  }]);
    //测试指令
    app.register.directive('oneDirectives',function($timeout) {
        return {
            restrict: 'AE',
            transclude: true,
            scope:{
                childName:'=',//将ngModel同指定对象绑定
                superName : '@',// 储存与firstName相关联的dom字符串
                test:'@',
                callParent : '&'// 将引用传递给这个方法
            },
            link:function(scope,element,attrs){
               // scope.onSend();//调用父作用域方法
                var that = scope;

                scope.testFunc = function(){
                    scope.callParent({args:{a:1,b:2}});

                };

            },
            templateUrl:'js/directive/test.html',
         /*   template: "<div style='border:1px solid red' '><div>指令子页面</div>" +
            "<div ng-transclude></div>" +
            "父页面单向修改子页面值 ：<input ng-model='superName'>{{superName}}<br/>" +
            "父子页面双向绑定：<input ng-model='childName'>{{childName}}<br>" +
            "<a href='javascript:void(0)' ng-click='testFunc()'>父方法</a></div>"*/
        }
    })
    app.register.directive('ensureUnique', ['$http',function($http,$timeout,$window) {
        return {
            restrict:"A",
            require: 'ngModel',
            scope:{},
            link: function(scope, ele, attrs, ngModelController) {
                    if (!attrs.ensureUnique) return;
                ngModelController.$setValidity('unique', true);
            }
        };
    }]);
})