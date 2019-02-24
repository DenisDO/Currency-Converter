app.constant('baseURL', 'https://free.currencyconverterapi.com/api/v6/');
app.constant('APIkey', '4483a148b31992545c54');
app.constant('commissionPercantage', [0, 2, 5, 10]);

app.service('getListOfCurrencies', ['$http', 'baseURL', 'APIkey', function($http, baseURL, APIkey) {
  this.getData = () => {
    return $http({
      method: 'GET',
      url: `${baseURL}currencies?apiKey=${APIkey}`
    }).then(({data}) => {
        this.listOfCurrencies = data.results;
      return this.listOfCurrencies;
    });
  }
}]);

app.service('calcExchange', [function() {
  this.calcExchangeValue = (value, rate, percentage) => {
    return (value * rate) + (value * rate) / 100 * percentage;
  };
}]);

app.service('getRate', ['$http', 'baseURL', 'APIkey', function($http, baseURL, APIkey) {
  this.getData = (curFrom, curTo) => {
    return $http({
      method: 'GET',
      url: `${baseURL}convert?apiKey=${APIkey}&q=${curFrom}_${curTo}&compact=ultra`
    }).then(({data}) => {
      this.data = data[Object.keys(data)];
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
