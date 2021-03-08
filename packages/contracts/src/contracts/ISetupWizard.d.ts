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

export class ISetupWizard extends Contract {
  constructor(jsonInterface: any[], address?: string, options?: ContractOptions)

  clone(): ISetupWizard

  methods: {
    registerVk(
      numOfInputs: number | string,
      numOfOutputs: number | string,
      vk: {
        alpha1: { X: number | string; Y: number | string }
        beta2: { X: (number | string)[]; Y: (number | string)[] }
        gamma2: { X: (number | string)[]; Y: (number | string)[] }
        delta2: { X: (number | string)[]; Y: (number | string)[] }
        ic: { X: number | string; Y: number | string }[]
      },
    ): TransactionObject<void>

    makeConfigurable(addr: string): TransactionObject<void>

    makeUserInteractable(addr: string): TransactionObject<void>

    makeCoordinatable(addr: string): TransactionObject<void>

    makeChallengeable(
      challengeable: string,
      depositValidator: string,
      headerValidator: string,
      migrationValidator: string,
      utxoTreeValidator: string,
      withdrawalTreeValidator: string,
      nullifierTreeValidator: string,
      txValidator: string,
    ): TransactionObject<void>

    makeMigratable(addr: string): TransactionObject<void>

    allowMigrants(migrants: string[]): TransactionObject<void>

    completeSetup(): TransactionObject<void>

    makeTokamak(addr: string): TransactionObject<void>
  }

  events: {
    allEvents: (options?: EventOptions, cb?: Callback<EventLog>) => EventEmitter
  }
}
