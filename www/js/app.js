// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

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
      url: "/content-today/:type/:provider",
      views: {
        'menuContent' :{
          templateUrl: "templates/tvcontents.html",
          controller: 'ContentByTypeToday'
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

    .state('app.chooseTVContentTime', {
      url: "/choose-tvcontent-time/:channel",
      views: {
        'menuContent' :{
          templateUrl: "templates/choose-tvcontent-time.html",
          controller: 'ChooseTVContentTimeCtrl'
        }
      }
    })

  .state('app.current', {
      url: "/tvcontents/current/:channel",
      views: {
        'menuContent' :{
          templateUrl: "templates/current.html",
          controller: 'CurrentCtrl'
        }
      }
    })
  
    .state('app.tvcontents', {
      url: "/tvcontents/:time/:channel",
      views: {
        'menuContent' :{
          templateUrl: "templates/tvcontents.html",
          controller: 'TVContentCtrl'
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

    .state('app.single', {
      url: "/playlists/:playlistId",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlist.html",
          controller: 'PlaylistCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/providers');
});

