require('dotenv').config();
require('@nomiclabs/hardhat-waffle');
require("@nomiclabs/hardhat-etherscan");

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const API_KEY = process.env.API_KEY;

module.exports = {
  solidity: '0.8.19',
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  networks: {
    mainnet: {
      url: `https://rpcapi.fantom.network`,
      chainId: 250,
      accounts: [PRIVATE_KEY]
    },
    testnet: {
      url: `https://responsive-bitter-dew.matic-testnet.discover.quiknode.pro/1f696bc52fd01bcff7203b0af7b7fa89de4e2805/`,
      chainId: 80001,
      accounts: [PRIVATE_KEY],
    },
  },
 
 
};