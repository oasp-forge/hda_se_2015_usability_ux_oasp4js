/**
 * Created by Oliver Neff on 30.12.2015.
 */
angular.module('app.table-mgmt')
    .controller('TableOrdersDetailsCntl', function ($scope, $modalInstance, shownPositions, globalSpinner, sales, tableId, tableOrder, positionStateNotification) {
        'use strict';


        $scope.tableNumber = tableId;
        $scope.model = tableOrder;

        $scope.positions = shownPositions;

        $scope.close = function () {
            $modalInstance.close();
        };

        $scope.change = function (id) {
            $scope.positions[id].state = 'DELIVERED';
        };

        $scope.submit = function () {
            globalSpinner.decorateCallOfFunctionReturningPromise(function () {
                return sales.saveOrUpdateOrder($scope.model);
            }).then(function () {
                positionStateNotification.connect().then(function () {
                    var pos = $scope.model.positions[0];
                    positionStateNotification.notify(pos.id, pos.status);
                });
            });
        };

        $scope.deliverOrders = function () {
            $scope.submit();
        };

        $scope.deliverAllOrders = function () {
            var changes = false;
            var pos = $scope.positions;
            for (var i = 0; i < pos.length; i++) {
                if (pos[i].state != 'CANCELLED' && pos[i].state == 'PREPARED') {
                    pos[i].state = 'DELIVERED';
                    changes = true;
                }

            }
            if (changes) {
                $scope.submit();
            }
        };

    });
