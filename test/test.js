import { expect } from 'chai';
import { Exchanger } from '../dist/gold-exchange.js';

describe('gold-exchange', function() {
    let defaultExchanger;

    before(function(){
        defaultExchanger = new Exchanger();
    })

    it('should convert 1p 1g 1e 1s 1c to 1161', function() {
        let coins = [
            { symbol: 'p', quantity: 1 },
            { symbol: 'g', quantity: 1 },
            { symbol: 'e', quantity: 1 },
            { symbol: 's', quantity: 1 },
            { symbol: 'c', quantity: 1 }
        ];

        let baseValue = defaultExchanger.convertToBase(coins);
        expect(baseValue).to.equal(1161);
    })

    it('should convert 1161 to 1p 1g 1e 1s 1c', function() {
        let expected = [
            { symbol: 'p', quantity: 1 },
            { symbol: 'g', quantity: 1 },
            { symbol: 'e', quantity: 1 },
            { symbol: 's', quantity: 1 },
            { symbol: 'c', quantity: 1 }
        ];

        let newCoins = defaultExchanger.convertToCoins(1161);
        expect(newCoins).to.deep.equal(expected);
    })

    it('should make 10p 10g 10e 10s 10c be 1p 1g 1e 1s 1c by default', function() {
        let coins = [
            { symbol: 'p', quantity: 10 },
            { symbol: 'g', quantity: 10 },
            { symbol: 'e', quantity: 10 },
            { symbol: 's', quantity: 10 },
            { symbol: 'c', quantity: 10 }
        ];

        let expected = [
            { symbol: 'p', quantity: 1 },
            { symbol: 'g', quantity: 1 },
            { symbol: 'e', quantity: 1 },
            { symbol: 's', quantity: 1 },
            { symbol: 'c', quantity: 1 }
        ];

        let newCoins = defaultExchanger.exchange(coins);
        expect(newCoins).to.deep.equal(expected);
    })

    it('should make 1p 1g 1e 1s be 1g 1s 6c by default', function() {
        let coins = [
            { symbol: 'p', quantity: 1 },
            { symbol: 'g', quantity: 1 },
            { symbol: 'e', quantity: 1 },
            { symbol: 's', quantity: 1 }
        ];

        let expected = [
            { symbol: 'g', quantity: 1 },
            { symbol: 's', quantity: 1 },
            { symbol: 'c', quantity: 6 }
        ];

        let newCoins = defaultExchanger.exchange(coins);
        expect(newCoins).to.deep.equal(expected);
    })

    it('should convert default currency to new currency', function() {
        let coins = [
            { symbol: 'p', quantity: 10 },
            { symbol: 'g', quantity: 10 },
            { symbol: 's', quantity: 10 },
            { symbol: 'c', quantity: 10 }
        ];

        let expected = [
            { symbol: 'g', quantity: 1 },
            { symbol: 'e', quantity: 1 },
            { symbol: 's', quantity: 1 },
            { symbol: 'c', quantity: 1 }
        ];

        let newCurrency = [
            { symbol: 'g', value: 1000 },
            { symbol: 'e', value: 100 },
            { symbol: 's', value: 10 },
            { symbol: 'c', value: 1 }
        ];

        let exchanger = new Exchanger( {newCurrency: newCurrency});
        let newCoins = exchanger.exchange(coins);
        expect(newCoins).to.deep.equal(expected);
    })

    it('should convert default currency to new currency with 50:1 exchange rate', function() {
        let coins = [
            { symbol: 'p', quantity: 50 },
            { symbol: 'g', quantity: 50 },
            { symbol: 'e', quantity: 50 },
            { symbol: 's', quantity: 50 },
            { symbol: 'c', quantity: 50 }
        ];

        let expected = [
            { symbol: 'g', quantity: 1 },
            { symbol: 'e', quantity: 1 },
            { symbol: 's', quantity: 6 },
            { symbol: 'c', quantity: 1 }
        ];

        let newCurrency = [
            { symbol: 'g', value: 1000 },
            { symbol: 'e', value: 100 },
            { symbol: 's', value: 10 },
            { symbol: 'c', value: 1 }
        ];

        let exchanger = new Exchanger( {rate: 1/50, newCurrency: newCurrency});
        let newCoins = exchanger.exchange(coins);
        expect(newCoins).to.deep.equal(expected);
    })
});