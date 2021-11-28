const web3 = require('web3');
const MYCONTRACT_ABI = '[{"inputs":[{"internalType":"address","name":"_link","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkCancelled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkFulfilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"id","type":"bytes32"}],"name":"ChainlinkRequested","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"data","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getChainlinkToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"_oracle","type":"address"},{"internalType":"bytes32","name":"_jobId","type":"bytes32"},{"internalType":"uint256","name":"_payment","type":"uint256"},{"internalType":"string","name":"_url","type":"string"},{"internalType":"string","name":"_path","type":"string"},{"internalType":"int256","name":"_times","type":"int256"}],"name":"createRequestTo","outputs":[{"internalType":"bytes32","name":"requestId","type":"bytes32"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_requestId","type":"bytes32"},{"internalType":"uint256","name":"_data","type":"uint256"}],"name":"fulfill","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawLink","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_requestId","type":"bytes32"},{"internalType":"uint256","name":"_payment","type":"uint256"},{"internalType":"bytes4","name":"_callbackFunctionId","type":"bytes4"},{"internalType":"uint256","name":"_expiration","type":"uint256"}],"name":"cancelRequest","outputs":[],"stateMutability":"nonpayable","type":"function"}]';
const MYCONTRACT_ADDRESS = 'lat1lr7r6n2ek0cw8rtvtp60ufv5hsz7slke6nhq0k';
const ORACLE_ABI = '[{"inputs":[{"internalType":"address","name":"_link","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"requestId","type":"bytes32"}],"name":"CancelOracleRequest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"specId","type":"bytes32"},{"indexed":false,"internalType":"address","name":"requester","type":"address"},{"indexed":false,"internalType":"bytes32","name":"requestId","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"payment","type":"uint256"},{"indexed":false,"internalType":"address","name":"callbackAddr","type":"address"},{"indexed":false,"internalType":"bytes4","name":"callbackFunctionId","type":"bytes4"},{"indexed":false,"internalType":"uint256","name":"cancelExpiration","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"dataVersion","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"}],"name":"OracleRequest","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"EXPIRY_TIME","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_requestId","type":"bytes32"},{"internalType":"uint256","name":"_payment","type":"uint256"},{"internalType":"bytes4","name":"_callbackFunc","type":"bytes4"},{"internalType":"uint256","name":"_expiration","type":"uint256"}],"name":"cancelOracleRequest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_requestId","type":"bytes32"},{"internalType":"uint256","name":"_payment","type":"uint256"},{"internalType":"address","name":"_callbackAddress","type":"address"},{"internalType":"bytes4","name":"_callbackFunctionId","type":"bytes4"},{"internalType":"uint256","name":"_expiration","type":"uint256"},{"internalType":"bytes32","name":"_data","type":"bytes32"}],"name":"fulfillOracleRequest","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_node","type":"address"}],"name":"getAuthorizationStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getChainlinkToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_sender","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"onTokenTransfer","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_sender","type":"address"},{"internalType":"uint256","name":"_payment","type":"uint256"},{"internalType":"bytes32","name":"_specId","type":"bytes32"},{"internalType":"address","name":"_callbackAddress","type":"address"},{"internalType":"bytes4","name":"_callbackFunctionId","type":"bytes4"},{"internalType":"uint256","name":"_nonce","type":"uint256"},{"internalType":"uint256","name":"_dataVersion","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"oracleRequest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_node","type":"address"},{"internalType":"bool","name":"_allowed","type":"bool"}],"name":"setFulfillmentPermission","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdrawable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]';
const ORACLE_ADDRESS = 'lat1lp956sg2djmn9zv2amaupxcg88am9npelyhqyw';
const NODE_ADDRESS = 'lat1lysetrz0hepqhynmm9usqn2tuwm7jt4fq7gysv';
const JOBID = web3.utils.toHex('47be208decb34a2aa24c9bfb2770aff7');
const url = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,EUR,JPY'
const path = 'USD'
const times = 1;
const payment = web3.utils.toVon('1')
const FROM = 'lat127rmxxmql7vhy6pjtlz4wga7qukx6g78wcwdge'
const PK = process.env.PK;
let web3js = new web3('http://35.247.155.162:6789');

async function request() {
    let nonce = web3.utils.numberToHex(await web3js.platon.getTransactionCount(FROM));
    let contract = new web3js.platon.Contract(JSON.parse(MYCONTRACT_ABI), MYCONTRACT_ADDRESS, null);
    let data = contract.methods["createRequestTo"].apply(contract.methods, [ORACLE_ADDRESS, JOBID, payment, url, path, times]).encodeABI();
    let tx = {
        from: FROM,
        to: MYCONTRACT_ADDRESS,
        chainId: 210309,
        data: data,
        gas: "1000000", 
        nonce: nonce,
    };
    // sign
    let signTx = await web3js.platon.accounts.signTransaction(tx, PK);
    // send
    let receipt = await web3js.platon.sendSignedTransaction(signTx.rawTransaction);
    console.log("sign tx data:\n", signTx.rawTransaction, receipt)
}

async function getFulfillData() {
    let contract = new web3js.platon.Contract(JSON.parse(MYCONTRACT_ABI), MYCONTRACT_ADDRESS, null);
    contract.methods.data().call(null, (error, result) => console.log(result));
}

async function authorize() {
    let nonce = web3.utils.numberToHex(await web3js.platon.getTransactionCount(FROM));
    let contract = new web3js.platon.Contract(JSON.parse(ORACLE_ABI), ORACLE_ADDRESS, null);
    let data = contract.methods["setFulfillmentPermission"](NODE_ADDRESS, true).encodeABI();
    let tx = {
        from: FROM,
        to: ORACLE_ADDRESS,
        chainId: 210309,
        data: data,
        gas: "1000000", 
        nonce: nonce,
    };
    // sign
    let signTx = await web3js.platon.accounts.signTransaction(tx, PK);
    // send
    let receipt = await web3js.platon.sendSignedTransaction(signTx.rawTransaction);
    console.log("sign tx data:\n", signTx.rawTransaction, receipt)
}

// request();
getFulfillData();
// authorize();