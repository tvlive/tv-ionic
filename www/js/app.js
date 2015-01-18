// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.config(function($httpProvider) {
  $httpProvider.interceptors.push(function($rootScope) {
    return {
      request: function(config) {
        $rootScope.$broadcast('loading:show')
        return config
      },
      response: function(response) {
        $rootScope.$broadcast('loading:hide')
        return response
      },
      responseError: function (rejection) {
        $rootScope.$broadcast('loading:hide')
        return $q.reject(rejection);
      }
    }
  })
})

.run(function($rootScope, $ionicLoading) {
  $rootScope.$on('loading:show', function() {
    $ionicLoading.show({template: 'Loading'})
  })

  $rootScope.$on('loading:hide', function() {
    $ionicLoading.hide()
  })
})


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })


    .state('app.providers', {
      url: "/providers",
      views: {
        'menuContent' :{
          templateUrl: "templates/providers.html",
          controller: 'ProvidersCtrl'
        }
      }
    })
    
    .state('app.optionsByProviders', {
      url: "/options-by-providers/:provider",
      views: {
        'menuContent' :{
          templateUrl: "templates/options-by-providers.html",
          controller: 'OptionsByProviderCtrl'
        }
      }
    })

  .state('app.contentByTypeToday', {
      url: "/content-now/:type/:provider",
      views: {
        'menuContent' :{
          templateUrl: "templates/tvcontents-now.html",
          controller: 'ListCurrentTVContentByTypeAndProvider'
        }
      }
    })
    

    .state('app.channels', {
      url: "/channels/:provider",
      views: {
        'menuContent' :{
          templateUrl: "templates/channels.html",
          controller: 'ChannelsCtrl'
        }
      }
    })

    .state('app.tvcontents', {
      url: "/tvcontents/:time/:channel",
      views: {
        'menuContent' :{
          templateUrl: "templates/tvcontents.html",
          controller: 'ListTVContentByChannel'
        }
      }
    })

    .state('app.detailsFilm', {
      url: "/details/:tvContentId/Film",
      views: {
        'menuContent' :{
          templateUrl: "templates/details-film.html",
          controller: 'DetailsFilmCtrl'
        }
      }
    })

    .state('app.detailsProgram', {
      url: "/details/:tvContentId/Program",
      views: {
        'menuContent' :{
          templateUrl: "templates/details-program.html",
          controller: 'DetailsProgramCtrl'
        }
      }
    })

    .state('app.detailsSeries', {
      url: "/details/:tvContentId/Series",
      views: {
        'menuContent' :{
          templateUrl: "templates/details-series.html",
          controller: 'DetailsSeriesCtrl'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/providers');
});

