app.filter('excludeFrom', [function() {
  return function(array, expression) {
    return array.filter(function(item) {
        return !expression || !angular.equals(item,expression);
    });
  };
}]);
  