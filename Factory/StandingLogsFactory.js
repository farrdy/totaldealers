(function () {

    'use strict'
    angular.module("dealerApp").factory('StandingDryLogfactory', ['$resource', function ($resource) {
        var baseUrl = '/api/StandingDryLog/GetAll';
        return $resource('', {}, {
            query: {
                method: 'GET',
                url: baseUrl
            }
        });
    }]);




}());