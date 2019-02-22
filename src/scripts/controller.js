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
