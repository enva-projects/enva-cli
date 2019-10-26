const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const CONFIG_FILE_NAME = '.envarc'

function getGlobalPath () {
  return execSync('npm root -g', {encoding: 'utf8'})
}

function getGlobalConfigFile () {
  const envaPath = getGlobalPath().trim()

  const configFilePath = path.resolve(envaPath, CONFIG_FILE_NAME)

  if (fs.existsSync(configFilePath)) {
    return {
      path: envaPath,
      configObj: fs.readFileSync(path.resolve(envaPath, CONFIG_FILE_NAME), 'utf8')
    }
  }
  return {
    path: envaPath,
    configObj: '{ "commands": {} }'
  }
}

function findNearestConfig () {
  const fileAddress = path.resolve(process.env.PWD, CONFIG_FILE_NAME)
  if (fs.existsSync(fileAddress)) {
    return {
      path: process.env.PWD,
      configObj: fs.readFileSync(fileAddress, 'utf8')
    }
  } else if (process.env.PWD !== '/') {
    return findNearestConfig(path.resolve(process.env.PWD, '..'))
  }
  return null
}

function getConfig () {
  const config = findNearestConfig(process.env.PWD) ? findNearestConfig(process.env.PWD) : getGlobalConfigFile()
  config.configObj = JSON.parse(config.configObj)
  return config
}

function writeConfig (configPath, config) {
  fs.writeFileSync(path.resolve(configPath, CONFIG_FILE_NAME), JSON.stringify(config, null, 2))
}

function getCommandNodes (root) {
  const { config: { commands } } = getConfig()

  return Object.keys(commands[root])
}

const config = getConfig()

const commandRoots = Object.keys(config.configObj.commands)

module.exports = {
  config,
  commandRoots,
  getCommandNodes,
  writeConfig
}
