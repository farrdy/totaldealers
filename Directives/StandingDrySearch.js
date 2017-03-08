'use strict'
angular.module("dealerApp").directive('standingSearch',
    function () {
        return {
            restrict: 'E',
            templateUrl: '~/Scripts/App/Templates/StandingDrySearch.html'
        }

    });