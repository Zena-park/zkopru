const fs = require('fs')

module.exports = function (network, name) {
  const fileName = `build/deployed/deployed.${network}.json`;
  if (!fs.existsSync(fileName)) return undefined;
  const data = JSON.parse(fs.readFileSync(fileName).toString());
  return data[name];
}
