/* eslint-disable camelcase */
const fs = require('fs')
const path = require('path')
// const save = require('../utils/save-deployed')
const { sleep } = require('@zkopru/utils')
const save = require('../utils/save_deployed')
const load = require('../utils/load_deployed')

const Layer2Registry = artifacts.require('Layer2Registry')

const TestERC20 = artifacts.require('TestERC20')
const TestERC721 = artifacts.require('TestERC721')
const UserInteractable = artifacts.require('UserInteractable')
const Coordinatable = artifacts.require('Coordinatable')
const Challengeable = artifacts.require('Challengeable')
const DepositValidator = artifacts.require('DepositValidator')
const HeaderValidator = artifacts.require('HeaderValidator')
const UtxoTreeValidator = artifacts.require('UtxoTreeValidator')
const WithdrawalTreeValidator = artifacts.require('WithdrawalTreeValidator')
const NullifierTreeValidator = artifacts.require('NullifierTreeValidator')
const TxValidator = artifacts.require('TxValidator')
const MigrationValidator = artifacts.require('MigrationValidator')
const Migratable = artifacts.require('Migratable')
const Configurable = artifacts.require('Configurable')
const BurnAuction = artifacts.require('BurnAuction')
const Zkopru = artifacts.require('Zkopru')
const TokamakConnector = artifacts.require('TokamakConnector')
const instances = {}

module.exports = function migration(deployer, network, accounts) {
  deployer.then(async () => {
    const ZkopruAddress = load(network, 'Zkopru')

    // plasma-evm
    const TON = load(network, 'TON')
    const WTON = load(network, 'WTON')
    const layer2Registry = load(network, 'Layer2Registry')
    const DepositManager = load(network, 'DepositManager')
    const CoinageFactory = load(network, 'CoinageFactory')
    const SeigManager = load(network, 'SeigManager')
    const PowerTON = load(network, 'PowerTON')

    const L2RewardManager = load(network, 'L2RewardManager')
    const WatchTowerProxy = load(network, 'WatchTowerProxy')
    const TokamakConnectorAddress = load(network, 'TokamakConnector')

    console.log('layer2Registry : ', layer2Registry)
    console.log('SeigManager : ', SeigManager)
    console.log('L2RewardManager : ', L2RewardManager)
    console.log('WatchTowerProxy : ', WatchTowerProxy)

    const layer2RegistryContract = await Layer2Registry.at(layer2Registry)
    const tokamakConnector = await TokamakConnector.at(ZkopruAddress)

    // ===========================
    // set tokamak config
    await tokamakConnector.setTokamakConnector(
      layer2Registry,
      SeigManager,
      L2RewardManager,
      WatchTowerProxy,
    )
    console.log('set tokamakConnector config done')

    // registe zkopru to tokamak
    await layer2RegistryContract.registerAndDeployCoinage(
      ZkopruAddress,
      SeigManager,
    )
    console.log('registe zkopru to tokamak done')

    await tokamakConnector.connectWatchTower()
    console.log('conenctTokamak done')
  })
}
