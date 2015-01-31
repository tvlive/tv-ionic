
angular.module('starter.controllers', [])

.service('contentConnector', function ($http) {
    this.listChannels = function (provider, callback) {
         $http.get('http://beta.tvlive.io/channels/provider/' + provider).
          success(callback);        
    }
    this.detailsContent = function (id, callback) {
         $http.get('http://beta.tvlive.io/tvcontent/' + id).
          success(callback);        
    }
    this.currentContent = function (provider, type, success_callback, error_callback) {
         $http.get('http://beta.tvlive.io/tvcontent/' + type + '/' + provider + '/current').
          success(success_callback).
          error(error_callback);        
    }
    this.contentByChannel = function (channel, time, success_callback, error_callback) {
         $http.get('http://beta.tvlive.io/tvcontent/channel/' + channel + '/' + time).
          success(success_callback).
          error(error_callback);        
    }

})  

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

.controller('OptionsByProviderCtrl', function($scope, $stateParams) {
  $scope.provider = $stateParams.provider;  
})

.controller('ChannelsCtrl', function($scope, $stateParams, contentConnector) {
    contentConnector.listChannels($stateParams.provider, function(data) {
            $scope.channels = transform_channel(data);
        })
})


.controller('DetailsCtrl', function($scope, $stateParams, contentConnector) {
    contentConnector.detailsContent($stateParams.tvContentId, function(data) {
            $scope.details = transform_date_details(data);
        })
  })

.controller('ListTVContentByChannel', function($scope, $stateParams, $timeout, contentConnector) {    

 $scope.data = {
    scrollTo: 0,
    totalItems : 0,
    tvContents : []
  };

  $scope.loadData = function() {

    $scope.data.tvContents = [];
    $timeout( function() {
      contentConnector.contentByChannel($stateParams.channel, $stateParams.time ,function(data) {
                $scope.data.tvContents = transform_list_tv_content(data);
                $scope.data.totalItems = $scope.data.tvContents.length;
                $scope.data.scrollTo = scroll_to($scope.data.tvContents)
            },function(data, status){
              $scope.error = true
        })              
      $scope.$broadcast("items-loaded");      
    }, 1200);
  }  
  $scope.loadData();
})

.controller('ListCurrentTVContentByTypeAndProvider', function($scope, $stateParams, contentConnector) {
  $scope.data = [];
  $scope.type = build_type($stateParams.type);
  $scope.title = build_title_current($stateParams.type);
  contentConnector.currentContent($stateParams.provider, $stateParams.type,function(data) {
                $scope.data.tvContents = transform_list_tv_content(data);
            },function(data, status){
              console.debug('this is an error in the http GET ' + data)
              console.debug('this is an error in the http GET ' + status)
              $scope.error = true
        })                      
}); 
