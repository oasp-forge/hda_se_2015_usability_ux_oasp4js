/**
 * Created by Oliver Neff on 26.11.2015.
 */
angular.module('app.table-mgmt')
    .controller('TableOrdersCntl', function ($scope, tables, paginatedTableList, sales) {
        'use strict';

        $scope.model = [];

        $scope.getSumOrdersForTable = function (tableId) {
            var positions = $scope.model[tableId].positions;
            var order = {};
            var count = {};
            for (var i = 0; i < positions.length; i++) {
                if (positions[i].state != "CANCELLED") {
                    var id = positions[i].offerId;
                    order[id] = positions[i];
                    if (count[id] == null) {
                        count[id] = {count: 1, id: [order[id].id]};
                        order[id]['count'] = count[id]['count'];
                        order[id]['ids'] = count[id]['id'];
                    } else {
                        count[id]['count'] += 1;
                        count[id]['id'].push(order[id].id);
                        order[id]['count'] = count[id]['count'];
                        order[id]['ids'] = count[id]['id'];
                    }
                }
            }
            return order;
        }

        $scope.getStateColor = function (string) {
            if (string == "ORDERED") {
                return "alert alert-success";
            }
            if (string == "PREPARED") {
                return "alert alert-danger";
            }
            return "alert alert-info";
        }

        $scope.display = function (string) {
            if (string != "CANCELLED") {
                return true;
            }
            return false;
        }

        $scope.disable = function (string) {
            if (string == "PREPARED") {
                return "disabled";
            }
            return "";
        }


        // Pagination
        $scope.selectedItems = [];
        $scope.maxSize = 5;
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

        for (var i = 0; i < $scope.numPerPage; i++) {
            var tableID = $scope.gridOptions.data[i].id;
            $scope.load(tableID, i);
        }


        // Button Defines
        // Nicht unbedingt für den Controller.

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

        $scope.buttonDefs = [
            {
                label: 'TABLE_MGMT.EDIT',
                onClick: function () {
                    $scope.openEditDialog(selectedTable());
                },
                isActive: function () {
                    return selectedTable();
                }
            },
            {
                label: 'TABLE_MGMT.RESERVE',
                onClick: function () {
                    globalSpinner.decorateCallOfFunctionReturningPromise(function () {
                        return tables.reserve(selectedTable()).then($scope.reloadTables);
                    });
                },
                isActive: function () {
                    return selectedTable() && selectedTable().state === 'FREE';
                }
            },
            {
                label: 'TABLE_MGMT.CANCEL_RESERVATION',
                onClick: function () {
                    globalSpinner.decorateCallOfFunctionReturningPromise(function () {
                        return tables.cancelReservation(selectedTable()).then($scope.reloadTables);
                    });
                },
                isActive: function () {
                    return selectedTable() && selectedTable().state === 'RESERVED';
                }
            },
            {
                label: 'TABLE_MGMT.OCCUPY',
                onClick: function () {
                    globalSpinner.decorateCallOfFunctionReturningPromise(function () {
                        return tables.occupy(selectedTable()).then($scope.reloadTables);
                    });
                },
                isActive: function () {
                    return selectedTable() && (selectedTable().state === 'RESERVED' || selectedTable().state === 'FREE');
                }
            },
            {
                label: 'TABLE_MGMT.FREE',
                onClick: function () {
                    globalSpinner.decorateCallOfFunctionReturningPromise(function () {
                        return tables.free(selectedTable()).then($scope.reloadTables);
                    });
                },
                isActive: function () {
                    return selectedTable() && selectedTable().state === 'OCCUPIED';
                }
            }
        ];

    });
