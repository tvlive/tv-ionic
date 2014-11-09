angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('ProvidersCtrl', function($scope) {
  $scope.providers = [
    { name: 'Freeview', id: 1 },
    { name: 'Sky & Cable', id: 2 },
    { name: 'Terrestrial', id: 3 }    
  ];
})

.controller('ChannelsCtrl', function($scope, $stateParams, $http) {
     $http.get('http://beta.tvlive.io/channels/provider/' + $stateParams.provider).
        success(function(data) {
            $scope.channels = data;
        });
})

.controller('ChooseTVContentTimeCtrl', function($scope, $stateParams) {
  $scope.tvContentsTime = [
    { name: 'Today', time: 'today', channel: $stateParams.channel},
    { name: 'Now', time: 'current', channel: $stateParams.channel},
    { name: 'Left', time: 'left', channel: $stateParams.channel}
  ];
})

.controller('TVContentCtrl', function($scope, $stateParams, $http) {
  function transform(data) {
    for (i = 0; i < data.length; i++) {
      if (data[i].series){
        data[i].title = data[i].series.serieTitle;
      }

      if (data[i].program){
        data[i].title = data[i].program.title;
      } 

      if (data[i].film){
        data[i].title = data[i].film.title;
      }
       
    }
      return data;
  }

  $http.get('http://beta.tvlive.io/tvcontent/channel/' + $stateParams.channel + '/' + $stateParams.time).
        success(function(data) {
            $scope.tvContents = transform(data);
        });  
})

.controller('CurrentCtrl', function($scope, $stateParams, $http) {
  function transform(data) {
      if (data.series){
        data.title = data.series.serieTitle;
        data.description = data.series.description;
      }

      if (data.program){
        data.title = data.program.title;
        data.description = data.program.description;
      } 

      if (data.film){
        data.title = data.film.title;
        data.description = data.film.description;
      }
      return data;
  }

  $http.get('http://beta.tvlive.io/tvcontent/channel/' + $stateParams.channel + '/current').
        success(function(data) {
            $scope.details = transform(data);
        });  
  })

.controller('DetailsCtrl', function($scope, $stateParams, $http) {
  function transform(data) {
      if (data.series){
        data.title = data.series.serieTitle;
        data.description = data.series.description;
      }

      if (data.program){
        data.title = data.program.title;
        data.description = data.program.description;
      } 

      if (data.film){
        data.title = data.film.title;
        data.description = data.film.description;
      }
      return data;
  }

  $http.get('http://beta.tvlive.io/tvcontent/' + $stateParams.tvContentId).
        success(function(data) {
            $scope.details = transform(data);
        });  
  })
.controller('PlaylistCtrl', function($scope, $stateParams) {
});
