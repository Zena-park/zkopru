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

export class L2RewardManager extends Contract {
  constructor(jsonInterface: any[], address?: string, options?: ContractOptions)

  clone(): L2RewardManager

  methods: {
    DEFAULT_ADMIN_ROLE(): TransactionObject<string>

    getRoleAdmin(role: string | number[]): TransactionObject<string>

    getRoleMember(
      role: string | number[],
      index: number | string,
    ): TransactionObject<string>

    getRoleMemberCount(role: string | number[]): TransactionObject<string>

    grantRole(role: string | number[], account: string): TransactionObject<void>

    hasRole(
      role: string | number[],
      account: string,
    ): TransactionObject<boolean>

    l2RewardVault(): TransactionObject<string>

    minimumForProposal(): TransactionObject<string>

    renounceRole(
      role: string | number[],
      account: string,
    ): TransactionObject<void>

    revokeRole(
      role: string | number[],
      account: string,
    ): TransactionObject<void>

    rewardPerFinalize(): TransactionObject<string>

    rewardPerProposal(): TransactionObject<string>

    rewardPerValidate(): TransactionObject<string>

    watchTower(): TransactionObject<string>

    setL2RewardVault(_l2RewardVault: string): TransactionObject<void>

    claim(_to: string, _amount: number | string): TransactionObject<void>
  }

  events: {
    RoleAdminChanged: ContractEvent<{
      role: string
      previousAdminRole: string
      newAdminRole: string
      0: string
      1: string
      2: string
    }>
    RoleGranted: ContractEvent<{
      role: string
      account: string
      sender: string
      0: string
      1: string
      2: string
    }>
    RoleRevoked: ContractEvent<{
      role: string
      account: string
      sender: string
      0: string
      1: string
      2: string
    }>
    allEvents: (options?: EventOptions, cb?: Callback<EventLog>) => EventEmitter
  }
}