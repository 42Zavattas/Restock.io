'use strict';

angular.module('restock')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/account/login/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'vm'
      })
      .when('/signup', {
        templateUrl: 'views/account/signup/signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'vm'
      })
      .when('/account', {
        templateUrl: 'views/account/home/home.html',
        controller: 'AccountCtrl',
        controllerAs: 'vm',
        authenticate: true,
        resolve: {
          stocks: function ($q, $http) {
            var deferred = $q.defer();
            $http.get('api/stocks/mine').then(function (res) {
              deferred.resolve(res.data);
            }, function (err) {
              deferred.reject(err);
            });
            return deferred.promise;
          }
        }
      });
  });

