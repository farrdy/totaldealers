(function () {
    'use strict';
    angular.module("dealerApp").controller('StandingDryLogMain',
        ['$state',
        function ($state) {
            $state.go('IssueGrid');
            //$location.path("/editIssue");
        }]);
  
}());