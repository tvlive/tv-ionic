
angular.module('starter.controllers', [])


.directive("delayedScroll", function($location, $ionicScrollDelegate) {
  
  return {
    restrict : "A",
    link : function(scope, elem, attrs) {
      
      console.log("ScrollTo=" + attrs.scrollTo);
      console.log("Total Items=" + attrs.totalItems);
      var monitorChildren = function() {
        return elem.children()[0].children.length;
      };
      
      scope.$on("items-loaded", function() {
        
        scope.$watch(monitorChildren, function(result) {

          console.log("Result=" + result);
          if( parseInt(result,10) == parseInt(attrs.totalItems, 10) ) {
            console.log("All elements rendered!");
            
            $location.hash(attrs.scrollTo);
            console.log("Scrolling to " + attrs.scrollTo);
            $ionicScrollDelegate.anchorScroll();
          }
        });

      });
      
    }
  }
})

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

.controller('ChannelsCtrl', function($scope, $stateParams, $http) {
  $http.get('http://beta.tvlive.io/channels/provider/' + $stateParams.provider).
        success(function(data) {
            $scope.channels = transform_channel(data);
        });
})

.controller('ListTVContentByChannel', function($scope, $stateParams, $http, $timeout) {    
$scope.loadData = function() {
  $http.get('http://beta.tvlive.io/tvcontent/channel/' + $stateParams.channel + '/' + $stateParams.time).
        success(function(data) {
            $scope.tvContents = transform_list_tv_content(data);
        });

  $timeout( function() {
  $scope.totalItems = $scope.tvContents.length;
  $scope.scrollTo = Math.floor(Math.random() * ($scope.totalItems - 0 + 1)) + 0
  $scope.$broadcast("items-loaded");
        
    }, 10);      
  }
  console.log("aaa" + $scope.data)
  console.log("aaa" + $scope.scrollTo)       
  $scope.loadData()
         
})


.controller('DetailsFilmCtrl', function($scope, $stateParams, $http) {
  $http.get('http://beta.tvlive.io/tvcontent/' + $stateParams.tvContentId).
        success(function(data) {
            $scope.details = transform_date_details(data);
        });  

  })

.controller('DetailsSeriesCtrl', function($scope, $stateParams, $http) {
  $http.get('http://beta.tvlive.io/tvcontent/' + $stateParams.tvContentId).
        success(function(data) {
            $scope.details = transform_date_details(data);
        });  
  })

.controller('DetailsProgramCtrl', function($scope, $stateParams, $http) {
  $http.get('http://beta.tvlive.io/tvcontent/' + $stateParams.tvContentId).
        success(function(data) {
            $scope.details = transform_date_details(data);
        });  
  })

.controller('ListCurrentTVContentByTypeAndProvider', function($scope, $stateParams, $http) {
  $http.get('http://beta.tvlive.io/tvcontent/' + $stateParams.type + '/' + $stateParams.provider + '/current').
        success(function(data) {
            $scope.tvContents = transform_list_tv_content(data);
        });  
  })

