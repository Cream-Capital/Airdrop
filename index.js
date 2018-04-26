var Web3 = require('web3');
var fs = require('fs');
const Tx = require('ethereumjs-tx');

var web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/_ws'));//http://localhost:8545
var cntAddress='0xa45969e1b318f66551d8f0d7723ab504c5087c7f';

var privateKey = Buffer.from('e879b29aa1a119949538d1c772dcb5a0df5701f3432f9ff636d7789e5466b2bb', 'hex');

fs.readFile('abi.json', 'utf8', function (err,abi) {
    if (err) {
        return console.log(err);
    }
    fs.readFile('addresses.csv', 'utf8', function (err, addresses) {
        if (err) {
            return console.log(err);
        }
        var token = new web3.eth.Contract(JSON.parse(abi), cntAddress);

        web3.eth.getTransactionCount('0xB5B6F70f51ceA6451a52e1c2f2d3dA11c938171e').then(function (count) {
            var addressesArray = addresses.split(',');
            for(var i=0;i<addressesArray.length;i++){
                const txParams = {
                    gasLimit: '0x5B8D80',
                    chainId: '0x4',
                    to: '0xa45969e1b318f66551d8f0d7723ab504c5087c7f',
                    gasPrice: '0xEE6B2800',
                    nonce: web3.utils.toHex(count+i),
                    data: token.methods.transfer(addressesArray[i],new Date().getTime()%10 +1).encodeABI()
                };
                const tx = new Tx(txParams);
                tx.sign(privateKey);
                const serializedTx = tx.serialize();
                web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
            }
            return true;
        }.bind(this)).then(console.log);

    });

});