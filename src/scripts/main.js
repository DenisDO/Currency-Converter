const app = angular.module('currencyApp', []);

app
.config(['APIserviceProvider', function(APIserviceProvider) {
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