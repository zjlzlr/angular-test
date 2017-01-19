define(["app"],function(app) {
//测试指令
    app.register.directive('rrcMap', function ($timeout) {
        return {
            restrict: 'AE',
            transclude: true,
            scope: {
                childName: '=',//将ngModel同指定对象绑定
                superName: '@',// 储存与firstName相关联的dom字符串
                callParent: '&'// 将引用传递给这个方法
            },
            link: function (scope, element, attrs) {
                // scope.onSend();//调用父作用域方法
                var that = scope;

                scope.testFunc = function () {
                    scope.callParent({args: {a: 1, b: 2}});

                };

            },
            template: "<div style='border:1px solid red'><div>指令子页面</div>" +
            "<div ng-transclude></div>" +
            "父页面单向修改子页面值 ：<input ng-model='superName'>{{superName}}<br/>" +
            "父子页面双向绑定：<input ng-model='childName'>{{childName}}<br>" +
            "<a href='javascript:void(0)' ng-click='testFunc()'>父方法</a></div>"
        }
    })
}