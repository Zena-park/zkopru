/* eslint-disable prettier/prettier */
const WatchTowerProxy = artifacts.require('WatchTowerProxy')
const WatchLogic = artifacts.require('WatchLogic')

const fs = require('fs')
const save = require('../utils/save_deployed')
const load = require('../utils/load_deployed')

module.exports = async function migration(deployer, network) {
  let watchTowerProxy
  let watchStorage
  let watchLogic
  const seigManager = load(network, "SeigManager");
  const layer2Registry = load(network, "Layer2Registry");

  await deployer.deploy(WatchLogic).then(_watchLogic => {
    watchLogic = _watchLogic
  })

  await deployer.deploy(WatchTowerProxy, watchLogic.address, seigManager, layer2Registry).then(_watchTowerProxy => {
    watchTowerProxy = _watchTowerProxy
  })

  save(network, {
    name: 'watchLogic',
    address: watchLogic.address,
  })

  save(network, {
    name: 'WatchTowerProxy',
    address: watchTowerProxy.address,
  })

  const watchImplementation = await watchTowerProxy.implementation()
  console.log('watchImplementation', watchImplementation);
}