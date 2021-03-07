const fs = require('fs')
const path = require('path')

module.exports = function(network, name) {
  // const fileName = `/deployed.${network}.json`;
  const fileName = `${path.resolve(__dirname)}/../deployed.${network}.json`
  if (!fs.existsSync(fileName)) return undefined
  const data = JSON.parse(fs.readFileSync(fileName).toString())
  return data[name]
}
