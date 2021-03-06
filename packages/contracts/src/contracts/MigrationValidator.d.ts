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

export class MigrationValidator extends Contract {
  constructor(jsonInterface: any[], address?: string, options?: ContractOptions)

  clone(): MigrationValidator

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

    validateDuplicatedDestination(
      arg0: string | number[],
      massMigrationIdx1: number | string,
      massMigrationIdx2: number | string,
    ): TransactionObject<{
      slash: boolean
      reason: string
      0: boolean
      1: string
    }>

    validateTotalEth(
      arg0: string | number[],
      migrationIndex: number | string,
    ): TransactionObject<{
      slash: boolean
      reason: string
      0: boolean
      1: string
    }>

    validateMergedLeaves(
      arg0: string | number[],
      migrationIndex: number | string,
    ): TransactionObject<{
      slash: boolean
      reason: string
      0: boolean
      1: string
    }>

    validateMigrationFee(
      arg0: string | number[],
      migrationIndex: number | string,
    ): TransactionObject<{
      slash: boolean
      reason: string
      0: boolean
      1: string
    }>

    validateDuplicatedERC20Migration(
      arg0: string | number[],
      migrationIndex: number | string,
      erc20MigrationIdx1: number | string,
      erc20MigrationIdx2: number | string,
    ): TransactionObject<{
      slash: boolean
      reason: string
      0: boolean
      1: string
    }>

    validateERC20Amount(
      arg0: string | number[],
      migrationIndex: number | string,
      erc20Index: number | string,
    ): TransactionObject<{
      slash: boolean
      reason: string
      0: boolean
      1: string
    }>

    validateDuplicatedERC721Migration(
      arg0: string | number[],
      migrationIndex: number | string,
      erc721MigrationIdx1: number | string,
      erc721MigrationIdx2: number | string,
    ): TransactionObject<{
      slash: boolean
      reason: string
      0: boolean
      1: string
    }>

    validateNonFungibility(
      arg0: string | number[],
      migrationIndex: number | string,
      erc721Index: number | string,
      tokenId: number | string,
    ): TransactionObject<{
      slash: boolean
      reason: string
      0: boolean
      1: string
    }>

    validateNftExistence(
      arg0: string | number[],
      migrationIndex: number | string,
      erc721Index: number | string,
      tokenId: number | string,
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
