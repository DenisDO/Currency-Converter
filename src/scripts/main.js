const app = angular.module('currencyApp', ['ui.router']);

app
.config(['APIserviceProvider', '$stateProvider', function(APIserviceProvider, $stateProvider) {
    
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
            component: 'currencyConverter'
        })
        .state({
            name: 'currencies',
            url: '/currencies',
            component: 'aboutPage'
        });
    
    APIserviceProvider.setURL('https://free.currencyconverterapi.com/api/v6/');
    APIserviceProvider.setKey('4483a148b31992545c54');
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