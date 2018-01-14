import { Exchanger } from './gold-exchange';

let exchanger;
let getExchanger = () => {
    if (exchanger === null || exchanger === undefined) {
        exchanger = new Exchanger({ rate: 1/50, newCurrency: [
            { symbol: 'g', value: 1000 },
            { symbol: 'e', value: 100 },
            { symbol: 's', value: 10 },
            { symbol: 'c', value: 1 }
        ]});
    }
    return exchanger;
}

let parseInput = (input) => {
    let inputCoins = new Map();
    input = input.toLowerCase().split(' ');
    input.forEach( (i) => {
        let symbol = i.match(/[a-z]/);
        if (symbol) {
            let quantity = parseInt(i);
            if (inputCoins.has(symbol)) {
                inputCoins.set(symbol, inputCoins.get(symbol) + quantity);
            } else {
                inputCoins.set(symbol, quantity);
            }
        }
    })
    let coins = [];
    inputCoins.forEach( (quantity, symbol) => {
        coins.push({ symbol: symbol[0], quantity: quantity });
    })
    return coins;
};

let parseCoins = (coins) => {
    return coins.reduce( (output, coin) => {
        return output += `${coin.quantity}${coin.symbol} `;
    }, '');
}

let exchangeCoins = (input) => {
    let coins = parseInput(input);
    let newCoins = getExchanger().exchange(coins);
    let output = parseCoins(newCoins);

    return output;
}

export  { exchangeCoins };