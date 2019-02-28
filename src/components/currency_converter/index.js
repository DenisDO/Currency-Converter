app.component('currencyConverter', {
    bindings: { currenciesCodes: '<' },
    templateUrl: '../templates/currency_converter/currencyConverter.template.html',
    controller: 'CurrencyController'
});
