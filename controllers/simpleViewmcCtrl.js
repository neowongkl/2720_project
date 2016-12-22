app.controller("mcCtrl", function($scope, $http){
    console.log("in veiwmc ctrl diu");

    $scope.pageSize = 2;
    $scope.currentPage = 1;
    $scope.mcs;
    $scope.user;
    $scope.sort = 'Title';
    $scope.csv = [];

    var setSort = function(value) {
      console.log(value);
      $scope.sort = value;
      refresh();
    }

    $('ul.select-clone li').click(function() {
      console.log("hihi");
      setSort($(this).attr('data-value'));
    })

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

  function addMCById(id){
    var mcs = $scope.mcs;
    for(var i = 0 ; i < mcs.length ; i++){
      if(mcs[i]._id === id){
        return mcs[i];
      }
    }
  };

  function delMCById(id){
    var csv = $scope.csv;
    for(var i = 0 ; i < csv.length ; i++){
      if(csv[i]._id === id){
        return i;
      }
    }
    return -1;
  }

  $scope.addCSV = function(id){
    console.log("add csv");
    console.log(id);
    var temp;
    if( (temp = delMCById(id)) != -1){
      $scope.scv = $scope.csv.splice(temp,1);
    }
    else{
      var temp = addMCById(id);
      $scope.csv.push(temp);
    }

    console.log($scope.csv);

  };

  $scope.boxChecked = function(id){
    console.log("box checked");
    if( (temp = delMCById(id)) != -1){
      return true;
    }
    else{
      return false;
    }

  };

  $scope.filename = "test";
  $scope.getcsv = function(){
    console.log("get csv");
    for(var i = 0 ; i < $scope.csv.length; i++){
      delete $scope.csv[i].__v;
    }
    return $scope.csv;
  };
  $scope.getHeader = function (){
    return ["QuestionID", "Title", "Description",
            "A", "B", "C", "D",
            "Answer", "Creator", "LMT",
            "Tags"
            ]
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
