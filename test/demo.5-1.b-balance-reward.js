/* eslint-disable new-cap */
/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
const Web3 = require('web3')
// const keccak256 = require('keccak256')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:5000'))
const {
  BN,
  constants,
  expectEvent,
  expectRevert,
  time,
  ether,
} = require('@openzeppelin/test-helpers')

const { padLeft, toBN } = require('web3-utils')

function marshalString(str) {
  if (str.slice(0, 2) === '0x') return str
  return '0x'.concat(str)
}

function unmarshalString(str) {
  if (str.slice(0, 2) === '0x') return str.slice(2)
  return str
}

const {
  createCurrency,
  createCurrencyRatio,
  createGetCurrency,
} = require('@makerdao/currency')
const chai = require('chai')

const { expect } = chai
const network = 'testnet'
const { mainModule } = require('process')
const Tx = require('ethereumjs-tx').Transaction
const load = require('../packages/contracts/utils/load_deployed2')

const _TON = createCurrency('TON')
const _WTON = createCurrency('WTON')

const _WTON_TON = createCurrencyRatio(_WTON, _TON)
const TON_UNIT = 'wei'
const WTON_UNIT = 'ray'
const WTON_TON_RATIO = _WTON_TON('1')
const TON_PROPOSAL_STAKING_AMOUNT = _TON('100')
const TON_OPERATOR_STAKING_AMOUNT = _TON('1000')

const {
  infoZkopru,
  sendRawTransaction,
  main,
  send,
  tonMint,
  balanceOfTON,
  deposit,
  unstaking,
  gasPrice,
  operator,
  operatorPrivateKey,
  rewardBalance,
  aAddress,
  aPrivateKey,
  bAddress,
  bPrivateKey,
} = require('./demo.function')

const claimReward = async (_privateKey, account, tonAmount) => {
  /* const ton = await getContract('TON')
  const zkopru = await getContract('Zkopru')
  const beforeBalance = await ton.methods.balanceOf(account).call()
  const balanceOfReward = await zkopru.methods.balanceOfReward(account).call()
  console.log(' ********* Zkopru claimReward **************  ')
  console.log(' your ton : ', toBN(beforeBalance).toString())
  console.log(' balanceOfReward: ', balanceOfReward)

  if (toBN(balanceOfReward).gte(toBN(tonAmount))) {
    const transaction = zkopru.methods.claim(tonAmount)
    const receipt = await send(_privateKey, gasPrice, transaction)
    const afterBalance = await ton.methods.balanceOf(account).call()
    console.log('your ton : ', toBN(afterBalance).toString())

  } else {
    console.log(' Not enough your reward.')
  }
  */
}

const TON_PROPOSAL_UNSTAKING_AMOUNT = _TON('50')

rewardBalance(bAddress)
