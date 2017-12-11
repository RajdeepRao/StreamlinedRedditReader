var redditReader = angular.module('redditReader', []);

redditReader.controller('Fetcher', function($scope, $http) {
  var content, statusCode, statusText, category;
  //$http.get("https://www.reddit.com/r/news/new.json?sort=new")

  $http.get("http://www.reddit.com/r/news/search.json?restrict_sr=on&sort=top")
    .then(function(response) {
        content = response.data;
        statusCode = response.status;
        statusText = response.statusText;
        var children = content["data"]["children"];
        var articles = [];
        children.forEach(function(child){
          var obj = {'Title': child["data"]["title"], 'URL': child["data"]["url"], "Category": "News" };
          console.log(obj);
          articles.push(obj);
        });
        $scope.categories=[{"Category":"News", "Articles":articles}];
    }, function(response) {
        //Second function handles error
        alert("Oops...Something went wrong");
        $scope.content = "Oops...Something went wrong";
    });
  $scope.addCategory = function(searchString){
    console.log(searchString);

    $http.get("http://www.reddit.com/r/"+searchString+"/search.json?restrict_sr=on&sort=top")
      .then(function(response) {
          content = response.data;
          statusCode = response.status;
          statusText = response.statusText;
          var children = content["data"]["children"];
          var articles = [];
          children.forEach(function(child){
            var obj = {'Title': child["data"]["title"], 'URL': child["data"]["url"], "Category": searchString };
            console.log(obj);
            articles.push(obj);
          });
          var obj2 = {"Category":searchString, "Articles":articles};
          $scope.categories.push(obj2);
          alert("Loaded "+searchString);
      }, function(response) {
          //Second function handles error
          alert("Oops...Something went wrong");
      });
  }
  $scope.delCategory = function(categoryToDelete){
      console.log(categoryToDelete);
      $scope.categories.splice( $scope.categories.indexOf(categoryToDelete), 1 );
      alert("Deleted "+categoryToDelete);
  }



});
