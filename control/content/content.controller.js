/**
 * Created by zain on 10/01/16.
 */
var opentablePluginApp = angular.module('opentablePlugin', []);

opentablePluginApp.controller("opentablePluginCtrl", ["$scope", "$log", "$timeout", function ($scope, $log, $timeout) {
    var timer = null,
        dataChanged = false;

    $scope.datastoreInitialized = false;
    $scope.idEmpty = false;
    /*
     * Go pull any previously saved data
     * */
    buildfire.datastore.get(function (err, result) {
        if (!err) {
            $scope.datastoreInitialized = true;
        } else {
            console.error("Error: ", err);
            return;
        }

        if (result && result.data && !angular.equals({}, result.data)) {
            $scope.data = result.data;
            $scope.id = result.id;
        } else {
            $scope.data = {
                content: {
                    opentableId: ""
                }
            };
        }

        /*
         * watch for changes in data and trigger the saveDataWithDelay function on change
         * */
        $scope.$watch('data', function (newObj, oldObj) {
            if (angular.equals(newObj, oldObj) || newObj == undefined) {
                dataChanged = false;
            } else {
                dataChanged = true;
            }
        }, true);

        if (!$scope.$$phase && !$scope.$root.$$phase) {
            $scope.$apply();
        }
    });


    $scope.validateUrl = function () {
        if (!$scope.datastoreInitialized) {
            console.error("Error with datastore didn't get called");
            return;
        }

        if (!dataChanged) {
            console.warn("data didn't changed")
            return;
        }
        var data = $scope.data;
        // if the form has some invalid data do not save, in our case the user eneter invalid URL
        if ($scope.frmMain.$invalid) {
            $log.warn('invalid data, details will not be saved');
            $scope.idEmpty = true;
        } else {
            $scope.idEmpty = false;
            dataChanged = false;
            if (!/^https?\:\/\//.test(data.content.opentableId)) {
                data.content.opentableId = "https://" + data.content.opentableId;
            }
            console.info("Saving...")
            buildfire.datastore.save(data, function (err, result) {
                if (err || !result) {
                    $log.error('Error saving the widget details: ', err);
                }
                else {
                    $log.info('Widget details saved');
                }
            });
        }
    };


}]);