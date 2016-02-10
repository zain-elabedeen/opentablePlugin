/**
 * Created by zain on 05/01/16.
 */

describe('opentablePlugin Content: controller', function () {

    beforeEach(module('opentablePlugin'));

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));

    describe('Buildfire service', function () {

        it('Buildfire should exists', function () {
            expect(buildfire).toBeDefined();
        });
    });

    describe('Buildfire DataStore', function () {

        it('DataStore should exist and be an object', function () {
            expect(typeof buildfire.datastore).toEqual('object');
        });
        it('DataStore.get should exist and be a function', function () {
            expect(typeof buildfire.datastore.get).toEqual('function');
        });
        it('DataStore.getById should exist and be a function', function () {
            expect(typeof buildfire.datastore.getById).toEqual('function');
        });
        it('DataStore.insert should exist and be a function', function () {
            expect(typeof buildfire.datastore.insert).toEqual('function');
        });
        it('DataStore.update should exist and be a function', function () {
            expect(typeof buildfire.datastore.update).toEqual('function');
        });
        it('DataStore.save should exist and be a function', function () {
            expect(typeof buildfire.datastore.save).toEqual('function');
        });
    });

    describe('spy the service DataStore', function () {
        it('it should pass if DataStore get service called', function () {
            spyOn(buildfire.datastore, 'get').and.callFake(function() {
                return {
                    then: function(callback) { return callback(result); }
                };
            });
        });

        it('it should pass if DataStore save service called', function () {
            spyOn(buildfire.datastore, 'save').and.callFake(function() {
                return {
                    then: function(callback) { return callback(result); }
                };
            });
        });
    });

    describe('$scope.validateUrl', function() {
        var $scope, contentController;

        beforeEach(function() {
            $scope = {};
            contentController = $controller('opentablePluginCtrl', { $scope: $scope });
        });

        it('contentController should be defined', function() {
            expect(contentController).toBeDefined();
        });

        it('validate url should be defined', function() {
            expect($scope.validateUrl).toBeDefined();
        });
    });
});