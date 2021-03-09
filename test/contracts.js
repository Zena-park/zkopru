/* eslint-disable no-param-reassign */
const Web3 = require('web3')
const web3EthABI = require('web3-eth-abi')
const { padLeft, toBN } = require('web3-utils')
const load = require('../packages/contracts/utils/load_deployed2')

function marshalString(str) {
  if (str.slice(0, 2) === '0x') return str
  return '0x'.concat(str)
}

function unmarshalString(str) {
  if (str.slice(0, 2) === '0x') return str.slice(2)
  return str
}
const network = 'testnet'

const TONAbi = require('../packages/contracts/build/contracts/TON.json')
const ZkopruAbi = require('../packages/contracts/build/contracts/Zkopru.json')
const L2RewardManagerAbi = require('../packages/contracts/build/contracts/L2RewardManager.json')
const WatchLogicAbi = require('../packages/contracts/build/contracts/WatchLogic.json')
const DepositManagerAbi = require('../packages/contracts/build/contracts/DepositManager.json')
const SeigManagerAbi = require('../packages/contracts/build/contracts/SeigManager.json')
const TokamakConnectorAbi = require('../packages/contracts/build/contracts/TokamakConnector.json')
const L2RewardVaultAbi = require('../packages/contracts/build/contracts/L2RewardVault.json')

const objectMapping = async abi => {
  const objects = {}
  if (abi != null && abi.length > 0) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < abi.length; i++) {
      // let inputs = abi[i].inputs;

      if (abi[i].type === 'function') {
        /*
        if(abi[i].name=='transferOwnership' || abi[i].name=='renouncePauser'
        || abi[i].name=='renounceOwnership' ) {
          console.log('abi[i].name' , abi[i].name, abi[i].inputs  ) ;
          console.log('objects[abi[i].name]' , objects[abi[i].name]  ) ;
        } */

        if (objects[abi[i].name] === undefined) objects[abi[i].name] = abi[i]
        else objects[`${abi[i].name}2`] = abi[i]
      }
    }
  }
  return objects
}

const setAbiObject = async () => {
  const AbiObject = {}
  AbiObject.TON = await objectMapping(TONAbi)
  AbiObject.Zkopru = await objectMapping(ZkopruAbi)
  AbiObject.L2RewardManager = await objectMapping(L2RewardManagerAbi)
  AbiObject.WatchTower = await objectMapping(WatchLogicAbi)
  AbiObject.SeigManager = await objectMapping(SeigManagerAbi)
  AbiObject.DepositManager = await objectMapping(DepositManagerAbi)
  AbiObject.TokamakConnector = await objectMapping(TokamakConnectorAbi)
  AbiObject.L2RewardVault = await objectMapping(L2RewardVaultAbi)

  /*
  this.AbiObject.WTON = await this.objectMapping(WTONAbi)
  this.AbiObject.DepositManager = await this.objectMapping(DepositManagerAbi)
  this.AbiObject.SeigManager = await this.objectMapping(SeigManagerAbi)
  this.AbiObject.Layer2Registry = await this.objectMapping(Layer2RegistryAbi)
  this.AbiObject.DAOVault = await this.objectMapping(DAOVaultAbi)
  this.AbiObject.Committee = await this.objectMapping(DAOCommitteeAbi)
  this.AbiObject.Agenda = await this.objectMapping(DAOAgendaManagerAbi)
  this.AbiObject.Candidate = await this.objectMapping(CandidateAbi)
  this.AbiObject.CommitteeProxy = await this.objectMapping(DAOCommitteeProxyAbi)
  this.AbiObject.PowerTON = await this.objectMapping(PowerTONAbi)
  */
  return AbiObject
}
function getContract(want, web3) {
  if (!web3) {
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:5000'))
  }
  const TON = new web3.eth.Contract(TONAbi.abi, load(network, 'TON'))
  const Zkopru = new web3.eth.Contract(ZkopruAbi.abi, load(network, 'Zkopru'))
  const L2RewardManager = new web3.eth.Contract(
    L2RewardManagerAbi.abi,
    load(network, 'L2RewardManager'),
  )
  const WatchTower = new web3.eth.Contract(
    WatchLogicAbi.abi,
    load(network, 'WatchTowerProxy'),
  )
  const DepositManager = new web3.eth.Contract(
    DepositManagerAbi.abi,
    load(network, 'DepositManager'),
  )
  const SeigManager = new web3.eth.Contract(
    SeigManagerAbi.abi,
    load(network, 'SeigManager'),
  )

  const TokamakConnector = new web3.eth.Contract(
    TokamakConnectorAbi.abi,
    load(network, 'Zkopru'),
  )

  const L2RewardVault = new web3.eth.Contract(
    L2RewardVaultAbi.abi,
    load(network, 'L2RewardVault'),
  )


  const contracts = {
    TON,
    Zkopru,
    L2RewardManager,
    WatchTower,
    SeigManager,
    DepositManager,
    TokamakConnector,
    L2RewardVault,
  }

  if (want) {
    return contracts.hasOwnProperty(want) ? contracts[want] : null; // eslint-disable-line
  }
  return contracts
}

module.exports = {
  getContract,
  setAbiObject,
  objectMapping,
}
