/* eslint-disable prettier/prettier */
const L2RewardVault = artifacts.require('L2RewardVault')

const fs = require('fs')
const save = require('../utils/save_deployed')
const load = require('../utils/load_deployed')

module.exports = async function migration(deployer, network) {
  let l2RewardVault

  const ton = load(network, "TON");
  const wton = load(network, "WTON");

  await deployer.deploy(L2RewardVault, ton, wton).then(_l2RewardVault => {
    l2RewardVault = _l2RewardVault
  })

  save(network, {
    name: 'L2RewardVault',
    address: l2RewardVault.address,
  })
}