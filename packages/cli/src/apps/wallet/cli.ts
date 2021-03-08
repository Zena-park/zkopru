#!/usr/bin/env node

/* eslint-disable no-case-declarations */
import fs from 'fs'
import { logStream } from '@zkopru/utils'
import { Config } from './configurator/configurator'
import { getZkWallet } from './configurator'
import { WalletDashboard } from './app'
import { argv } from './parser'

const main = async () => {
  // const writeStream = fs.createWriteStream('./WALLET_LOG')
  // logStream.addStream(writeStream)

  // blessed.screen.render()
  let config: Config = argv
  if (argv.config) {
    config = {
      ...argv,
      ...JSON.parse(fs.readFileSync(argv.config).toString('utf8')),
    }
    if (!config.seedKeystore)
      throw Error('You should setup the keystore in the config file')
  }
  console.log(`config : ${config}  `)
  const writeStream = fs.createWriteStream(config.logFile)
  logStream.addStream(writeStream)

  const zkWallet = await getZkWallet(config)
  if (!zkWallet) return
  const dashboard = new WalletDashboard(zkWallet, () => process.exit())
  dashboard.render()
  await dashboard.run()
}
;(async () => {
  try {
    await main()
    process.exit()
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
})()
