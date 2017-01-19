define(['app', 'service/rrcModalService'],function(app){
    app.register.controller('twoController',function($scope, rrcModalService){
        $scope.name = 'zlr 2';
        $scope.second = {};
        $scope.openModal = function() {
            var options = {
                container: $('#twopage'),
                template: $('#onemodal'),
                escapeClose: false,
                clickClose: false,
            };
            rrcModalService.openModal(options);
        };
        $scope.openModal2 = function() {
            var options = {
                container: $('#twopage'),
                template: $('#twomodal'),
                escapeClose: false,
                clickClose: false,
            };
            rrcModalService.openModal(options);
        };
        $scope.closeModal = function (event) {
            rrcModalService.closeModal(event);
        };
        $scope.datalists = [{id:1,name:'aa'},{id:2,name:'bb'},{id:3,name:'cc'},{id:4,name:'dd'},{id:5,name:'ee'}];
        $scope.setChange = function(item){
            alert(1)
        };
    });
});