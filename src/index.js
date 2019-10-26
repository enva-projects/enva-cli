#!/usr/bin/env node

const yargs = require('yargs').argv

const commandManager = require('./commandManager')

const command = yargs._

if (commandManager.isEnvaCommand(command)) {
  commandManager.executeEnvaCommand(command)
} else if (commandManager.doesCommandExists(command)) {
  commandManager.executeCommand(command)
} else {
  console.error('Command not found!')
  process.exit(-1)
}
