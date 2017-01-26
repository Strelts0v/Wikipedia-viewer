var app = angular.module('WikiApp', []);
app.controller('MainCtrl', function($scope, $http, $timeout) {
  var article= $("#article");
  var search = $("#search");
  
  $scope.results = [];
  
  $scope.search = function() {
    $scope.results = [];
    var title = article.val();
    var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    var cb = '&callback=JSON_CALLBACK';
    var page = 'https://en.wikipedia.org/?curid=';
    
    $http.jsonp(api + title + cb)
    .success(function(data) {
      var results = data.query.pages;
      angular.forEach(results, function(v)  {
        $scope.results.push({title: v.title, body: v.extract, page: page + v.pageid})
      })
    });
  }
});