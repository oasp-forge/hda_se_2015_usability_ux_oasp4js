/**
 * Created by Oliver Neff on 01.01.2016.
 */
angular.module('app.table-mgmt')
    .controller('TableOverviewCntl', function ($scope,$modal, $filter, paginatedTableList, tables, reservations, globalSpinner) {
        'use strict';

        $scope.details = function (id, tableNumber) {
            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'table-mgmt/table-overview-details/table-overview-details.tpl.html',
                controller: 'TableOverviewDetailsCntl',
                size: "lg",
                resolve: {
                    tableId: function () {
                        return tableNumber;
                    },
                    reservations: function () {
                        if ($scope.reservations[id] != undefined) {
                        var entry = $scope.reservations[id].table.entry;
                        var result = $filter('orderBy')(entry, $scope.sortDate);
                        if (result != undefined) {
                            return result;
                        }}
                        return [];
                    }
                }
            });

            modalInstance.result.then(function () {
            });
        };

        // Panels
        $scope.panelState = function(state,id) {
            if (state == 'OCCUPIED') {
                return 'panel-danger';
            }
            if (id != undefined && $scope.getFirst(id) != undefined) {
                return 'panel-warning';
            }
            if (state == 'FREE') {
                return 'panel-success';
            }
            return null;
        };

        $scope.setFree = function(table) {
            globalSpinner.decorateCallOfFunctionReturningPromise(function () {
                return tables.free(table).then($scope.reloadTables);
            });
        };

        $scope.setOccupy = function(table) {
                globalSpinner.decorateCallOfFunctionReturningPromise(function () {
                    return tables.occupy(table).then($scope.reloadTables);
                });
        };

        // Pagination
        $scope.selectedItems = [];
        $scope.totalItems = paginatedTableList.pagination.total;
        $scope.numPerPage = paginatedTableList.pagination.size;
        $scope.currentPage = paginatedTableList.pagination.page;

        $scope.gridOptions = {
            data: paginatedTableList.result
        };

        $scope.reloadTables = function () {
            tables.getPaginatedTables($scope.currentPage, $scope.numPerPage).then(function (paginatedTables) {
                return paginatedTables;
            }).then(function (res) {
                paginatedTableList = res;
                $scope.gridOptions.data = paginatedTableList.result;
            });
        };

        // reservations
        $scope.reservations = [];
        $scope.reloadReservations = function() {
            $scope.reservations = reservations.reservation;
        };

        $scope.pad = function(n, width, z) {
            z = z || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        };


        $scope.getTime = function(time) {
            if (time != undefined) {
            if (time == 0) {
                return 'Mittag'
            }
            return 'Abend' }
            return null;
        };

        $scope.sortDate = function(entry) {
            var date = entry.date;
            return date.year * 10000 + date.month * 1000 + date.day * 10 + date.time;
        };

        $scope.getFirst =  function(tableNumber) {
            if ($scope.reservations[tableNumber] != undefined) {
                var entry = $scope.reservations[tableNumber].table.entry;
                var result = $filter('orderBy')(entry, $scope.sortDate);
                if (result != undefined) {
                    return result[0];
                }
            }
            return null;
        };


        $scope.$watch('currentPage', function () {
            $scope.reloadTables();
            $scope.reloadReservations();
        });



});
