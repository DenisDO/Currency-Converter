app.constant('baseURL', 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5');
app.constant('currencies', ['USD', 'EUR', 'RUR']);
app.constant('defaultFrom', 'EUR');
app.constant('defaultTo', 'RUR');
app.constant('commissionPercantage', ['0%', '2%', '5%', '10%']);
app.constant('defaultPercantage', '0%');

app.service('getCurrency', ['$http', 'baseURL', function($http, baseURL) {
  this.getData = () => {
    return $http({
      method: 'GET',
      url: baseURL
    }).then(({data}) => {
        this.data = data
      return this.data;
    });
  }
}]);

app.filter('excludeFrom',[function(){
  return function(array,expression,comparator){
      return array.filter(function(item){
          return !expression || !angular.equals(item,expression);
      });
  };
}]);
