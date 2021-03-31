var IdentityLight = artifacts.require("./IdentityLight.sol");

module.exports = function (deployer) {
  deployer.deploy(IdentityLight);
};