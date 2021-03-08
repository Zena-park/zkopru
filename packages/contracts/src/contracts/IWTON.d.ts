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

export class IWTON extends Contract {
  constructor(jsonInterface: any[], address?: string, options?: ContractOptions)

  clone(): IWTON

  methods: {
    balanceOf(account: string): TransactionObject<string>

    onApprove(
      owner: string,
      spender: string,
      tonAmount: number | string,
      data: string | number[],
    ): TransactionObject<boolean>

    burnFrom(account: string, amount: number | string): TransactionObject<void>

    swapToTON(wtonAmount: number | string): TransactionObject<boolean>

    swapFromTON(tonAmount: number | string): TransactionObject<boolean>

    swapToTONAndTransfer(
      to: string,
      wtonAmount: number | string,
    ): TransactionObject<boolean>

    swapFromTONAndTransfer(
      to: string,
      tonAmount: number | string,
    ): TransactionObject<boolean>

    renounceTonMinter(): TransactionObject<void>
  }

  events: {
    allEvents: (options?: EventOptions, cb?: Callback<EventLog>) => EventEmitter
  }
}
