/* eslint-disable prefer-const */
const L2RewardManager = artifacts.require('L2RewardManager')

const fs = require('fs')
const save = require('../utils/save_deployed')
const load = require('../utils/load_deployed')

module.exports = async function migration(deployer, network) {
  let l2RewardVault
  let watchTower
  let l2RewardManager

  l2RewardVault = load(network, 'L2RewardVault')
  watchTower = load(network, 'WatchTowerProxy')

  await deployer
    .deploy(L2RewardManager, l2RewardVault, watchTower)
    .then(_l2RewardManager => {
      l2RewardManager = _l2RewardManager
    })

  save(network, {
    name: 'L2RewardManager',
    address: l2RewardManager.address,
  })
}
