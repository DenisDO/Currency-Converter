const app = angular.module('currencyApp', []);

app.constant('baseURL', 'https://free.currencyconverterapi.com/api/v6/');
app.constant('APIkey', '4483a148b31992545c54');
app.constant('defaultFrom', 'EUR');
app.constant('defaultTo', 'UAH');
app.constant('commissionPercantage', [0, 2, 5, 10]);
app.constant('defaultPercantage', 0);

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

app.service('getCurrency', ['$http', 'baseURL', 'APIkey', function($http, baseURL, APIkey) {
  this.getData = (curFrom, curTo) => {
    return $http({
      method: 'GET',
      url: `${baseURL}convert?apiKey=${APIkey}&q=${curFrom}_${curTo}&compact=ultra`
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

app.controller('CurrencyController', [
    'getCurrency',
    'getListOfCurrencies',
    'defaultFrom',
    'defaultTo',
    'commissionPercantage',
    'defaultPercantage',
    function(getCurrency, getListOfCurrencies, defaultFrom, defaultTo, commissionPercantage, defaultPercantage) {

    this.defaultFrom = defaultFrom;
    this.defaultTo = defaultTo;
    this.commissionPercantage = commissionPercantage;
    this.defaultPercantage = defaultPercantage;
    this.listOfCurrencies = [];

    getListOfCurrencies.getData().then(data => {
        for (const key in data) {
            this.listOfCurrencies.push(data[key].id);
        };
    });

    this.toExchange = () => {
        getCurrency.getData(this.defaultFrom, this.defaultTo)
            .then(data => {
                this.rate = data;
            })
            .then(() => {
                this.inputToGet = this.inputToExchange * this.rate;
            });
    };

    this.toGet = () => {
        getCurrency.getData(this.defaultTo, this.defaultFrom)
            .then(data => {
                this.rate = data;
            })
            .then(() => {
                this.inputToExchange = this.inputToGet * this.rate;
            });
    }
}]);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJzZXJ2aWNlcy5qcyIsImNvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnY3VycmVuY3lBcHAnLCBbXSk7XHJcbiIsImFwcC5jb25zdGFudCgnYmFzZVVSTCcsICdodHRwczovL2ZyZWUuY3VycmVuY3ljb252ZXJ0ZXJhcGkuY29tL2FwaS92Ni8nKTtcclxuYXBwLmNvbnN0YW50KCdBUElrZXknLCAnNDQ4M2ExNDhiMzE5OTI1NDVjNTQnKTtcclxuYXBwLmNvbnN0YW50KCdkZWZhdWx0RnJvbScsICdFVVInKTtcclxuYXBwLmNvbnN0YW50KCdkZWZhdWx0VG8nLCAnVUFIJyk7XHJcbmFwcC5jb25zdGFudCgnY29tbWlzc2lvblBlcmNhbnRhZ2UnLCBbMCwgMiwgNSwgMTBdKTtcclxuYXBwLmNvbnN0YW50KCdkZWZhdWx0UGVyY2FudGFnZScsIDApO1xyXG5cclxuYXBwLnNlcnZpY2UoJ2dldExpc3RPZkN1cnJlbmNpZXMnLCBbJyRodHRwJywgJ2Jhc2VVUkwnLCAnQVBJa2V5JywgZnVuY3Rpb24oJGh0dHAsIGJhc2VVUkwsIEFQSWtleSkge1xyXG4gIHRoaXMuZ2V0RGF0YSA9ICgpID0+IHtcclxuICAgIHJldHVybiAkaHR0cCh7XHJcbiAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgIHVybDogYCR7YmFzZVVSTH1jdXJyZW5jaWVzP2FwaUtleT0ke0FQSWtleX1gXHJcbiAgICB9KS50aGVuKCh7ZGF0YX0pID0+IHtcclxuICAgICAgICB0aGlzLmxpc3RPZkN1cnJlbmNpZXMgPSBkYXRhLnJlc3VsdHM7XHJcbiAgICAgIHJldHVybiB0aGlzLmxpc3RPZkN1cnJlbmNpZXM7XHJcbiAgICB9KTtcclxuICB9XHJcbn1dKTtcclxuXHJcbmFwcC5zZXJ2aWNlKCdnZXRDdXJyZW5jeScsIFsnJGh0dHAnLCAnYmFzZVVSTCcsICdBUElrZXknLCBmdW5jdGlvbigkaHR0cCwgYmFzZVVSTCwgQVBJa2V5KSB7XHJcbiAgdGhpcy5nZXREYXRhID0gKGN1ckZyb20sIGN1clRvKSA9PiB7XHJcbiAgICByZXR1cm4gJGh0dHAoe1xyXG4gICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICB1cmw6IGAke2Jhc2VVUkx9Y29udmVydD9hcGlLZXk9JHtBUElrZXl9JnE9JHtjdXJGcm9tfV8ke2N1clRvfSZjb21wYWN0PXVsdHJhYFxyXG4gICAgfSkudGhlbigoe2RhdGF9KSA9PiB7XHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YVxyXG4gICAgICByZXR1cm4gdGhpcy5kYXRhO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XSk7XHJcblxyXG5hcHAuZmlsdGVyKCdleGNsdWRlRnJvbScsW2Z1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uKGFycmF5LGV4cHJlc3Npb24sY29tcGFyYXRvcil7XHJcbiAgICAgIHJldHVybiBhcnJheS5maWx0ZXIoZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgICAgICByZXR1cm4gIWV4cHJlc3Npb24gfHwgIWFuZ3VsYXIuZXF1YWxzKGl0ZW0sZXhwcmVzc2lvbik7XHJcbiAgICAgIH0pO1xyXG4gIH07XHJcbn1dKTtcclxuIiwiYXBwLmNvbnRyb2xsZXIoJ0N1cnJlbmN5Q29udHJvbGxlcicsIFtcclxuICAgICdnZXRDdXJyZW5jeScsXHJcbiAgICAnZ2V0TGlzdE9mQ3VycmVuY2llcycsXHJcbiAgICAnZGVmYXVsdEZyb20nLFxyXG4gICAgJ2RlZmF1bHRUbycsXHJcbiAgICAnY29tbWlzc2lvblBlcmNhbnRhZ2UnLFxyXG4gICAgJ2RlZmF1bHRQZXJjYW50YWdlJyxcclxuICAgIGZ1bmN0aW9uKGdldEN1cnJlbmN5LCBnZXRMaXN0T2ZDdXJyZW5jaWVzLCBkZWZhdWx0RnJvbSwgZGVmYXVsdFRvLCBjb21taXNzaW9uUGVyY2FudGFnZSwgZGVmYXVsdFBlcmNhbnRhZ2UpIHtcclxuXHJcbiAgICB0aGlzLmRlZmF1bHRGcm9tID0gZGVmYXVsdEZyb207XHJcbiAgICB0aGlzLmRlZmF1bHRUbyA9IGRlZmF1bHRUbztcclxuICAgIHRoaXMuY29tbWlzc2lvblBlcmNhbnRhZ2UgPSBjb21taXNzaW9uUGVyY2FudGFnZTtcclxuICAgIHRoaXMuZGVmYXVsdFBlcmNhbnRhZ2UgPSBkZWZhdWx0UGVyY2FudGFnZTtcclxuICAgIHRoaXMubGlzdE9mQ3VycmVuY2llcyA9IFtdO1xyXG5cclxuICAgIGdldExpc3RPZkN1cnJlbmNpZXMuZ2V0RGF0YSgpLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RPZkN1cnJlbmNpZXMucHVzaChkYXRhW2tleV0uaWQpO1xyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnRvRXhjaGFuZ2UgPSAoKSA9PiB7XHJcbiAgICAgICAgZ2V0Q3VycmVuY3kuZ2V0RGF0YSh0aGlzLmRlZmF1bHRGcm9tLCB0aGlzLmRlZmF1bHRUbylcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJhdGUgPSBkYXRhO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0VG9HZXQgPSB0aGlzLmlucHV0VG9FeGNoYW5nZSAqIHRoaXMucmF0ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMudG9HZXQgPSAoKSA9PiB7XHJcbiAgICAgICAgZ2V0Q3VycmVuY3kuZ2V0RGF0YSh0aGlzLmRlZmF1bHRUbywgdGhpcy5kZWZhdWx0RnJvbSlcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJhdGUgPSBkYXRhO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0VG9FeGNoYW5nZSA9IHRoaXMuaW5wdXRUb0dldCAqIHRoaXMucmF0ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1dKTtcclxuIl19
