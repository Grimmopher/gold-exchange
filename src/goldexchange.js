// Exchanges original 5e gold values to new standard
// Rate should be a number, eg a 50:1 exchange rate should be 1/50
// oldCurrency and newCurrency are arrays of objects contining
// the symbol and base value of each coin ex:
// 1p = 1000c and 1g = 100c, ie: [ {symbol: 'p', value: 1000}, {symbol: 'g', value: 100} ]
// Rate defaults to 10:1 to convert to a silver standard 
// oldCurrency and newCurrency default to 5e coin types, ie: p, g, e, s, c
class Exchanger {
    constructor({rate, oldCurrency, newCurrency} = {}) {
        this.convertToCopper = this.convertToBase.bind(this);
        this.convertToCoins = this.convertToCoins.bind(this);
        this.exchange = this.exchange.bind(this);

        let defaultRate = 1/10;
        let defaultCurrency = [
            {symbol: 'p', value: 1000},
            {symbol: 'g', value: 100},
            {symbol: 'e', value: 50},
            {symbol: 's', value: 10},
            {symbol: 'c', value: 1}
        ]       

        this.newCurrency = newCurrency === undefined ? defaultCurrency : newCurrency.sort( (a, b) => b.value - a.value );
        this.oldCurrency = oldCurrency === undefined ? defaultCurrency : oldCurrency.sort( (a, b) => b.value - a.value );
        this.rate = rate === undefined ? defaultRate : rate;
    };

    convertToBase(oldCoins) {
        return oldCoins.reduce( (total, oldCoin) => {
            this.oldCurrency.forEach( (coin) => {
                if (oldCoin.symbol === coin.symbol) {
                    return total += oldCoin.quantity * coin.value;
                }
            });
            return total;
        }, 0 );
    }

    convertToCoins(value) {
        let newValue = [];
        this.newCurrency.forEach( (coin) => {
            if (value/coin.value >= 1) {
                let quantity = Math.floor(value/coin.value);
                newValue.push( { symbol: coin.symbol, quantity: quantity } );
                value = value%coin.value;
            }
        });
        return newValue;
    }

    // example orig:
    // [
    //     { symbol: 'p', quantity: 1 },
    //     { symbol: 'g', quantity: 1 },
    //     { symbol: 'e', quantity: 1 },
    //     { symbol: 's', quantity: 1 },
    //     { symbol: 'c', quantity: 1 }
    // ]
    exchange(orig) {
        let origBaseValue = this.convertToBase(orig);
        let newBaseValue = Math.round(origBaseValue * this.rate);
        if (newBaseValue <= 0) newBaseValue = 1;
        let newCoins = this.convertToCoins(newBaseValue);
        return newCoins;
    };
}

export { Exchanger }