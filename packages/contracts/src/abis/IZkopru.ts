export const IZkopruABI = [
  {
    inputs: [
      { internalType: 'address', name: 'proposerAddr', type: 'address' },
    ],
    name: 'isProposable',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'proposeReward',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'finalizeReward',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalStaked',
    outputs: [
      { internalType: 'uint256', name: 'totalsupply', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_account', type: 'address' }],
    name: 'stakedOf',
    outputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
]
