app.value('baseURL', 'https://free.currencyconverterapi.com/api/v6/');
app.value('APIkey', '4483a148b31992545c54');
app.value('feePercantage', [0, 2, 5, 10]);
app.value('defaultFrom', 'EUR');
app.value('defaultTo', 'UAH');
app.value('defaultPercantage', 0);

app.service('APIservice', ['$http', 'baseURL', 'APIkey', function($http, baseURL, APIkey) {
  this.getListOfCurrencies = () => {
    const listOfCurrencies = [];

    $http({
      method: 'GET',
      url: `${baseURL}currencies?apiKey=${APIkey}`
    }).then(({data}) => {
        const currencues = data.results;
        
        for (const key in currencues) {
          listOfCurrencies.push(currencues[key].id);
        };
    });

    return listOfCurrencies;
  }

  this.getRate = (curFrom, curTo) => {
    return $http({
      method: 'GET',
      url: `${baseURL}convert?apiKey=${APIkey}&q=${curFrom}_${curTo}&compact=ultra`
    }).then(({data}) => {
      const [key] = Object.keys(data);
      return data[key];
    });
  }
  
  this.calcExchangeValue = (value, rate, percentage) => {
    return (value * rate) - (value * rate) / 100 * percentage;
  };
}]);
