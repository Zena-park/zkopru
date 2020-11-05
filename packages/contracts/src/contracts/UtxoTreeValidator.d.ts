/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import BN from 'bn.js'
import { Contract, ContractOptions } from 'web3-eth-contract'
import { EventLog } from 'web3-core'
import { EventEmitter } from 'events'
import { ContractEvent, Callback, TransactionObject, BlockType } from './types'

interface EventOptions {
  filter?: object
  fromBlock?: BlockType
  topics?: string[]
}

export class UtxoTreeValidator extends Contract {
  constructor(jsonInterface: any[], address?: string, options?: ContractOptions)

  clone(): UtxoTreeValidator

  methods: {
    CHALLENGE_PERIOD(): TransactionObject<string>

    MAX_BLOCK_SIZE(): TransactionObject<string>

    MAX_UTXO(): TransactionObject<string>

    MAX_VALIDATION_GAS(): TransactionObject<string>

    MAX_WITHDRAWAL(): TransactionObject<string>

    MINIMUM_STAKE(): TransactionObject<string>

    NULLIFIER_TREE_DEPTH(): TransactionObject<string>

    REF_DEPTH(): TransactionObject<string>

    UTXO_SUB_TREE_DEPTH(): TransactionObject<string>

    UTXO_SUB_TREE_SIZE(): TransactionObject<string>

    UTXO_TREE_DEPTH(): TransactionObject<string>

    WITHDRAWAL_SUB_TREE_DEPTH(): TransactionObject<string>

    WITHDRAWAL_SUB_TREE_SIZE(): TransactionObject<string>

    WITHDRAWAL_TREE_DEPTH(): TransactionObject<string>

    allowedMigrants(arg0: string): TransactionObject<boolean>

    consensusProvider(): TransactionObject<string>

    owner(): TransactionObject<string>

    proxied(arg0: string | number[]): TransactionObject<string>

    renounceOwnership(): TransactionObject<void>

    transferOwnership(newOwner: string): TransactionObject<void>

    validators(arg0: string | number[]): TransactionObject<string>

    validateUTXOIndex(
      arg0: string | number[],
      arg1: string | number[],
      _deposits: (number | string)[],
    ): TransactionObject<{
      slash: boolean
      reason: string
      0: boolean
      1: string
    }>

    validateUTXORoot(
      arg0: string | number[],
      arg1: string | number[],
      _deposits: (number | string)[],
      _subTreeSiblings: (number | string)[],
    ): TransactionObject<{
      slash: boolean
      reason: string
      0: boolean
      1: string
    }>
  }

  events: {
    OwnershipTransferred: ContractEvent<{
      previousOwner: string
      newOwner: string
      0: string
      1: string
    }>
    allEvents: (options?: EventOptions, cb?: Callback<EventLog>) => EventEmitter
  }
}
