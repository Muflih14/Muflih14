require("@nomicfoundation/hardhat-toolbox");


const QUICKNODE_HTTP_URL = "https://spring-muddy-energy.ethereum-goerli.discover.quiknode.pro/1a6cb2cc56c1256ac3d90d4146fdcadcf69a827d/";
const PRIVATE_KEY = "7edaf224bc9b5328c3d78bf977d42f9d129c1fd8196801456c94ad089223a798";

module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: QUICKNODE_HTTP_URL,
      accounts: [PRIVATE_KEY],
    },
  }
}