/* eslint-disable camelcase */
const fs = require('fs')
const path = require('path')
// const save = require('../utils/save-deployed')
const { sleep } = require('@zkopru/utils')
const save = require('../utils/save_deployed')
const load = require('../utils/load_deployed')

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

const instances = {}

module.exports = function migration(deployer, network, accounts) {
  deployer.then(async () => {
    // tokens
    const instances = {}
    instances.erc20 = await TestERC20.deployed()
    instances.erc721 = await TestERC721.deployed()
    save(network, {
      name: 'TestERC20',
      address: instances.erc20.address,
    })
    save(network, {
      name: 'TestERC721',
      address: instances.erc721.address,
    })
    // controllers
    instances.ui = await UserInteractable.deployed()
    instances.coordinatable = await Coordinatable.deployed()
    instances.migratable = await Migratable.deployed()
    instances.configurable = await Configurable.deployed()
    instances.challengeable = await Challengeable.deployed()
    save(network, {
      name: 'UserInteractable',
      address: instances.ui.address,
    })
    save(network, {
      name: 'Coordinatable',
      address: instances.coordinatable.address,
    })
    save(network, {
      name: 'Migratable',
      address: instances.migratable.address,
    })
    save(network, {
      name: 'Configurable',
      address: instances.configurable.address,
    })
    save(network, {
      name: 'Challengeable',
      address: instances.challengeable.address,
    })
    // challenge validators
    instances.utxoTreeValidator = await UtxoTreeValidator.deployed()
    instances.withdrawalTreeValidator = await WithdrawalTreeValidator.deployed()
    instances.nullifierTreeValidator = await NullifierTreeValidator.deployed()
    instances.headerValidator = await HeaderValidator.deployed()
    instances.txValidator = await TxValidator.deployed()
    instances.depositValidator = await DepositValidator.deployed()
    instances.migrationValidator = await MigrationValidator.deployed()
    save(network, {
      name: 'UtxoTreeValidator',
      address: instances.utxoTreeValidator.address,
    })
    save(network, {
      name: 'WithdrawalTreeValidator',
      address: instances.withdrawalTreeValidator.address,
    })
    save(network, {
      name: 'NullifierTreeValidator',
      address: instances.nullifierTreeValidator.address,
    })
    save(network, {
      name: 'HeaderValidator',
      address: instances.headerValidator.address,
    })
    save(network, {
      name: 'TxValidator',
      address: instances.txValidator.address,
    })
    save(network, {
      name: 'DepositValidator',
      address: instances.depositValidator.address,
    })
    save(network, {
      name: 'MigrationValidator',
      address: instances.migrationValidator.address,
    })

    console.log(
      Object.keys(instances).map(key => `${key}: ${instances[key].address}`),
    )
    // const zkopru = await Zkopru.deployed()
    // instances.zkopru = zkopru
    /* let zkopru
    await deployer.deploy(Zkopru, accounts[0]).then(_zkopru => {
      zkopru = _zkopru
    })
    */
    const ZkopruAddress = load(network, 'Zkopru')
    const zkopru = await Zkopru.at(ZkopruAddress)
    instances.zkopru = zkopru

    console.log(`Deployed ZKOPRU at:\n${instances.zkopru.address}`)

    // consensus
    // instances.burnAuction = await BurnAuction.deployed()
    let burnAuction
    await deployer
      .deploy(BurnAuction, instances.zkopru.address)
      .then(_burnAuction => {
        burnAuction = _burnAuction
      })

    instances.burnAuction = burnAuction
    save(network, {
      name: 'BurnAuction',
      address: instances.burnAuction.address,
    })

    const auctionZkopru = await instances.burnAuction.zkopru()
    console.log(`burnAuction.zkopru:\n${auctionZkopru}`)

    // Setup proxy
    await zkopru.makeCoordinatable(instances.coordinatable.address)
    await zkopru.makeUserInteractable(instances.ui.address)
    await zkopru.makeChallengeable(
      instances.challengeable.address,
      instances.depositValidator.address,
      instances.headerValidator.address,
      instances.migrationValidator.address,
      instances.utxoTreeValidator.address,
      instances.withdrawalTreeValidator.address,
      instances.nullifierTreeValidator.address,
      instances.txValidator.address,
    )
    await zkopru.makeMigratable(instances.migratable.address)
    await zkopru.makeConfigurable(instances.configurable.address)

    /// ======================
    // Setup zkSNARKs
    // Setup migrations
    const keyDir = path.join(__dirname, '../keys/vks')
    const vkToInput = (nIn, nOut, vk) => {
      return [
        nIn,
        nOut,
        {
          alpha1: vk.vk_alpha_1.slice(0, 2),
          beta2: vk.vk_beta_2.slice(0, 2),
          gamma2: vk.vk_gamma_2.slice(0, 2),
          delta2: vk.vk_delta_2.slice(0, 2),
          ic: vk.IC.map(arr => arr.slice(0, 2)),
        },
      ]
    }

    // ============================
    // console.log(path.resolve(keyDir))
    for (let nIn = 1; nIn <= 4; nIn += 1) {
      for (let nOut = 1; nOut <= 4; nOut += 1) {
        const vk = JSON.parse(
          fs.readFileSync(
            path.join(keyDir, `/zk_transaction_${nIn}_${nOut}.vk.json`),
          ),
        )
        await zkopru.registerVk(...vkToInput(nIn, nOut, vk))
      }
    }
    // await wizard.allowMigrants(...)
    console.log('Setup zkSNARKs done')

    // ===============================
    const coordinatable = await Coordinatable.at(zkopru.address)
    // register erc20
    await coordinatable.registerERC20(instances.erc20.address)
    // register erc721
    await coordinatable.registerERC721(instances.erc721.address)

    // =============================
    const configurableZkopru = await Configurable.at(zkopru.address)
    await configurableZkopru.setChallengePeriod(30)
    await configurableZkopru.setConsensusProvider(instances.burnAuction.address)
    const consensusProvider = await configurableZkopru.consensusProvider()
    const zkopruConsensusProvider = await zkopru.consensusProvider()
    const CHALLENGE_PERIOD = await zkopru.CHALLENGE_PERIOD()
    console.log(
      'setConsensusProvider done ',
      consensusProvider,
      zkopruConsensusProvider,
      CHALLENGE_PERIOD,
    )
    console.log('instances.burnAuction.address ', instances.burnAuction.address)
    await instances.burnAuction.register({ value: '32000000000000000000' })

    // ===========================
    await zkopru.completeSetup()
    console.log('zkopru completeSetup done')

  })
}
