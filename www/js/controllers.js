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

.controller('LoginCtrl', function($scope,FacebookSrv){
  $scope.doLogin = function(){
    console.log("doLogin");
    FacebookSrv.login();
  }
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})


.controller('BrowserCtrl',  function($scope,FacebookSrv,$ionicLoading,$state){
  console.log('BrowserCtrl');
  $scope.vm = {};
  // var deferred = $q.defer();
  var fields = {
      'fields': 'full_picture,likes,description,comments,from,story,message,name,created_time'
  };
  loadMessages();
  function loadMessages(){
    $ionicLoading.show({
                template: '<i class="icon ion-loading-c" style="font-size:40px;"></i>',
                animation: 'fade-in',
                showBackdrop: true
            });
    FacebookSrv.get('/me/home', fields).then(
      function success(res) {
        $scope.vm = res.data.data;
        $ionicLoading.hide();
        $scope.$broadcast('scroll.refreshComplete');
        //$ionicBackdrop.release();
    },
    function error(err){
      $ionicLoading.hide();
      $state.go('login');
    });
  }

    $scope.refrash = function(){
      loadMessages();
    }

})

.controller('ItemCtrl',  function($scope,FacebookSrv,$ionicLoading,$state,$stateParams){
  console.log('ItemCtrl');
  $scope.item = {};
  // var deferred = $q.defer();
  
  loadMessages();
  function loadMessages(){
    $ionicLoading.show({
                template: '<i class="icon ion-loading-c" style="font-size:40px;"></i>',
                animation: 'fade-in',
                showBackdrop: true
            });
    FacebookSrv.get('/'+$stateParams.index).then(
      function success(res) {
        $scope.item = res.data;
        $ionicLoading.hide();
        $scope.$broadcast('scroll.refreshComplete');
        //$ionicBackdrop.release();
    },
    function error(err){
      $ionicLoading.hide();
      $state.go('login');
    });
  }

    $scope.refrash = function(){
      loadMessages();
    }

})
.controller('PublishCtrl',  function($scope,FacebookSrv){
  console.log("PublishCtrl");

  $scope.postMsg = function(){
    console.log($scope.$$childTail.msg);
    var params = {message:""+$scope.$$childTail.msg};
    FacebookSrv.post('/me/feed',params).then(
      function success(res){
          $scope.response = "Success";
      },
      function error(err){
          $scope.response = "Failed "+err;
      })
  }
  
})
