var aminoHunt = angular.module('aminoHunt', ['ui.router','ngResource']);


aminoHunt.config(function($stateProvider, $urlRouterProvider,$httpProvider,$locationProvider) {


  $urlRouterProvider.otherwise('/home');
  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: '/pages/home.html',
    controller: 'mainCtrl',
    controllerAs: 'main'
  })
  .state('results', {
    url: '/Results',
    templateUrl: '/pages/results.html',
    controller: 'mainCtrl',
    controllerAs: 'main'
  })
  // $locationProvider.html5Mode(true);

});

aminoHunt.controller('mainCtrl',['$scope','$http','data','$state',function($scope,$http,data,$state){
  $scope.search = ""
  function getData(){
    $http.get("http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=protein&&retmax=10&retmode=json&term=" + $scope.search + "&field=title")
      .then(function(response){ $scope.details = response.data;
        $scope.details.esearchresult.idlist.reduce(function(list,item){return list.concat(item)});

        console.log($scope.details.esearchresult.idlist);

      });
  }
  function getLink(){


      var article = {}
    $http.get("http://eutils.ncbi.nlm.nih.gov/entrez/eutils/elink.fcgi?dbfrom=protein&retmode=json&id=" + $scope.details.esearchresult.idlist + "&cmd=prlinks")
    .then(function(response){
      //console.log(response)
      var links = response;
      $scope.collectionOfArticles = response;
      console.log($scope.collectionOfArticles);
    });
    $http.get("http://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=protein&retmode=json&rettype=abstract&id="+$scope.details.esearchresult.idlist)
    .then(function(response){


     console.log(response)
    })



  }

  function getAutoComplete(){
    //  var invocation = new XMLHttpRequest();
      var url = "http://blast.ncbi.nlm.nih.gov/portal/utils/autocomp.fcgi?dict=taxids_sg&q=";
      // if($scope.search) {
      //   invocation.open('GET', url+$scope.search, true);
      //   //invocation.onreadystatechange = handler;
      //   invocation.send();
      // }
     $http.get("http://blast.ncbi.nlm.nih.gov/portal/utils/autocomp.fcgi?dict=taxids_sg&q="+ $scope.search)
    .then(function(response){
      console.log(response)
      return false;
    });
  }
  function parseFasta(){
    var parseFasta = {};
    var tempFasta = $scope.fasta.split("\n");
    //console.log(tempFasta[0])
    parseFasta.name = tempFasta[0];
    parseFasta.sequence = tempFasta.slice(1,-1).join('');
    //console.log(parseFasta)
    return parseFasta
  }
  $scope.findArticles = function(){
   //getData();
   //getLink();
  //getAutoComplete();
    var d = $scope.search

    data.get({data:$scope.query}).$promise.then(function (result) {

     $scope.aligned = result;
     console.log($scope.aligned)
    //  $state.go('results')
   });
  //  $scope.$watch(
  //                  "algined",
  //                  function handleFooChange() {
  //                     $state.go('results')
  //                  }
  //              );

  console.log($scope.search)
  //parseFasta();
};



}]);
