require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    aiaTestnet: {
      url: "https://aia-dataseed1-testnet.aiachain.org",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
