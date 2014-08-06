'use strict';

angular.module('restockApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/account', {
        templateUrl: 'app/account/home/account.html',
        controller: 'AccountCtrl',
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
