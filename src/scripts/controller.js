app.controller('CurrencyController', [
    'getCurrency',
    'getListOfCurrencies',
    'defaultFrom',
    'defaultTo',
    'calcExchange',
    'commissionPercantage',
    'defaultPercantage',
    function(getCurrency, getListOfCurrencies, defaultFrom, defaultTo, calcExchange, commissionPercantage, defaultPercantage) {

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
                const exchangeValue = calcExchange.calcExchangeValue(this.inputToExchange, this.rate, this.defaultPercantage);
                this.inputToGet = +exchangeValue.toFixed(2);
            });
    };

    this.toGet = () => {
        getCurrency.getData(this.defaultTo, this.defaultFrom)
            .then(data => {
                this.rate = data;
            })
            .then(() => {
                const exchangeValue = calcExchange.calcExchangeValue(this.inputToGet, this.rate, this.defaultPercantage);
                this.inputToExchange = +exchangeValue.toFixed(2);
            });
    }

    this.revertExchange = () => {
        [this.defaultFrom, this.defaultTo] = [this.defaultTo, this.defaultFrom];
        [this.inputToExchange, this.inputToGet] = [this.inputToGet, this.inputToExchange];
        getCurrency.getData(this.defaultFrom, this.defaultTo)
        .then(data => {
            this.rate = data;
        });
    }

    this.updatePercentage = () => {
        const exchangeValue = calcExchange.calcExchangeValue(this.inputToExchange, this.rate, this.defaultPercantage);
        this.inputToGet = +exchangeValue.toFixed(2);
    }
}]);
