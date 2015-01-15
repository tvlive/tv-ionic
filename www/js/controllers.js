
angular.module('starter.controllers', [])


.directive("delayedScroll", function($location, $ionicScrollDelegate) {
  
  return {
    restrict : "A",
    link : function(scope, elem, attrs) {
      
      // console.log("ScrollTo=" + attrs.scrollTo);
      // console.log("Total Items=" + attrs.totalItems);
      var monitorChildren = function() {
        return elem.children()[0].children.length;
      };
      
      scope.$on("items-loaded", function() {
        
        scope.$watch(monitorChildren, function(result) {

          // console.log("Result=" + result);
          if( parseInt(result,10) == parseInt(attrs.totalItems, 10) ) {
            // console.log("All elements rendered!");          
            $location.hash(attrs.scrollTo);
            // console.log("Scrolling to " + attrs.scrollTo);
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

.controller('ListTVContentByChannel', function($scope, $stateParams, $http, $ionicLoading, $timeout) {    

 $scope.data = {
    scrollTo: 0,
    totalItems : 0,
    tvContents : []
  };

 $ionicLoading.show({
    template: 'Loading'
  });

  $scope.loadData = function() {

    $scope.data.tvContents = [];
    $timeout( function() {
      $http.get('http://beta.tvlive.io/tvcontent/channel/' + $stateParams.channel + '/' + $stateParams.time).
            success(function(data) {
                $scope.data.tvContents = transform_list_tv_content(data);
                $scope.data.totalItems = $scope.data.tvContents.length;
                $scope.data.scrollTo = scroll_to($scope.data.tvContents)
                // console.log("calculated is " + $scope.data.scrollTo)
                $ionicLoading.hide();

            }).
            error(function(data, status){
              // console.info('error getting current content ') 
              $ionicLoading.hide();
              $scope.error = true
        });              
      $scope.$broadcast("items-loaded");      
    }, 1200);
  }
  
  $scope.loadData();
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

.controller('ListCurrentTVContentByTypeAndProvider', function($scope, $stateParams, $http, $ionicLoading, $timeout) {
  $scope.data = [];
 $ionicLoading.show({
    template: 'Loading'
  });

 $scope.type = build_type($stateParams.type);
 $scope.title = build_title_current($stateParams.type);
  $http.get('http://beta.tvlive.io/tvcontent/' + $stateParams.type + '/' + $stateParams.provider + '/current').
            success(function(data) {
                $scope.data.tvContents = transform_list_tv_content(data);
                $ionicLoading.hide();
            }).
            error(function(data, status){
              // console.info('error getting current content ') 
              $ionicLoading.hide();
              $scope.error = true
        });                      
}); 
