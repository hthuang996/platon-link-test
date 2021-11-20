const { default: Web3 } = require('web3');
const web3 = require('web3');
const ABI = '[{"inputs":[{"internalType":"address","name":"_link","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkCancelled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkFulfilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkRequested","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"data","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getChainlinkToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"_oracle","type":"address"},{"internalType":"bytes32","name":"_jobId","type":"bytes32"},{"internalType":"uint256","name":"_payment","type":"uint256"},{"internalType":"string","name":"_url","type":"string"},{"internalType":"string","name":"_path","type":"string"},{"internalType":"int256","name":"_times","type":"int256"}],"name":"createRequestTo","outputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_requestId","type":"bytes32"},{"internalType":"uint256","name":"_data","type":"uint256"}],"name":"fulfill","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawLink","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_requestId","type":"bytes32"},{"internalType":"uint256","name":"_payment","type":"uint256"},{"internalType":"bytes4","name":"_callbackFunctionId","type":"bytes4"},{"internalType":"uint256","name":"_expiration","type":"uint256"}],"name":"cancelRequest","outputs":[],"stateMutability":"nonpayable","type":"function"}]';
const ADDRESS = 'lat176tlwz75ykuv03yf4jp0cawqn2ulkw8kfdpe7z';
const ORACLE_ADDRESS = 'lat1qj0xtgxp7frjyv52ss2lk6xvxsjuhkcft429cv';
const JOBID = web3.utils.toHex('145a9cce137642689456396d09ac8cbc');
const url =
'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,EUR,JPY'
const path = 'USD'
const times = 1;
const payment = web3.utils.toVon('1')
const FROM = 'lat127rmxxmql7vhy6pjtlz4wga7qukx6g78wcwdge'
const PK = process.env.PK;
let web3js = new web3('http://35.247.155.162:6789');

async function main() {
    let nonce = web3.utils.numberToHex(await web3js.platon.getTransactionCount(FROM));
    let contract = new web3js.platon.Contract(JSON.parse(ABI), ADDRESS, null);
    let data = contract.methods["createRequestTo"].apply(contract.methods, [ORACLE_ADDRESS, JOBID, payment, url, path, times]).encodeABI();
    let tx = {
        from: FROM,
        to: ADDRESS,
        chainId: 210309,
        data: data,
        gas: "1000000", 
        nonce: nonce,
    };
    // 签名交易
    let signTx = await web3js.platon.accounts.signTransaction(tx, PK);
    // 发送交易
    let receipt = await web3js.platon.sendSignedTransaction(signTx.rawTransaction);
    console.log("sign tx data:\n", signTx.rawTransaction, receipt)
}

async function getFulfillData() {
    let contract = new web3js.platon.Contract(JSON.parse(ABI), ADDRESS, null);
    contract.methods.data().call(null, (error, result) => console.log(result));
}

async function requestRandomness() {
    let ABI = '[{"inputs":[{"internalType":"address","name":"_linkTokenAddress","type":"address"},{"internalType":"bytes32","name":"_keyHash","type":"bytes32"},{"internalType":"address","name":"_vrfCoordinatorAddress","type":"address"},{"internalType":"uint256","name":"_fee","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes32","name":"requestId","type":"bytes32"}],"name":"RequestedRandomness","type":"event"},{"inputs":[],"name":"randomResult","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"},{"internalType":"uint256","name":"randomness","type":"uint256"}],"name":"rawFulfillRandomness","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getRandomNumber","outputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"test","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"test2","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"test3","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"test4","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"test5","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"test6","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"crosscall","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getVRFCoordinator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"getKeyHash","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"getFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"getChainlinkToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true}]';
    let ADDRESS = '0x4781298B3ffb1a81bb3fA79e29e49fA2497bAB8f'

    let nonce = web3.utils.numberToHex(await web3js.platon.getTransactionCount(FROM));
    let contract = new web3js.platon.Contract(JSON.parse(ABI), ADDRESS, null);
    let data = contract.methods["getRandomNumber"]().encodeABI();
    // let gas = await contract.methods["getRandomNumber"]().estimateGas();
    // console.log("gas:", gas);
    // return;
    let tx = {
        from: FROM,
        to: ADDRESS,
        // value: "1000000000000000000",
        chainId: 210309,
        data: data,
        // gasPrice: "10000000000000", 
        gas: "1000000", 
        nonce: nonce,
    };
    // 签名交易
    let signTx = await web3js.platon.accounts.signTransaction(tx, PK);
    // 发送交易
    let receipt = await web3js.platon.sendSignedTransaction(signTx.rawTransaction);
    console.log("sign tx data:\n", signTx.rawTransaction, receipt)
}

async function getRandomness() {
    let ABI = '[{"inputs":[{"internalType":"address","name":"_linkTokenAddress","type":"address"},{"internalType":"bytes32","name":"_keyHash","type":"bytes32"},{"internalType":"address","name":"_vrfCoordinatorAddress","type":"address"},{"internalType":"uint256","name":"_fee","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes32","name":"requestId","type":"bytes32"}],"name":"RequestedRandomness","type":"event"},{"inputs":[],"name":"randomResult","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"},{"internalType":"uint256","name":"randomness","type":"uint256"}],"name":"rawFulfillRandomness","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getRandomNumber","outputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"test","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"test2","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"test3","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"test4","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"test5","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"test6","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"crosscall","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getVRFCoordinator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"getKeyHash","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"getFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"getChainlinkToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true}]';
    let ADDRESS = '0x4781298B3ffb1a81bb3fA79e29e49fA2497bAB8f'
    
    let contract = new web3js.platon.Contract(JSON.parse(ABI), ADDRESS, null);
    contract.methods["getChainlinkToken"]().call(null, (error, result) => console.log(result));
}

async function getPrice() {
    let ABI = '[{"inputs":[{"internalType":"address","name":"_priceFeed","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"getLatestPrice","outputs":[{"internalType":"int256","name":"","type":"int256"}],"stateMutability":"view","type":"function","constant":true}]';
    let ADDRESS = '0xD27a1173dd03f4Ea59AfFC5039D3081D6Ea51320'
    
    let contract = new web3js.platon.Contract(JSON.parse(ABI), ADDRESS, null);
    contract.methods["getLatestPrice"]().call(null, (error, result) => console.log(result));
}

async function getBalance(addr) {
    let ABI = '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"transferAndCall","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"typeAndVersion","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function","constant":true}]';
    let ADDRESS = 'lat1nsfwaseyy2f6hgycsdj33myhzadctuz0459ztl'
    
    let contract = new web3js.platon.Contract(JSON.parse(ABI), ADDRESS, null);
    contract.methods["balanceOf"](addr).call(null, (error, result) => console.log(result));
}

async function mint() {
    let ABI = '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"transferAndCall","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"typeAndVersion","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function","constant":true}]';
    let ADDRESS = 'lat1nsfwaseyy2f6hgycsdj33myhzadctuz0459ztl'

    let nonce = web3.utils.numberToHex(await web3js.platon.getTransactionCount(FROM));
    let contract = new web3js.platon.Contract(JSON.parse(ABI), ADDRESS, null);
    let data = contract.methods["transfer"]('lat176tlwz75ykuv03yf4jp0cawqn2ulkw8kfdpe7z', '100000000000000000000').encodeABI();
    let tx = {
        from: FROM,
        to: ADDRESS,
        // value: "1000000000000000000",
        chainId: 210309,
        data: data,
        // gasPrice: "10000000000000", 
        gas: "1000000", 
        nonce: nonce,
    };
    // 签名交易
    let signTx = await web3js.platon.accounts.signTransaction(tx, PK);
    // 发送交易
    let receipt = await web3js.platon.sendSignedTransaction(signTx.rawTransaction);
    console.log("sign tx data:\n", signTx.rawTransaction, receipt)
}

// mint();
// getBalance(ADDRESS);
main();
// getFulfillData();
// requestRandomness();
// getRandomness();
// getPrice();
