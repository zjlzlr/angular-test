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
            $scope.cities = ['aa', 'bb'];
            $scope.appoint_order = {name: 'zlr', age: 2};
            $scope.getMap = function(args){
                console.log(args);
            }
            elem = angular.element('<test-directive ng-model="appoint_order" margin-top="10" message="' + id_string + '" cities="cities" save-map="getMap(args)"></test-directive>');
            $compile(elem)($scope);
            $scope.$digest();
            expect(elem.find('span').text()).toBe('jasmine test directive');
        });
        it('访问指令scope', function () {
            var isolatedScope = elem.isolateScope();
            console.log('cities:',isolatedScope.cities);
            console.log('orders:',isolatedScope.orders);
            isolatedScope.saveMap({'args': 'a'});
            console.log('messsage:',isolatedScope.message);
            console.log('marginTop:',isolatedScope.marginTop);
            expect(isolatedScope.name).toEqual('name: zlr');
        });
    });
});