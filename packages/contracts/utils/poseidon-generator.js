console.log('> Compiling Poseidon library')
const path = require('path')
const fs = require('fs')

const poseidonGenContract = require('circomlib/src/poseidon_gencontract.js')
const Artifactor = require('@truffle/artifactor')

const contractsDir = path.join(__dirname, '..', 'build/generated')
console.log('> contractsDir ')

const artifactor = new Artifactor(contractsDir)
console.log('> artifactor ')

fs.mkdirSync(contractsDir, { recursive: true })
;(async () => {
  await artifactor.save({
    contractName: 'Poseidon2',
    abi: poseidonGenContract.abi,
    unlinked_binary: poseidonGenContract.createCode(2),
  })
  console.log('> Poseidon2  save ')
  await artifactor.save({
    contractName: 'Poseidon3',
    abi: poseidonGenContract.abi,
    unlinked_binary: poseidonGenContract.createCode(3),
  })
  console.log('> Poseidon3  save ')
  await artifactor.save({
    contractName: 'Poseidon4',
    abi: poseidonGenContract.abi,
    unlinked_binary: poseidonGenContract.createCode(4),
  })
  console.log('> Poseidon4  save ')
})()
