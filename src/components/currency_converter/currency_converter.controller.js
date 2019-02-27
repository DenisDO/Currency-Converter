app.controller('CurrencyController', [
    '$scope',
    'APIservice',
    'feePercantage',
    'defaultFrom',
    'defaultTo',
    'defaultPercantage',
    function($scope, APIservice, feePercantage, defaultFrom, defaultTo, defaultPercantage) {

    this.listOfCurrencies = APIservice.getListOfCurrencies();
    this.defaultFrom = defaultFrom;
    this.defaultTo = defaultTo;
    this.feePercantage = feePercantage;
    this.defaultPercantage = defaultPercantage;

    $scope.$watchGroup(['curCont.defaultFrom', 'curCont.defaultTo'], () => {
        this.updateData();
    });

    $scope.$watchGroup(['curCont.inputToExchange', 'curCont.defaultPercantage'], () => {
        this.toExchange();
    });

    this.toExchange = () => {
        const exchangeValue = APIservice.calcExchangeValue(this.inputToExchange, this.rate, this.defaultPercantage);
        this.inputToGet = +exchangeValue.toFixed(2);
    };

    this.revertExchange = () => {
        [this.defaultFrom, this.defaultTo] = [this.defaultTo, this.defaultFrom];
        [this.inputToExchange, this.inputToGet] = [this.inputToGet, this.inputToExchange];
        this.updateData();
    };

    this.updateData = () => {
        APIservice.getRate(this.defaultFrom, this.defaultTo)
            .then(data => {
                this.rate = data;
                this.toExchange();
            });
    };
}]);
