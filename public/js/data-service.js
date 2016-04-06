aminoHunt.factory("data", ["$resource", function($resource) {
  return $resource("/python",{data:'@data'},{
    'get': {
      method: 'GET',
      isArray:true
    }

  });
}]);
