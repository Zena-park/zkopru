import { InanoSQLTableConfig } from '@nano-sql/core/lib/interfaces'
import bigInt from 'big-integer'
import { Field } from '@zkopru/babyjubjub'

export interface MerkleProofCacheSql {
  nodeIndex: string
  value: string
}

export function merkleProofCache(treeId: string): InanoSQLTableConfig {
  return {
    name: `merkle-proof-cache-${treeId}`,
    model: {
      'nodeIndex:string': { pk: true },
      'value:string': {},
    },
    queries: [
      {
        name: 'getSiblings',
        args: {
          'depth:int': {},
          'index:string': {},
        },
        call: (db, args) => {
          const { depth } = args
          const index = Field.from(args.index)
          const siblingIndexes = Array(depth).fill('')
          const leafIndex = index.val.or(bigInt.one.shiftRight(depth))
          for (let level = 0; level < depth; level += 1) {
            const pathIndex = leafIndex.shiftRight(level)
            const siblingIndex = pathIndex.xor(1)
            siblingIndexes[level] = Field.from(siblingIndex).toHex()
          }
          return db
            .query('select')
            .where([
              ['id', '=', args.id],
              'AND',
              ['index', 'IN', siblingIndexes],
            ])
            .emit()
        },
      },
    ],
  }
}