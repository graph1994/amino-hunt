var aminoHunt = angular.module('aminoHunt', ['ui.router']);


aminoHunt.config(function($stateProvider, $urlRouterProvider,$httpProvider) {
  $urlRouterProvider.otherwise('/home');
  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: '/pages/home.html',
    controller: 'mainCtrl',
    controllerAs: 'main'
  })


});

aminoHunt.controller('mainCtrl',['$scope','$http',function($scope,$http){
  function getData(){
    $http.get("http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&term=" + $scope.search + "[All%20Fields]")
      .then(function(response){ $scope.details = response.data;
        $scope.details.esearchresult.idlist.reduce(function(list,item){return list.concat(item)});

        console.log($scope.details.esearchresult.idlist);
        $http.get("http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&rettype=abstract&id="+$scope.details.esearchresult.idlist)
        .then(function(response){
          console.log(response);
        })
      });
  }
  $scope.$watch('search', function() {
  getData();
});



}]);
