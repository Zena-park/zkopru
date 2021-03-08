const TokamakConnector = artifacts.require('TokamakConnector')

module.exports = function migration(deployer) {
  deployer.deploy(TokamakConnector)
}
