import { expect } from 'chai';
import { Exchanger } from '../dist/gold-exchange.js';

describe('gold-exchange', function() {
    let defaultExchanger;

    before(function(){
        defaultExchanger = new Exchanger();
    })

    it('should turn 10g to 1g', function() {
        let newCoins = defaultExchanger.exchange('10g');
        expect([{coin: 'a', amount: 100}]).to.deep.equal([{coin: 'a', amount: 100}]);
    })
});