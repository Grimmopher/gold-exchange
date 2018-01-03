const input = process.argv.slice(2, process.argv.length).join(' ');

// Exchanges original 5e gold values to silver standard
// Rate should be a string, ex '50g:1g' or '1p:3e'
class Exchanger {
    constructor({rate} = {}) {
        let r = rate.split(':').map( v => this.convertToCopper(v) );
        this.rate = r[1]/r[0];
    };

    convertToCopper(value) {
        let vals = value.toLowerCase().split(' ');
        return vals.reduce( (total, val) => {
            if (val.includes('c')) {
                return total += parseInt(val);
            };
            if (val.includes('s')) {
                return total += parseInt(val) * 10;
            };
            if (val.includes('e')) {
                return total += parseInt(val) * 50;
            };
            if (val.includes('g')) {
                return total += parseInt(val) * 100;
            };
            if (val.includes('p')) {
                return total += parseInt(val) * 1000;
            };
        }, 0 );
    };

    convertToCoins(value) {
        let coins = '';
        if (value/1000 >= 1) {
            coins += Math.floor(value/1000) + 'p ';
            value = value%1000;
        }
        if (value/100 >= 1) {
            coins += Math.floor(value/100) + 'g ';
            value = value%100;
        }
        if (value/50 >= 1) {
            coins += Math.floor(value/50) + 'e ';
            value = value%50;
        }
        if (value/10 >= 1) {
            coins += Math.floor(value/10) + 's ';
            value = value%10;
        }
        coins += value + 'c';
        return coins
    }

    exchange(orig) {
        let origCopper = this.convertToCopper(orig);
        let newCopper = Math.round(origCopper * this.rate);
        if (newCopper <= 0) newCopper = 1;
        return this.convertToCoins(newCopper);
    };
}

let exchanger = new Exchanger({rate: '50g:1g'});
console.log(exchanger.exchange(input));