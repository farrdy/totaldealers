
(function(){
    'use strict';
    angular.module("dealerApp").service('StandingDryLogService', ['$http', function ($http) {
        var urlBase = 'api/StandingDryLog/GetIssueInstance/';
        //Create new record
        this.getStandingDryLog = function (id) {
            var req = $http.get(urlBase + id);
            return req;
        };
    }]);
}());