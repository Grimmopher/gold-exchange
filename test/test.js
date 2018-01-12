var expect = require('chai').expect;
var Exchanger = require('../dist/gold-exchange.js').Exchanger

describe('gold-exchange', () => {
    it('should pass', () => {
        let exchanger = new Exchanger();
        console.log(exchanger.exchange('10g'));
        expect(true).to.be.true;
    })
});