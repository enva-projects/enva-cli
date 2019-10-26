#!/usr/bin/env node

const yargs = require('yargs').argv
const parseConfig = require('./parseConfig')
const getCommand = require('./getCommand')
const executeCommand = require('./executeCommand')

const args = yargs._

const here = process.env.PWD

const { path: configPath, config } = parseConfig(here)

const command = getCommand(args, config)

if (!command) {
  console.error('Command not found!')
  process.exit(-1)
}

executeCommand(command, configPath)
