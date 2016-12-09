app.controller("detailmcCtrl", function($scope, $http){
  $scope.mc;
  var init = function(){
    console.log("init detail ctrl");
    var id = window.location.pathname.slice(1);
    $http.get('/getonemc/'+id).success(function(response){
      console.log(response);
      $scope.mc = response;
    });
  };
  init();
});
