var headerApp = angular.module("buildHeader",[]);

headerApp.controller("headerCtrl", function($scope, $http){
  console.log("headerCtrl");
  $scope.userid = "";
  $scope.login = false;

  var init = function(){
    console.log("init header");
    $http.get("/checkCookie")
      .success(function(userid){
        console.log("check cookie ok")
        console.log(userid);
        if( userid != null){
          $scope.userid = userid;
          $scope.login = true;
        }
      });
  };

  init();

  $scope.singIn = function(){
    console.log("sing in");
    console.log($scope.userData);
    $http.post("/login", $scope.userData)
      .success(function(userid){
        console.log("login OK");
        console.log(userid)
        if (userid != null){
          $scope.userid = userid;
          $scope.login = true;
        }

      })
      .error(function(){
        console.log("login fail");
        $scope.login = false;
        $scope.userid = "";
      });
  };
});
