/**
 * Created by Oliver Neff on 26.11.2015.
 */
angular.module('app.table-mgmt')
    .controller('TableOrdersCntl', function ($scope, tables, paginatedTableList, sales, globalSpinner, positionStateNotification) {
        'use strict';
        // Sales
        $scope.model = [];

        $scope.ordered = function (tableNumber) {
            if ($scope.model[tableNumber] != undefined) {
                var positions = $scope.model[tableNumber].positions;
                var sum = 0;
                for (var i = 0; i < positions.length; i++) {
                    if (positions[i].state != 'CANCELLED') {
                        sum++;
                    }
                }
                return sum;
            }
            return 0;
        };

        $scope.prepared = function (tableNumber) {
            if ($scope.model[tableNumber] != undefined) {
                var positions = $scope.model[tableNumber].positions;
                var sum = 0;
                for (var i = 0; i < positions.length; i++) {
                    if (positions[i].state == 'PREPARED' || positions[i].state == 'DELIVERED') {
                        sum++;
                    }
                }
                return sum;
            }
            return 0;
        };

        $scope.delivered = function (tableNumber) {
            if ($scope.model[tableNumber] != undefined) {
                var positions = $scope.model[tableNumber].positions;
                var sum = 0;
                for (var i = 0; i < positions.length; i++) {
                    if (positions[i].state == 'DELIVERED') {
                        sum++;
                    }
                }
                return sum;
            }
            return 0;
        };


        $scope.submit = function (tableNumber) {
            globalSpinner.decorateCallOfFunctionReturningPromise(function () {
                return sales.saveOrUpdateOrder($scope.model[tableNumber]);
            }).then(function () {
                positionStateNotification.connect().then(function () {
                    var pos = $scope.model[tableNumber].positions[0];
                    positionStateNotification.notify(pos.id, pos.status);
                });
            });
        };

        $scope.result = 'noting';
        $scope.deliverAllOrders = function (tableNumber) {
            if ($scope.model[tableNumber] != undefined) {
                var changes = false;
                var pos = $scope.model[tableNumber].positions;
                for (var i = 0; i < pos.length; i++) {
                    if (pos[i].state != 'CANCELLED' && pos[i].state == 'PREPARED') {
                        pos[i].state = 'DELIVERED';
                        changes = true;
                    }
                }
                // TODO I should submit after do that.
                if (changes) {
                    $scope.submit(tableNumber);
                }
            }
        };

        $scope.cancelleAllOrder = function (tableNumber) {
            if ($scope.model[tableNumber] != undefined) {
                var changes = false;
                var pos = $scope.model[tableNumber].positions;
                for (var i = 0; i < pos.length; i++) {
                    if (pos[i].state == 'DELIVERED') {
                        pos[i].state = 'CANCELLED';
                        changes = true;
                    }
                }
                if (changes) {
                    $scope.submit(tableNumber);
                }
            }
        };

// Color for warning
$scope.height = '100px';
$scope.bgColor = 'red';

// Sales
$scope.salesOrdered = 0;
$scope.salesPrepared = 0;
$scope.salesDelivered = 0;

// Pagination
$scope.selectedItems = [];
$scope.totalItems = paginatedTableList.pagination.total;
$scope.numPerPage = paginatedTableList.pagination.size;
$scope.currentPage = paginatedTableList.pagination.page;

$scope.gridOptions = {
    data: paginatedTableList.result
};


$scope.load = function (tableID, index) {
    sales.loadOrderForTable(tableID)
        .then(function (order) {
            $scope.model[index] = order;
        });
};

for (var i = 0; i < $scope.totalItems; i++) {
    var tableID = $scope.gridOptions.data[i].id;
    $scope.load(tableID, i);
}


$scope.reloadTables = function () {
    tables.getPaginatedTables($scope.currentPage, $scope.numPerPage).then(function (paginatedTables) {
        return paginatedTables;
    }).then(function (res) {
        paginatedTableList = res;
        $scope.gridOptions.data = paginatedTableList.result;
    });
};

$scope.$watch('currentPage', function () {
    $scope.reloadTables();
});


})
;
