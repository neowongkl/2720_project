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

  $scope.updateMC = function(){
    console.log("update mc");

    var id = $scope.mc._id;

    var data = {
      Creator: $scope.mc.Creator,
      Title: $("#mctitle").val(),
      Description: $("#mcdesc").val(),
      A: $("#mca").val(),
      B: $("#mcb").val(),
      C: $("#mcc").val(),
      D: $("#mcd").val(),
      Answer: $("#mcans").val(),
      Tags: $("#mctag").val()
    };

    console.log(data);
    if(checkForm()){
      $http.post('/updateMC/'+id,data).success(function(response){
        console.log(response);
        $scope.isEditing = false;
        $scope.canEdit = false;
        init();
      });
    }
    else{
      console.log("cant send");
    }
  };
});
