var Web3 = require('web3');
var fs = require('fs');

var web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/_ws'));//http://localhost:8545


var privateKey = 'e879b29aa1a119949538d1c772dcb5a0df5701f3432f9ff636d7789e5466b2bb';

fs.readFile('abi.json', 'utf8', function (err,abi) {
    if (err) {
        return console.log(err);
    }
    fs.readFile('addresses.csv', 'utf8', function (err, addresses) {
        if (err) {
            return console.log(err);
        }
        var myContract = new web3.eth.Contract(JSON.parse(abi), '0xdf4c06cc119c61ce53a8a64252a0fc4c37934658');

    });

});