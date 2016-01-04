/**
 * Created by Oliver Neff on 26.11.2015.
 */
angular.module('app.table-mgmt')
    .controller('TableOrdersCntl', function ($scope, $state, $modal, filterFilter, tables, paginatedTableList, sales, globalSpinner, positionStateNotification) {
        'use strict';

        $scope.details = function (id, tableNumber) {

            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'table-mgmt/table-orders-details/table-orders-details.tpl.html',
                controller: 'TableOrdersDetailsCntl',
                size: "lg",
                resolve: {
                    tableId: function () {
                        return tableNumber;
                    },
                    tableOrder: function () {
                        return $scope.model[id];
                    },
                    shownPositions: function () {
                        return $scope.prepared(id);
                    }
                }
            });

            modalInstance.result.then(function () {
                $scope.reloadOrders();
            });
        };


        // Sales
        $scope.model = [];

        $scope.ordered = function (tableNumber) {
            var result = [];
            if ($scope.model[tableNumber] != undefined) {
                var positions = $scope.model[tableNumber].positions;
                result = filterFilter(positions, {'state': '!CANCELLED'});
            }
            return result;
        };


        $scope.preparedSize = function (tableNumber) {
            var result = [];
            if ($scope.model[tableNumber] != undefined) {
                var positions = $scope.prepared(tableNumber);
                result = filterFilter(positions, {'state': '!ORDERED'});
            }
            return result.length;
        };
        $scope.prepared = function (tableNumber) {
            var result = [];
            if ($scope.model[tableNumber] != undefined) {
                var positions = $scope.model[tableNumber].positions;
                var prepared = filterFilter(positions, {'state': 'PREPARED'});
                var delivered = filterFilter(positions, {'state': 'DELIVERED'});
                var ordered = filterFilter(positions, {'state': 'ORDERED'});
                result = prepared.concat(delivered, ordered);
            }
            return result;
        };

        $scope.delivered = function (tableNumber) {
            var result = [];
            if ($scope.model[tableNumber] != undefined) {
                var positions = $scope.model[tableNumber].positions;
                result = filterFilter(positions, {'state': 'DELIVERED'});
            }
            return result;
        };

        $scope.submit = function (tableNumber) {
            globalSpinner.decorateCallOfFunctionReturningPromise(function () {
                return sales.saveOrUpdateOrder($scope.model[tableNumber]);
            }).then(function () {
                positionStateNotification.connect().then(function () {
                    var pos = $scope.model[tableNumber].positions[0];
                    positionStateNotification.notify(pos.id, pos.status);
                    $scope.reloadOrders();
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
        $scope.height = '150px';
        $scope.bgColor = function (tableNumber) {


            if ($scope.ordered(tableNumber).length == 0) {
                return '#0088CC'; // info-blue
            }

            if (($scope.ordered(tableNumber).length == $scope.delivered(tableNumber).length)) {
                return '#51A351'; // success-green
            }

            if ($scope.preparedSize(tableNumber) == $scope.ordered(tableNumber).length) {
                return '#F89406'; // warning-yellow
            }

            return '#BD362F'; // danger-red
        };


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

        $scope.reloadOrders = function () {
            for (var i = 0; i < $scope.totalItems; i++) {
                var tableID = $scope.gridOptions.data[i].id;
                $scope.load(tableID, i);
            }
        };


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
            $scope.reloadOrders();
        });
    })
;
