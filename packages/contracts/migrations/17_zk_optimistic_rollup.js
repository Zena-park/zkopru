const Poseidon2 = artifacts.require('Poseidon2')
const Zkopru = artifacts.require('Zkopru')
const save = require('../utils/save_deployed')
const load = require('../utils/load_deployed')

module.exports = function migration(deployer, network, accounts) {
  deployer.then(async () => {
    let zkopru

    await deployer.deploy(Poseidon2, { overwrite: false })
    console.log(`Deployed Poseidon2`)

    await deployer.link(Poseidon2, Zkopru)
    console.log(`link Poseidon2 to Zkopru`)

    await deployer.deploy(Zkopru, accounts[0]).then(_zkopru => {
      zkopru = _zkopru
    })
    console.log(`Deployed Zkopru`)
    save(network, {
      name: 'Zkopru',
      address: zkopru.address,
    })
  })
}
