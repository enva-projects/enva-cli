#!/usr/bin/env node

const yargs = require('yargs').argv
const { getConfig } = require('./configManager')
const getCommand = require('./getCommand')
const executeCommand = require('./executeCommand')
const executeEnvaCommand = require('./executeEnvaCommand')

const args = yargs._

if (args[0] === 'command') {
  executeEnvaCommand(args[1])
} else {
  const { path: configPath, config } = getConfig()

  const command = getCommand(args, config)

  if (!command) {
    console.error('Command not found!')
    process.exit(-1)

    executeCommand(command, configPath)
  }
}
