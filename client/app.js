'use strict';

angular.module('restock', [
  'ngRoute',
  'ngCookies',
  'ngAnimate',
  'ngClipboard',
  'btford.socket-io'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {

    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');

  })
  .factory('authInterceptor',
  function ($rootScope, $q, $cookieStore, $location) {
    return {

      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      responseError: function (response) {
        if (response.status === 401) {
          $location.path('/login');
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }

    };
  })

  .run(function ($rootScope, $location, $http, Auth) {

    $rootScope.Auth = Auth;

    $rootScope.ui = {
      isLogged: false,
      domain: 'http://restock.io',
      currentUser: Auth.getUser()
    };

    $rootScope.ui.domain = $location.protocol() +
        '://' + $location.host() +
        ($location.port() !== 80 ? ':' + $location.port() : '');

    $rootScope.logout = function () {
      Auth.logout();
      $location.path('/login');
    };

    $rootScope.$on('$routeChangeStart', function (event, next) {
      $http.get('/api/users/me').then(function (user) {
        $rootScope.ui.isLogged = true;
      }).catch(function () {
        $rootScope.ui.isLogged = false;
        if (next.authenticate) {
          $location.path('/login');
        }
      });
    });

  });
