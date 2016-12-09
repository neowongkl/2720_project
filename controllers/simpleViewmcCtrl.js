app.controller("mcCtrl", function($scope, $http){
    console.log("in veiwmc ctrl diu");

    $scope.pageSize = 2;
    $scope.currentPage = 1;
    $scope.mcs;

    var refresh = function(){
      $http.get('/getmc').success(function(response){
          console.log("getmc");
          console.log(response);
          $scope.mcs = response;
      });
    };

    refresh();

    $scope.pageChanged = function() {
      var startPos = ($scope.page - 1) * 3;
      //$scope.displayItems = $scope.totalItems.slice(startPos, startPos + 3);
      console.log($scope.page);
  };

  //private
  $scope.remove = function(id) {
    console.log(id);
    $http.delete('/delete/'+id).success(function(response){
      console.log(response);
      refresh();
    });
  };

});

app.filter('startForm', function() {
  return function(input, start) {
    if(input) {
        start = +start; //parse to int
        return input.slice(start);
    }
    return [];
  }
});
