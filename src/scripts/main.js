const app = angular.module('currencyApp', ['ui.router']);

app
.config(['CurrencyAPIserviceProvider', '$stateProvider', function(CurrencyAPIserviceProvider, $stateProvider) {

    CurrencyAPIserviceProvider.setURL('https://free.currencyconverterapi.com/api/v6/');
    CurrencyAPIserviceProvider.setKey('4483a148b31992545c54');
    // CurrencyAPIserviceProvider.setKey('fab31dd780a0e3451d8a');
    
    $stateProvider
        .state({
            name: 'root',
            url: '/',
        })
        .state({
            name: 'home',
            url: '/home',
            component: 'homePage'
        })
        .state({
            name: 'converter',
            url: '/converter',
            component: 'currencyConverter',
            resolve: {
                currenciesCodes: function(CurrencyAPIservice) {
                    return CurrencyAPIservice.getListOfCurrencies()
                        .then(data => {
                            return CurrencyAPIservice.getCurrenciesCodes(data);
                        });
                }
            }
        })
        .state({
            name: 'currencies',
            url: '/currencies',
            component: 'currenciesPage',
            resolve: {
                currencies: function(CurrencyAPIservice) {
                    return CurrencyAPIservice.getListOfCurrencies();
                }
            }
        });
}])
.run(['$window', '$rootScope', function($window, $rootScope) {
    $rootScope.internetStatus = navigator.onLine;

    $window.addEventListener("offline", function () {
        $rootScope.$applyAsync(() => $rootScope.internetStatus = false);
    });

    $window.addEventListener("online", function () {
      $rootScope.$applyAsync(() => $rootScope.internetStatus = true);
    });
}]);
