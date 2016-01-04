/**
 * Created by Oliver Neff on 04.01.2016.
 */
angular.module('app.table-mgmt')
    .controller('TableOverviewDetailsCntl', function ($scope, $modalInstance, tableId, reservations) {
        'use strict';
        $scope.tableNumber = tableId;

        $scope.reservations = reservations;

        $scope.pad = function (n, width, z) {
            z = z || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        };

        $scope.close = function () {
            $modalInstance.close();
        };

    });
