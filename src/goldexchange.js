const input = process.argv.slice(2, process.argv.length).join(' ');

// Exchanges original 5e gold values to new standard
// Rate should be a number or a string, ex '50:1' or 1/50
// oldCoins and newCoins are arrays of objects contining
// the sign and base value of each coin ex:
// 1p = 1000c and 1g = 100c, ie: [ {sign: 'p', value: 1000}, {sign: 'g', value: 100} ]
// Rate defaults to 10:1 to convert to a silver standard 
// oldCoins and newCoins default to 5e coin types, ie: p, g, e, s, c
class Exchanger {
    constructor({rate, oldCoins, newCoins} = {}) {
        this.convertToCopper = this.convertToBase.bind(this);
        this.convertToCoins = this.convertToCoins.bind(this);
        this.exchange = this.exchange.bind(this);

        let defaultRate = 1/10;
        let defaultCoins = [
            {sign: 'p', value: 1000},
            {sign: 'g', value: 100},
            {sign: 'e', value: 50},
            {sign: 's', value: 10},
            {sign: 'c', value: 1}
        ]

        this.newCoins = newCoins == null ? defaultCoins : newCoins.sort( (a, b) => b.value - a.value );
        this.oldCoins = oldCoins == null ? defaultCoins : oldCoins.sort( (a, b) => b.value - a.value );
        if (rate == null) {
            this.rate = defaultRate;
        } else if (isNaN(rate)){
            let r = rate.split(':').map( v => parseInt(v) );
            this.rate = r[1]/r[0];
        } else {
            this.rate = rate;
        }
    };

    convertToBase(value) {
        let vals = value.toLowerCase().split(' ');
        return vals.reduce( (total, val) => {
            this.oldCoins.forEach( (coin) => {
                if (val.includes(coin.sign)) {
                    return total += parseInt(val) * coin.value;
                }
            });
            return total;
        }, 0 );
    }

    convertToCoins(value) {
        return this.newCoins.reduce( (convertedValue, coin) => {
            if (value/coin.value >= 1) {
                convertedValue += Math.floor(value/coin.value).toString() + `${coin.sign} `;
                value = value%coin.value;
            }
            return convertedValue
        }, '');
    }

    exchange(orig) {
        let origBaseValue = this.convertToBase(orig);
        let newBaseValue = Math.round(origBaseValue * this.rate);
        if (newBaseValue <= 0) newBaseValue = 1;
        return this.convertToCoins(newBaseValue);
    };
}

let exchanger = new Exchanger({
    rate: 1/50,
    newCoins: [
        {sign: 'g', value: 1000},
        {sign: 'e', value: 100},
        {sign: 's', value: 10},
        {sign: 'c', value: 1}
    ]
});
console.log(exchanger.exchange(input));