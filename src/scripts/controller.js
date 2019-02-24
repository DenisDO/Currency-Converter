app.controller('CurrencyController', [
    'getRate',
    'getListOfCurrencies',
    'calcExchange',
    'commissionPercantage',
    function(getRate, getListOfCurrencies, calcExchange, commissionPercantage) {

    this.listOfCurrencies = getListOfCurrencies.getData();
    this.defaultFrom = 'EUR';
    this.defaultTo = 'UAH';
    this.commissionPercantage = commissionPercantage;
    this.defaultPercantage = 0;

    this.toExchange = () => {
        const exchangeValue = calcExchange.calcExchangeValue(this.inputToExchange, this.rate, this.defaultPercantage);
        this.inputToGet = +exchangeValue.toFixed(2);
    };

    this.toGet = () => {
        const exchangeValue = calcExchange.calcExchangeValue(this.inputToGet, this.rate, this.defaultPercantage);
        this.inputToExchange = +exchangeValue.toFixed(2);
    };

    this.revertExchange = () => {
        [this.defaultFrom, this.defaultTo] = [this.defaultTo, this.defaultFrom];
        [this.inputToExchange, this.inputToGet] = [this.inputToGet, this.inputToExchange];
        this.updateData();
    };

    this.updatePercentage = () => {
        const exchangeValue = calcExchange.calcExchangeValue(this.inputToExchange, this.rate, this.defaultPercantage);
        this.inputToGet = +exchangeValue.toFixed(2);
    };

    this.updateData = () => {
        getRate.getData(this.defaultFrom, this.defaultTo)
            .then(data => {
                this.rate = data;
            })
            .then(() => {
                this.toExchange();
            });
    };

    this.updateData();
}]);
