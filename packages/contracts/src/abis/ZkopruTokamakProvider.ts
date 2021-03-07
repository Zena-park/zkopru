export const ZkopruTokamakProviderABI = [
  {
    inputs: [
      { internalType: 'address', name: '_seigManager', type: 'address' },
      { internalType: 'address', name: '_l2RewardManager', type: 'address' },
      { internalType: 'address', name: '_watchTower', type: 'address' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'l2RewardManager',
    outputs: [
      { internalType: 'contract IL2RewardManager', name: '', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'seigManager',
    outputs: [
      { internalType: 'contract ISeigManager', name: '', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'watchTower',
    outputs: [
      { internalType: 'contract IWatchTower', name: '', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'openRoundIfNeeded',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'roundIndex', type: 'uint256' }],
    name: 'lockForUpgrade',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'proposer', type: 'address' }],
    name: 'isProposable',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
]
