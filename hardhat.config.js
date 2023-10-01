require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
require("./tasks/block-number");
require("hardhat-gas-reporter")
require("solidity-coverage");

/** @type import('hardhat/config').HardhatUserConfig */

const url = process.env.SEPOLIA_RPC_URL;
const chainId = process.env.CHAIN_ID;
const privateKey = process.env.PRIVATE_KEY;
const etherScanApiKey = process.env.ETHERSCAN_API_KEY;
const coinmarketApi = process.env.MARKETCAP_API_KEY;
//hardhat chain id = 31337

module.exports = {
  solidity: "0.8.8",
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: url,
      accounts: [privateKey],
      chainId : 11155111
    },
    localhost :{
      url : "http://127.0.0.1:8545/",
      //no need to put account id , it will automatically choose randomly from node
      chainId : 31337
    }
  },
  etherscan:{
    apiKey:etherScanApiKey
  },
  gasReporter:{
    enabled:true,
    //outputFile :"gas-reporter.txt",
    //noColors:true,
    currency:"USD",
    coinmarketcap :coinmarketApi
    //token :"MATIC"  (for polygon , by default for ethererum)
 }
};
