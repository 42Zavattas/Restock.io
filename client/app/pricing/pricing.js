'use strict';

angular.module('restockApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/pricing', {
        templateUrl: 'app/pricing/pricing.html',
        controller: 'PricingCtrl'
      });
  });
