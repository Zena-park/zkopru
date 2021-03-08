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

export class IZkopruTokamakConnector extends Contract {
  constructor(jsonInterface: any[], address?: string, options?: ContractOptions)

  clone(): IZkopruTokamakConnector

  methods: {
    isZkopru(): TransactionObject<boolean>

    updateSeiginorage(): TransactionObject<void>

    conenctTokamak(arg0: string): TransactionObject<void>

    isProposableTokamak(proposer: string): TransactionObject<boolean>

    proposeReward(account: string): TransactionObject<boolean>

    finalizeReward(account: string): TransactionObject<boolean>

    operator(): TransactionObject<string>

    isLayer2(): TransactionObject<boolean>

    currentFork(): TransactionObject<string>

    lastEpoch(forkNumber: number | string): TransactionObject<string>

    changeOperator(_operator: string): TransactionObject<void>
  }

  events: {
    allEvents: (options?: EventOptions, cb?: Callback<EventLog>) => EventEmitter
  }
}
