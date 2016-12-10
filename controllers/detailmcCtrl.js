app.controller("detailmcCtrl", function($scope, $http){
  $scope.mc;
  $scope.isEditing = false;
  $scope.canEdit = false;
  $scope.user;

  var init = function(){
    console.log("init detail ctrl");
    var id = window.location.pathname.slice(1);
    $http.get('/getonemc/'+id).success(function(response){
      console.log(response);
      $scope.mc = response;
      $http.get('/checkCookie').success(function(response){
          console.log("checkCookie");
          console.log(response);
          $scope.user = response;
          if($scope.user == $scope.mc.Creator){
            $scope.canEdit = true;
          }
      });
    });


  };
  init();

  $scope.deleteMC = function(){
    console.log("deleteMC");
    var id = $scope.mc._id;
    $http.delete('/deleteMC/'+id).success(function(response){
      var url = window.location.href;
      url =  url.replace(id,"viewMC");
      console.log(url);
      window.location = url;
    });
  };

  $scope.onEditClick = function(){
    console.log("enable edit");
    $scope.isEditing = true;
  };

  $scope.onCancelClick = function(){
    console.log("disable edit");
    $scope.isEditing = false;
  }
});
