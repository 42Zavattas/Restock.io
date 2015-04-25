'use strict';

angular.module('restock')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/pricing', {
        templateUrl: 'views/pricing/pricing.html',
        controller: 'PricingCtrl',
        controllerAs: 'vm'
      });
  });
