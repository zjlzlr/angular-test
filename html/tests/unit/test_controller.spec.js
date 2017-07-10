define(['app', 'ngAMD', 'controller/testController'],function(app, angularAMD){
    describe('test-controller.js', function () {
        console.log('### Running test-controller_test.js');
        var scope, ctrl, $httpBackend;
        var expected = {
            "name": "zlr",
            "date": "Sat Dec 21 12:56:53 EST 2013",
        };
        beforeEach(function () {
          angularAMD.inject(function ($rootScope, $controller, _$httpBackend_) {
              $httpBackend = _$httpBackend_;
              scope = $rootScope.$new();
              ctrl = $controller('TestController', {
                  $scope: scope
              });
          });
        });

        it('app should be defined.', function () {
            expect(app).toBeDefined();
        });

        it('should have scope.message string in controller', function () {
            expect(scope.message).toBeDefined();
            expect(scope.message).toBe('hello test controller');
        });
        it('should fetch list of users', function() {
            $httpBackend.when('GET', 'Users/users.json').respond(expected);
            scope.getUsers();
            $httpBackend.flush();
            expect(scope.users.name).toBe('zlr');
            expect(scope.users).toEqual(expected);
            //输出结果以方便查看
            console.log('users-----------:',scope.users.name);
        });
    });
})