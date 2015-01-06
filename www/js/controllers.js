
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

.controller('ProvidersCtrl', function($scope) {
  $scope.providers = [
    { name: 'Freeview', id: 1 },
    { name: 'Sky & Cable', id: 2 },
    { name: 'Terrestrial', id: 3 }    
  ];
})

.controller('OptionsByProviderCtrl', function($scope, $stateParams) {
  $scope.provider = $stateParams.provider;  
})

.controller('ChannelsCtrl', function($scope, $stateParams, $http, $ionicLoading) {
  $ionicLoading.show({
    template: 'Loading'
  });
  $http.get('http://beta.tvlive.io/channels/provider/' + $stateParams.provider).
        success(function(data) {
            $scope.channels = transform_channel(data);
            $ionicLoading.hide();
        });
})

.controller('ListTVContentByChannel', function($scope, $stateParams, $http, $ionicLoading) {    

  $ionicLoading.show({
    template: 'Loading'
  });

  $http.get('http://beta.tvlive.io/tvcontent/channel/' + $stateParams.channel + '/' + $stateParams.time).
        success(function(data) {
            $scope.tvContents = transform_list_tv_content(data);
            $ionicLoading.hide();
        });  
})


.controller('DetailsFilmCtrl', function($scope, $stateParams, $http, $ionicLoading) {
  $ionicLoading.show({
    template: 'Loading'
  });

  $http.get('http://beta.tvlive.io/tvcontent/' + $stateParams.tvContentId).
        success(function(data) {
            $scope.details = transform_date_details(data);
            $ionicLoading.hide();
        });  
  })

.controller('DetailsSeriesCtrl', function($scope, $stateParams, $http, $ionicLoading) {
  $ionicLoading.show({
    template: 'Loading'
  });
  $http.get('http://beta.tvlive.io/tvcontent/' + $stateParams.tvContentId).
        success(function(data) {
            $scope.details = transform_date_details(data);
            $ionicLoading.hide();
        });  
  })

.controller('DetailsProgramCtrl', function($scope, $stateParams, $http, $ionicLoading) {
  $ionicLoading.show({
    template: 'Loading'
  });
  $http.get('http://beta.tvlive.io/tvcontent/' + $stateParams.tvContentId).
        success(function(data) {
            $scope.details = transform_date_details(data);
            $ionicLoading.hide();
        });  
  })

.controller('ListCurrentTVContentByTypeAndProvider', function($scope, $stateParams, $http, $ionicLoading) {
  $ionicLoading.show({
    template: 'Loading'
  });

  $http.get('http://beta.tvlive.io/tvcontent/' + $stateParams.type + '/' + $stateParams.provider + '/current').
        success(function(data) {
            $scope.tvContents = transform_list_tv_content(data);
            $ionicLoading.hide();
        });  
  })

