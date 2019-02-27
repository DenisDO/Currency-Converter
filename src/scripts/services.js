app.value('feePercantage', [0, 2, 5, 10]);
app.value('defaultFrom', 'EUR');
app.value('defaultTo', 'UAH');
app.value('defaultPercantage', 0);

app.provider('APIservice', function() {

  let baseURL = '';
  let APIkey = '';

  this.setURL = url => baseURL = url;
  this.setKey = key => APIkey = key;
  
  this.$get = ['$http', function($http) {
    return {
      getListOfCurrencies: () => {
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
      },
    
      getRate: (curFrom, curTo) => {
        return $http({
          method: 'GET',
          url: `${baseURL}convert?apiKey=${APIkey}&q=${curFrom}_${curTo}&compact=ultra`
        }).then(({data}) => {
          const [key] = Object.keys(data);
          return data[key];
        });
      },
      
      calcExchangeValue: (value, rate, percentage) => {
        return (value * rate) - (value * rate) / 100 * percentage;
      }
    };
  }];
});
