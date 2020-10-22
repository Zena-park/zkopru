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

export class ITxValidator extends Contract {
  constructor(jsonInterface: any[], address?: string, options?: ContractOptions)
  clone(): ITxValidator
  methods: {
    validateInclusion(
      blockData: string | number[],
      txIndex: number | string,
      inflowIndex: number | string,
    ): TransactionObject<{
      slash: boolean
      reason: string
      0: boolean
      1: string
    }>

    validateOutflow(
      blockData: string | number[],
      txIndex: number | string,
    ): TransactionObject<{
      slash: boolean
      reason: string
      0: boolean
      1: string
    }>

    validateAtomicSwap(
      blockData: string | number[],
      txIndex: number | string,
    ): TransactionObject<{
      slash: boolean
      reason: string
      0: boolean
      1: string
    }>

    validateUsedNullifier(
      blockData: string | number[],
      parentHeader: string | number[],
      txIndex: number | string,
      inflowIndex: number | string,
      sibling: (string | number[])[],
    ): TransactionObject<{
      slash: boolean
      reason: string
      0: boolean
      1: string
    }>

    validateDuplicatedNullifier(
      blockData: string | number[],
      nullifier: string | number[],
    ): TransactionObject<{
      slash: boolean
      reason: string
      0: boolean
      1: string
    }>

    isValidRef(
      l2BlockHash: string | number[],
      ref: number | string,
    ): TransactionObject<boolean>
  }
  events: {
    allEvents: (options?: EventOptions, cb?: Callback<EventLog>) => EventEmitter
  }
}