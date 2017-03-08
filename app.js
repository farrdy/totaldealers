(function () {
    'use strict';
    var tdealer = angular.module('dealerApp', ['ui.router', 'ngRoute', 'ngResource', 'ui.bootstrap.datetimepicker', 'angularModalService', 'ngLoadingSpinner']);

 
    tdealer.factory("ShareData", function () {
        return { value: 0 };
    });


}());
