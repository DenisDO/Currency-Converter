app.controller('CurrencyController', [
    '$scope',
    'CurrencyAPIservice',
    'feePercantage',
    'defaultFrom',
    'defaultTo',
    'defaultPercantage',
    function($scope, CurrencyAPIservice, feePercantage, defaultFrom, defaultTo, defaultPercantage) {

    this.listOfCurrencies = null;
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
        const exchangeValue = CurrencyAPIservice.calcExchangeValue(this.inputToExchange, this.rate, this.defaultPercantage);
        this.inputToGet = +exchangeValue.toFixed(2);
    };

    this.revertExchange = () => {
        [this.defaultFrom, this.defaultTo] = [this.defaultTo, this.defaultFrom];
        [this.inputToExchange, this.inputToGet] = [this.inputToGet, this.inputToExchange];
        this.updateData();
    };

    this.updateData = () => {
        CurrencyAPIservice.getRate(this.defaultFrom, this.defaultTo)
            .then(data => {
                this.rate = data;
                this.toExchange();
            });
    };
}]);
