define(["app"],function(app){
    app.register.controller("threeController",function($scope){
        $scope.name="zlr 3";
        $scope.ccPerson = {selected: {}};
        $scope.cc_list = [{id:1,name:'a'},{id:2,name:'b'}];
        $scope.states = [{names:'aa',id:'11'},
            {names:'a宝马a',id:'11'},
            {names:'宝马达芬奇',id:'22'},
            {names:'朝秦暮楚宝',id:'33'},
            {names:'霸马球',id:'12'},
            {names:'ac',id:'13'},
        ];
        $scope.brandList = [{brand_name:'大众',brand_id:1},{brand_name:'a大众',brand_id:2},{brand_name:'速腾',brand_id:3}];
        $scope.car = {};
        $scope.clear = function () {
            $scope.car.brand_name = '';
        }
        $scope.get_brand = function (item) {
            console.log(item)
        };
        $scope.getBrandList = function (keywords,func) {
            func && func($scope.brandList);
        };
        $scope.getName = function(item){
            return item;
        };
        $scope.setName = function(item){
            return item.names;
        }
    })
})