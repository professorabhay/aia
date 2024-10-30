const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const DeployMemeFiNFT = buildModule("DeployMemeFiNFT", (m) => {
  const baseURI = "https://yourbaseuri.com/";

  const memeFiNFT = m.contract("MemeFiNFT", [baseURI]);

  return { memeFiNFT };
});

module.exports = DeployMemeFiNFT;
