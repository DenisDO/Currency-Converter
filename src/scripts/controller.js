app.controller('CurrencyController', [
    'getRate',
    'getListOfCurrencies',
    'calcExchange',
    'commissionPercantage',
    function(getRate, getListOfCurrencies, calcExchange, commissionPercantage) {

    this.defaultFrom = 'EUR';
    this.defaultTo = 'UAH';
    this.inputToExchange = 0;
    this.inputToGet = 0;
    this.commissionPercantage = commissionPercantage;
    this.defaultPercantage = 0;
    this.listOfCurrencies = [];

    getListOfCurrencies.getData().then(data => {
        for (const key in data) {
            this.listOfCurrencies.push(data[key].id);
        };
    });

    this.toExchange = () => {
        getRate.getData(this.defaultFrom, this.defaultTo)
            .then(data => {
                this.rate = data;
            })
            .then(() => {
                const exchangeValue = calcExchange.calcExchangeValue(this.inputToExchange, this.rate, this.defaultPercantage);
                this.inputToGet = +exchangeValue.toFixed(2);
            });
    };

    this.toGet = () => {
        getRate.getData(this.defaultTo, this.defaultFrom)
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
        getRate.getData(this.defaultFrom, this.defaultTo)
        .then(data => {
            this.rate = data;
        });
    }

    this.updatePercentage = () => {
        const exchangeValue = calcExchange.calcExchangeValue(this.inputToExchange, this.rate, this.defaultPercantage);
        this.inputToGet = +exchangeValue.toFixed(2);
    }
}]);
