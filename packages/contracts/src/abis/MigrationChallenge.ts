export const MigrationChallengeABI = [
  {
    inputs: [],
    name: 'CHALLENGE_LIMIT',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'CHALLENGE_PERIOD',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MINIMUM_STAKE',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'POOL_SIZE',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'REF_DEPTH',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'SUB_TREE_DEPTH',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'SUB_TREE_SIZE',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'destination', type: 'address' },
      { internalType: 'bytes', name: '', type: 'bytes' },
    ],
    name: 'challengeMassMigrationToMassDeposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'destination', type: 'address' },
      { internalType: 'address', name: 'erc20', type: 'address' },
      { internalType: 'bytes', name: '', type: 'bytes' },
    ],
    name: 'challengeERC20Migration',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'destination', type: 'address' },
      { internalType: 'address', name: 'erc721', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { internalType: 'bytes', name: '', type: 'bytes' },
    ],
    name: 'challengeERC721Migration',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
