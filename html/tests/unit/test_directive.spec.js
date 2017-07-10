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
            elem = angular.element('<test-directive message="' + id_string + '"></test-directive>');
            $compile(elem)($scope);
            $scope.$digest();
            expect(elem.find('span').text()).toBe('jasmine test directive');
        });
        it('访问指令scope', function () {
            var isolatedScope = elem.isolateScope();
            expect(isolatedScope.name).toEqual('name: zlr');
        });
    });
});