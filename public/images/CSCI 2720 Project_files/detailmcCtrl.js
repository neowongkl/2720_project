app.controller("detailmcCtrl", function($scope, $http){
  $scope.mc;
  $scope.isEditing = false;
  $scope.canEdit = false;
  $scope.user;

  var init = function(){
    console.log("init detail ctrl");
    var id = window.location.pathname.slice(1);
    $http.get('/getonemc/'+id).success(function(response){
      console.log("response");
      console.log(response);
      if(response == ""){
        alert("NO SUCH MC");
        var url = window.location.href;
        url =  url.replace(id,"viewMC");
        console.log(url);
        window.location = url;
      }
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
    var id = $scope.mc._id;

    $http.get('/getonemc/'+id).success(function(response){
      console.log("response");
      console.log(response);
      if(response == null){
        alert("NO SUCH MC");
        var url = window.location.href;
        url =  url.replace(id,"viewMC");
        console.log(url);
        window.location = url;
      }
      else{
        $scope.isEditing = true;
      }
    });


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

  function whitelist(tagWhitelist, html) {
    html = String(html).replace(/\[/g, '&#91;');

    var tags = [];
    html = html.replace(
      /<!--[\s\S]*?-->|<(\/?)([a-z]\w*)(?:[^"'>]|"[^"]*"|'[^']*')*>/g,
      function (_, close, tagName) {
        if (tagName) {
          tagName = tagName.toLowerCase();
          if (tagWhitelist.hasOwnProperty(tagName) && tagWhitelist[tagName]) {
            var index = tags.length;
            tags.push('<' + (close || '') + tagName + '>');
            return '[' + index + ']';
          }
        }
        return '';
      });

    html = html.replace(/[<>"'@\`\u0000]/g,
      function (c) {
        switch (c) {
          case '<': return '&lt;';
          case '>': return '&gt;';
          case '"': return '&quot;';
          case '\'': return '&#39;';
          case '@': return '&#64;';
        }
        return '&#' + c.charCodeAt(0) + ';';
      });
    if (html.indexOf('<') >= 0) { throw new Error(); }

    var open = [];
    for (var i = 0, n = tags.length; i < n; ++i) {
      var tag = tags[i];
      if (tag.charAt(1) === '/') {
        var idx = open.lastIndexOf(tag);
        if (idx < 0) { tags[i] = ""; }  // Drop close tag.
        else {
          tags[i] = open.slice(idx).reverse().join('');
          open.length = idx;
        }
      } else if (!HTML5_VOID_ELEMENTS.test(tag)) {
        open.push('</' + tag.substring(1));
      }
    }

    html = html.replace(
         /\[(\d+)\]/g, function (_, index) { return tags[index]; });


    return html + open.reverse().join('');
  }

  var HTML5_VOID_ELEMENTS = new RegExp(
       '^<(?:area|base|br|col|command|embed|hr|img|input'
       + '|keygen|link|meta|param|source|track|wbr)\\b');

  $scope.updateMC = function(){
    console.log("update mc");

    var id = $scope.mc._id;

    var str = whitelist({ p: true, u: true, i: true, b:true, pre:true, br: true, img: true, src:true}, $("#mcdesc").val());

    var data = {
      Creator: $scope.mc.Creator,
      Title: $("#mctitle").val(),
      Description: str,
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
