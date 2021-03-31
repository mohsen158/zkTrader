const Web3 = require("web3");
const { ethers } = require("ethers");
const provider = new ethers.providers.Web3Provider(window.ethereum);

const signer = provider.getSigner();

// const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/7b3a02e10a0043feb895438cb1ad9230"));
// web3.eth.getBlock("latest", (error, result) => {
//   console.log('error:', error);
//   console.log('results', result);
// });
// var Contract = require("web3-eth-contract");

// if (window.ethereum) {
//   //   web3 = new Web3(window.ethereum);
//   Contract.setProvider(window.ethereum);

//   try {
//     window.ethereum.enable().then(function() {
//       // User has allowed account access to DApp...
//     });
//   } catch (e) {
//     // User has denied account access to DApp...
//   }
// }
// // Legacy DApp Browsers
// else if (window.web3) {
//   Contract.setProvider(web3.currentProvider);

//   //   web3 = new Web3(web3.currentProvider);
// }
// // Non-DApp Browsers
// else {
//   alert("You have to install MetaMask !");
// }

// window.addEventListener("load", async () => {
//   // Modern dapp browsers...
//   if (window.ethereum) {
//     console.log("here1");

//     try {
//       // Request account access if needed
//       await ethereum.enable();
//       web3 = new Web3(ethereum);
//       // Acccounts now exposed
//       //   web3.eth.sendTransaction({
//       //     /* ... */
//       //   });
//     } catch (error) {
//       console.log(error);

//       // User denied account access...
//     }
//   }
//   // Legacy dapp browsers...
//   else if (window.web3) {
//     window.web3 = new Web3(web3.currentProvider);
//   }
//   // Non-dapp browsers...
//   else {
//     console.log(
//       "Non-Ethereum browser detected. You should consider trying MetaMask!"
//     );
//   }
// });

// const Web3 = require("web3");
// const provider = new ethers.providers.JsonRpcProvider();

// The provider also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, we need the account signer...
// const signer = provider.getSigner();
const newSc = new ethers.Contract(
  "0x468A35686Abb96A2cEDfeA29e49cdF8c44b1285F",
  [
    {
      inputs: [
        {
          internalType: "address",
          name: "token",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "EtherDeposit",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "string",
          name: "purpose",
          type: "string",
        },
      ],
      name: "SetPurpose",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "WithdrawDai",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "WithdrawEther",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "bytes",
          name: "checkData",
          type: "bytes",
        },
      ],
      name: "checkUpkeep",
      outputs: [
        {
          internalType: "bool",
          name: "upkeepNeeded",
          type: "bool",
        },
        {
          internalType: "bytes",
          name: "performData",
          type: "bytes",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "convertEthToDai",
      outputs: [
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "daiBalances",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "daiToken",
      outputs: [
        {
          internalType: "contract IERC20",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "ethDeposit",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "etherBalances",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "add",
          type: "address",
        },
      ],
      name: "follow",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "followers",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getBalance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "daiAmount",
          type: "uint256",
        },
      ],
      name: "getEstimatedETHforDAI",
      outputs: [
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "add",
          type: "address",
        },
      ],
      name: "getFollowers",
      outputs: [
        {
          internalType: "address[]",
          name: "",
          type: "address[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getLatestPrice",
      outputs: [
        {
          internalType: "int256",
          name: "",
          type: "int256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "int256",
          name: "_text",
          type: "int256",
        },
      ],
      name: "hash",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "int256",
          name: "price",
          type: "int256",
        },
      ],
      name: "loop",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "hashP",
          type: "bytes32",
        },
      ],
      name: "openOrder",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "orders",
      outputs: [
        {
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "bytes32",
          name: "hashPrice",
          type: "bytes32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes",
          name: "performData",
          type: "bytes",
        },
      ],
      name: "performUpkeep",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "purpose",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "newPurpose",
          type: "string",
        },
      ],
      name: "setPurpose",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "uniswapRouter",
      outputs: [
        {
          internalType: "contract IUniswapV2Router02",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "withdrawDai",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "withdrawEther",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      stateMutability: "payable",
      type: "receive",
    },
  ],
  provider
);
newSc.hash(2324).then((rs) => {
  console.log(rs);
});
newSc.getLatestPrice().then((res) => {
  console.log("price", res);
});
const sc = newSc.connect(signer);
export default sc;
// const tx = signer.sendTransaction({
//   to: "0x1c6Cf0e29A971E65170dC9a3fd0B949F7F51dBF5",
//   value: ethers.utils.parseEther("1.0"),
// }).then(function(value) {
//   console.log('Single Return Value:' + value);
// });;
//  sc.ethDeposit({ value: 1111111 }).then((f) => console.log(f));

let index = 0;
// console.log(web3.eth.getStorageAt(contractAddress, index))
// console.log('DEC:' +(web3.eth.getStorageAt(contractAddress, index).then(ttt=>console.log(ttt))))
// web3.eth.Contract.setProvider(ethereum);
// console.log("web3:::", web3.eth.Contract);
const accounts = ethereum.request({
  method: "eth_requestAccounts",
});
const account = accounts[0];
// console.log(account);
// const sc = new web3.eth.Contract(
//   [
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "token",
//           type: "address",
//         },
//       ],
//       stateMutability: "nonpayable",
//       type: "constructor",
//     },
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: false,
//           internalType: "address",
//           name: "sender",
//           type: "address",
//         },
//         {
//           indexed: false,
//           internalType: "string",
//           name: "purpose",
//           type: "string",
//         },
//       ],
//       name: "SetPurpose",
//       type: "event",
//     },
//     {
//       inputs: [
//         {
//           internalType: "uint256",
//           name: "amount",
//           type: "uint256",
//         },
//       ],
//       name: "convertEthToDai",
//       outputs: [
//         {
//           internalType: "uint256[]",
//           name: "",
//           type: "uint256[]",
//         },
//       ],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "",
//           type: "address",
//         },
//       ],
//       name: "daiBalances",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "daiToken",
//       outputs: [
//         {
//           internalType: "contract IERC20",
//           name: "",
//           type: "address",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "ethDeposit",
//       outputs: [],
//       stateMutability: "payable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "",
//           type: "address",
//         },
//       ],
//       name: "etherBalances",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "add",
//           type: "address",
//         },
//       ],
//       name: "follow",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "",
//           type: "address",
//         },
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       name: "followers",
//       outputs: [
//         {
//           internalType: "address",
//           name: "",
//           type: "address",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "getBalance",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "uint256",
//           name: "daiAmount",
//           type: "uint256",
//         },
//       ],
//       name: "getEstimatedETHforDAI",
//       outputs: [
//         {
//           internalType: "uint256[]",
//           name: "",
//           type: "uint256[]",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "add",
//           type: "address",
//         },
//       ],
//       name: "getFollowers",
//       outputs: [
//         {
//           internalType: "address[]",
//           name: "",
//           type: "address[]",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "getLatestPrice",
//       outputs: [
//         {
//           internalType: "int256",
//           name: "",
//           type: "int256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "uint256",
//           name: "_text",
//           type: "uint256",
//         },
//       ],
//       name: "hash",
//       outputs: [
//         {
//           internalType: "bytes32",
//           name: "",
//           type: "bytes32",
//         },
//       ],
//       stateMutability: "pure",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "uint256",
//           name: "testPrice",
//           type: "uint256",
//         },
//       ],
//       name: "loop",
//       outputs: [
//         {
//           internalType: "bool",
//           name: "",
//           type: "bool",
//         },
//       ],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "bytes32",
//           name: "hashP",
//           type: "bytes32",
//         },
//       ],
//       name: "openOrder",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       name: "orders",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "id",
//           type: "uint256",
//         },
//         {
//           internalType: "address",
//           name: "owner",
//           type: "address",
//         },
//         {
//           internalType: "bytes32",
//           name: "hashPrice",
//           type: "bytes32",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "purpose",
//       outputs: [
//         {
//           internalType: "string",
//           name: "",
//           type: "string",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "string",
//           name: "newPurpose",
//           type: "string",
//         },
//       ],
//       name: "setPurpose",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "uniswapRouter",
//       outputs: [
//         {
//           internalType: "contract IUniswapV2Router02",
//           name: "",
//           type: "address",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "withdrawDai",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "withdrawEther",
//       outputs: [],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       stateMutability: "payable",
//       type: "receive",
//     },
//   ],
//   "0x5FbDB2315678afecb367f032d93F642f64180aa3",
//   {
//     gasPrice: "20000000000", // default gas price in wei, 20 gwei in this case
//   }
// );
// sc.methods.withdrawEther().send({ from: "0xbDb7dd6019fA22F9ab4266739Eab92c43405eB02" }, function (err, res) {
//   console.log("rec ::::",res)
//   if (err) alert(err.message);
// });
// sc.methods
//   .hash(123423)
//   .call()
//   .then(console.log);
// export default sc;

// sc.methods
//   .purpose()
//   .call({ from: "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe" }, function(
//     error,
//     result
//   ) {
//     console.log(result);
//   });
// sc.methods.withdrawEther().send({ from: account }, function(err, res) {
//   if (err) alert(err.message);
// });
// sc.methods
//   .purpose()
//   .call()
//   .then((res) => {
//     console.log(res);
//   });
// web3.version.getNetwork((err, netId) => {
//   switch (netId) {
//     case "1":
//       console.log("This is mainnet");
//       break;
//     case "2":
//       console.log("This is the deprecated Morden test network.");
//       break;
//     case "3":
//       console.log("This is the ropsten test network.");
//       break;
//     case "4":
//       console.log("This is the Rinkeby test network.");
//       break;
//     case "42":
//       console.log("This is the Kovan test network.");
//       break;
//     default:
//       console.log("This is an unknown network.");
//   }
// });

// web3.eth.getAccounts()
// .then((res)=>{
// 	web3.eth.defaultAccount =res[0]
// });
// web3.eth.defaultAccount ="0xfdfsdfsdf"
// console.log(web3.eth.accounts)
// // personal.unlockAccount(web3.eth.defaultAccount)
// export var sc = CoursesContract.at(
//   "0x4D8C499d9016ce72201F421a9ddd68a5B4fa267F"
// );
//  Courses.setInstructor("Stephen Hawking", 76,function(data){
// 	 console.log('iam in setINstructoe :',data);
//  })
// Courses.getInstructor(function(error, result){
// 	if(!error){
//  	  console.log(result);
// 	  }
//    else
// 	 console.error(error);
//    });
// Courses.setInstructor('Stephen Hawking', 76)
