app.controller('CurrencyController', [
    'getCurrency',
    'currencies',
    'defaultFrom',
    'defaultTo',
    'commissionPercantage',
    'defaultPercantage',
    function(getCurrency, currencies, defaultFrom, defaultTo, commissionPercantage, defaultPercantage) {

    this.currencies = currencies;
    this.defaultFrom = defaultFrom;
    this.defaultTo = defaultTo;
    this.commissionPercantage = commissionPercantage;
    this.defaultPercantage = defaultPercantage;
    this.method = 'buy';

    getCurrency.getData().then(data => {
        this.data = data;
    });

    this.setMethod = (method) => {
        this.method = method;
        this.exchangeCurrency();
    };

    this.exchangeCurrency = () => {
        const rateToBuy = this.data.find(el => el.ccy === this.defaultFrom)[this.method];
        const rateToSell = this.data.find(el => el.ccy === this.defaultTo)[this.method];
        const exchangeValue = this.inputToExchange * rateToBuy / rateToSell;
        this.inputToGet = +exchangeValue.toFixed(2);
    };

    this.getExchangeCurrency = () => {
        const rateToBuy = this.data.find(el => el.ccy === this.defaultTo)[this.method];
        const rateToSell = this.data.find(el => el.ccy === this.defaultFrom)[this.method];
        const exchangeValue = this.inputToGet * rateToBuy / rateToSell;
        this.inputToExchange = +exchangeValue.toFixed(2);
    };
}]);
