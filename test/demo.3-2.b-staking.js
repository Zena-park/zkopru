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
  aAddress,
  aPrivateKey,
  bAddress,
  bPrivateKey,
} = require('./demo.function')

/// 1. operator stake to tokamak
// console.log('TON_PROPOSAL_STAKING_AMOUNT.toFixed(TON_UNIT)',TON_PROPOSAL_STAKING_AMOUNT.toFixed(TON_UNIT));

console.log(
  'TON_PROPOSAL_STAKING_AMOUNT.toFixed(TON_UNIT)',
  TON_PROPOSAL_STAKING_AMOUNT.toFixed(TON_UNIT),
)

deposit(
  bPrivateKey,
  load(network, 'Zkopru'),
  bAddress,
  TON_PROPOSAL_STAKING_AMOUNT.toFixed(TON_UNIT),
)

// stakingInfo(load(network, 'Zkopru'), aAddress,)
