app.controller("mcCtrl", function($scope, $http){
    console.log("in veiwmc ctrl diu");

    $scope.pageSize = 2;
    $scope.currentPage = 1;
    $scope.mcs;
    $scope.user;
    $scope.sort = 'Title';

    $scope.setSort = function(value) {
      $scope.sort = value;
    }

    var refresh = function(){
      $http.get('/getmcs').success(function(response){
          console.log("getmcs");
          console.log(response);
          $scope.mcs = response;

      });
      $http.get('/checkCookie').success(function(response){
          console.log("checkCookie");
          console.log(response);
          $scope.user = response;
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

  $scope.canRemove = function(Creator){
    console.log("can remove?");
    return (Creator == $scope.user);
  };

  function checkForm(){
    console.log("check form");
    $("#mctitle").siblings().css('color', 'black');
    $("#mcdesc").siblings().css('color', 'black');
    $("#mca").siblings().css('color', 'black');
    $("#mcb").siblings().css('color', 'black');
    $("#mcc").siblings().css('color', 'black');
    $("#mcd").siblings().css('color', 'black');
    $("#mcans").siblings().css('color', 'black');

    var valid = true;
    if($("#mctitle").val() == ""){
      valid = false;
      $("#mctitle").siblings().css('color', 'red');
    }
    if($("#mcdesc").val() == ""){
      valid = false;
      $("#mcdesc").siblings().css('color', 'red');
    }
    if($("#mca").val() == ""){
      valid = false;
      $("#mca").siblings().css('color', 'red');
    }
    if($("#mcb").val() == ""){
      valid = false;
      $("#mcb").siblings().css('color', 'red');
    }
    if($("#mcc").val() == ""){
      valid = false;
      $("#mcc").siblings().css('color', 'red');
    }
    if($("#mcd").val() == ""){
      valid = false;
      $("#mcd").siblings().css('color', 'red');
    }
    if($("#mcans").val() == ""){
      valid = false;
      $("#mcans").siblings().css('color', 'red');
    }
    if(!($("#mcans").val() == $("#mca").val()
        || $("#mcans").val() == $("#mcb").val()
        || $("#mcans").val() == $("#mcc").val()
        || $("#mcans").val() == $("#mcd").val())){
      valid = false;
      $("#mcans").siblings().css('color', 'red');
    }
    return valid;
  }

  $scope.addmc = function(){
    console.log("add mc question");
    var data = {
      Creator: $("#mccreator").val(),
      Title: $("#mctitle").val(),
      Description: $("#mcdesc").val(),
      A: $("#mca").val(),
      B: $("#mcb").val(),
      C: $("#mcc").val(),
      D: $("#mcd").val(),
      Answer: $("#mcans").val(),
      Tags: $("#mctag").val()
    };
    if(checkForm()){
      $http.post('/addmc',data).success(function(response){
        console.log(response);
        $("#exampleModal").modal('hide');
        $("#exampleModal").find("input, textarea").val("");
        $("#mccreator").val($scope.user);
        refresh();
      });
    }
    else{
      console.log("cant send");
    }

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
