
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

.controller('ChannelsCtrl', function($scope, $stateParams, $http) {
  function transform(data) {
    for (i = 0; i < data.length; i++) {   
      name = data[i].name.replace(/ /g,"_");
      data[i].icon = 'http://beta.tvlive.io/' + name + '.png';
    }
    return data;
  }
  $http.get('http://beta.tvlive.io/channels/provider/' + $stateParams.provider).
        success(function(data) {
            $scope.channels = transform(data);
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
  function transform_minutes(minutes){
    if (minutes == 0) {
      return '00'
    }
    return minutes.toString();  
  }
    function transform(data) {
    for (i = 0; i < data.length; i++) {
      if (data[i].series){
        data[i].title = data[i].series.serieTitle;         
        data[i].type = 'Series';
      }

      if (data[i].program){
        data[i].title = data[i].program.title;      
        data[i].type = 'Program';
      } 

      if (data[i].film){
        data[i].title = data[i].film.title;        
        data[i].type = 'Film';
      }

      s = new Date(data[i].start);
      e = new Date(data[i].end);    
      data[i].st = transform_minutes(s.getHours()) + ':' + transform_minutes(s.getMinutes());
      data[i].et = transform_minutes(e.getHours()) + ':' + transform_minutes(e.getMinutes());
       
    }
      return data;
  }

  $http.get('http://beta.tvlive.io/tvcontent/channel/' + $stateParams.channel + '/' + $stateParams.time).
        success(function(data) {
            $scope.tvContents = transform(data);
        });  
})

.controller('CurrentCtrl', function($scope, $stateParams, $http) {
   function transform_minutes(minutes){
    if (minutes == 0) {
      return '00'
    }
    return minutes.toString();  
  }

  function transform(data) {
      if (data.series){
        data.title = data.series.serieTitle;
        data.description = data.series.description;
        data.type = 'Series';        
      }

      if (data.program){
        data.title = data.program.title;
        data.description = data.program.description;
        data.type = 'Program';
      } 

      if (data.film){
        data.title = data.film.title;
        data.description = data.film.description;
        data.type = 'Film';
      }
      s = new Date(data.start);
      e = new Date(data.end);    
      data.st = s.getHours() + ':' + transform_minutes(s.getMinutes());
      data.et = e.getHours() + ':' + transform_minutes(e.getMinutes());
      return data;
  }

  $http.get('http://beta.tvlive.io/tvcontent/channel/' + $stateParams.channel + '/current').
        success(function(data) {
            $scope.details = transform(data);
        });  
  })

.controller('DetailsCtrl', function($scope, $stateParams, $http) {
  function transform_minutes(minutes){
    if (minutes == 0) {
      return '00'
    }
    return minutes.toString();  
  }

  function transform(data) {
      if (data.series){
        data.title = data.series.serieTitle;
        data.description = data.series.description;
        data.type = 'Series';        
      }

      if (data.program){
        data.title = data.program.title;
        data.description = data.program.description;
        data.type = 'Program';
      } 

      if (data.film){
        data.title = data.film.title;
        data.description = data.film.description;
        data.type = 'Film';
      }
      s = new Date(data.start);
      e = new Date(data.end);    
      data.st = transform_minutes(s.getHours()) + ':' + transform_minutes(s.getMinutes());
      data.et = transform_minutes(e.getHours()) + ':' + transform_minutes(e.getMinutes());
      return data;
  }

  $http.get('http://beta.tvlive.io/tvcontent/' + $stateParams.tvContentId).
        success(function(data) {
            $scope.details = transform(data);
        });  
  })

.controller('ContentByTypeToday', function($scope, $stateParams, $http) {
  function transform_minutes(minutes){
    if (minutes == 0) {
      return '00'
    }
    return minutes.toString();  
  }
    function transform(data) {
    for (i = 0; i < data.length; i++) {
      if (data[i].series){
        data[i].title = data[i].series.serieTitle;         
        data[i].type = 'Series';    
      }

      if (data[i].program){
        data[i].title = data[i].program.title;      
        data[i].type = 'Program';    
      } 

      if (data[i].film){
        data[i].title = data[i].film.title;        
        data[i].type = 'Film';    
      }
      s = new Date(data[i].start);
      e = new Date(data[i].end);    
      data[i].st = transform_minutes(s.getHours()) + ':' + transform_minutes(s.getMinutes());
      data[i].et = transform_minutes(e.getHours()) + ':' + transform_minutes(e.getMinutes());
       
    }
      return data;
  }
  
  $http.get('http://beta.tvlive.io/tvcontent/' + $stateParams.type + '/' + $stateParams.provider + '/today').
        success(function(data) {
            $scope.tvContents = transform(data);
        });  
  })


.controller('PlaylistCtrl', function($scope, $stateParams) {
});
