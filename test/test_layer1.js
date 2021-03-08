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

const gasPrice = 20000000000
const addressFrom = '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1'
const privateKey =
  '4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d'

/// =========================
const { getContract, setAbiObject } = require('./contracts')

const ABIObject = setAbiObject()

const infoL2RewardManager = async () => {
  console.log(' ====== L2RewardManager ================= ')
  const contract = getContract('L2RewardManager', web3)

  const rewardPerProposal = await contract.methods.rewardPerProposal().call()
  const rewardPerFinalize = await contract.methods.rewardPerFinalize().call()
  const rewardPerValidate = await contract.methods.rewardPerValidate().call()
  const minimumForProposal = await contract.methods.minimumForProposal().call()
  console.log('rewardPerProposal', rewardPerProposal)
  console.log('rewardPerFinalize', rewardPerFinalize)
  console.log('rewardPerValidate', rewardPerValidate)
  console.log('minimumForProposal', minimumForProposal)
}
const infoZkopru = async account => {
  console.log(' ====== Zkopru ================= ')
  const contract = getContract('Zkopru', web3)

  const proposer = account
  const zkopruAddress = load(network, 'Zkopru')
  const ZkopruContract = getContract('Zkopru', web3)

  const genesis = await contract.methods.genesis().call()
  const latest = await contract.methods.latest().call()
  const proposedBlocks = await contract.methods.proposedBlocks().call()
  const stagedDeposits = await contract.methods.stagedDeposits().call()
  const stagedSize = await contract.methods.stagedSize().call()
  const massDepositId = await contract.methods.massDepositId().call()
  const isProposable = await contract.methods.isProposable(zkopruAddress).call()

  const proposers = await contract.methods.proposers(proposer).call()
  const totalStaked = await contract.methods.totalStaked().call()
  const stakedOf = await contract.methods.stakedOf(proposer).call()

  console.log('zkopruAddress', zkopruAddress)
  console.log('proposer', proposer)
  console.log('genesis', genesis)
  console.log('latest', latest)
  console.log('proposedBlocks', proposedBlocks)
  console.log('stagedDeposits', stagedDeposits)
  console.log('stagedSize', stagedSize)
  console.log('massDepositId', massDepositId)
  console.log('isProposable', isProposable)

  console.log('proposers', proposers)
  console.log('totalStaked', totalStaked)
  console.log('stakedOf', stakedOf)
}

const sendRawTransaction = (txData, addressFrom, privateKey) =>
  // get the number of transactions sent so far so we can create a fresh nonce
  web3.eth.getTransactionCount(addressFrom).then(txCount => {
    const newNonce = web3.utils.toHex(txCount)
    const transaction = new Tx(
      { ...txData, nonce: newNonce },
      { chain: 'mainnet' },
    ) // or 'rinkeby'
    transaction.sign(privateKey)
    const serializedTx = transaction.serialize().toString('hex')
    return web3.eth.sendSignedTransaction(`0x${serializedTx}`)
  })

const main = async account => {
  await infoZkopru(account)
  await infoL2RewardManager()
}

const send = async (_privateKey, gasPrice, transaction) => {
  const account = web3.eth.accounts.privateKeyToAccount(_privateKey).address
  const options = {
    to: transaction._parent._address,
    data: transaction.encodeABI(),
    gas: await transaction.estimateGas({ from: account }),
    gasPrice,
  }
  const signed = await web3.eth.accounts.signTransaction(options, _privateKey)
  const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction)
  return receipt
}

const tonMint = async (account, _privateKey, amount) => {
  const TonContract = getContract('TON', web3)
  const transaction = TonContract.methods.mint(account, amount)
  const receipt = await send(_privateKey, gasPrice, transaction)
  console.log('tonMint', receipt)
}
const balanceOfTON = async account => {
  const TonContract = getContract('TON', web3)
  const balance = await TonContract.methods.balanceOf(account).call()
  console.log('balanceOf (', account, ') ', toBN(balance).toString())
}

const deposit = async (_privateKey, layer2Address, account, tonAmount) => {
  const ton = await getContract('TON')
  const wton = load(network, 'WTON')

  const beforeBalance = await ton.methods.balanceOf(account).call()
  console.log('beforeBalance', toBN(beforeBalance).toString())
  // beforeBalance.should.be.bignumber.gte(tonAmount)

  const data = marshalString(
    [load(network, 'DepositManager'), layer2Address]
      .map(unmarshalString)
      .map(str => padLeft(str, 64))
      .join(''),
  )
  const transaction = ton.methods.approveAndCall(wton, tonAmount, data)

  const receipt = await send(_privateKey, gasPrice, transaction)
  console.log('deposit', receipt)

  const afterBalance = await ton.methods.balanceOf(account).call()
  console.log('afterBalance', toBN(afterBalance).toString())
  // beforeBalance.sub(afterBalance).should.be.bignumber.equal(tonAmount)
}

const to = '0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0'
const toPriv =
  '6cbed15c793ce57650b9877cf6fa156fbef513c4e6134f022a85b1ffdd59b2a1'
// tonMint(to, privateKey, TON_OPERATOR_STAKING_AMOUNT.toFixed(TON_UNIT))
// balanceOfTON(to)

/// staking to tokamak
/*
deposit(
  toPriv,
  load(network, 'Zkopru'),
  to,
  TON_OPERATOR_STAKING_AMOUNT.toFixed(TON_UNIT),
)

balanceOfTON(to)
*/
// main(to)

const accountInfo = async () => {
  const info = await web3.eth.accounts.encrypt(
    '6370fd033278c143179d81c5526140625662b8daa446c22ee2d73db3707e620c',
    'helloworld',
  )
  console.log('info', info)
}
accountInfo()
