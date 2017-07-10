define(['app','ngAMD', 'readJSON', 'service/testService'], function (app, angularAMD) {
    describe('karma testService', function () {
        console.log('### Running test-service.js');
        var $httpBackend, $rootScope, result, json_result, testService;
        var expected = {
            "period": "day",
            "date": "Sat Dec 21 12:56:53 EST 2013",
        };

        beforeEach(function () {
            angularAMD.inject(function (TestService, _$rootScope_, _$httpBackend_) {
                $rootScope = _$rootScope_;
                $httpBackend = _$httpBackend_;
                testService = TestService;
            });
        });

        it('service data string', function () {
            $httpBackend.whenGET('/auth.py').respond(expected);
            var promise = testService.testAuth($rootScope);
                promise.then(function(data) {
                    result = data;
                });
            $httpBackend.flush();
             //强迫传递到当前作用域
            $rootScope.$apply();
            expect(result).toEqual(expected);
        });
        it('service mock data', function () {
            $httpBackend.whenGET('/auth.py').respond(expected);
            var promise = testService.testAuth($rootScope);
                promise.then(function(data) {
                    result = data;
                });
            $httpBackend.flush();
             //强迫传递到当前作用域
            $rootScope.$apply();
            expect(result).toEqual(expected);
        });
        it('service mock JSON', function () {
            //从文件中读取模拟返回数据 ,注意JSON文件格式，key值必需加双""   
            var valid_respond = readJSON('tests/mock/data.json');
            $httpBackend.whenGET('/user.py').respond(valid_respond);
            var promise = testService.testUser($rootScope);
                promise.then(function(data) {
                    json_result = data;
                });
            $httpBackend.flush();
             //强迫传递到当前作用域
            $rootScope.$apply();
            expect(json_result).toEqual(valid_respond);
        });
    });
})