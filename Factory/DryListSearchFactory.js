(function () {
    'use strict';
    angular.module("dealerApp").factory('DryLogSearchfactory', ['$resource', function ($resource) {

        var baseUrl = '/api/StandingDryLog/GetIssueLists';
        return $resource('', {}, {
            query: {
                method: 'GET',
                url: baseUrl
            }
        });
    }])
}());