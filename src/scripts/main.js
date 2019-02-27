const app = angular.module('currencyApp', []);

app
.config(['APIserviceProvider', function(APIserviceProvider) {
    APIserviceProvider.setURL('https://free.currencyconverterapi.com/api/v6/');
    APIserviceProvider.setKey('4483a148b31992545c54');
}])
.run([function() {
    console.log(navigator.onLine);
}]);