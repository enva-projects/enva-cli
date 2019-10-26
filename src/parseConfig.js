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
      config: fs.readFileSync(path.resolve(envaPath, CONFIG_FILE_NAME), 'utf8')
    }
  }
  return {
    path: envaPath,
    config: '{ "commands": {} }'
  }
}

function findNearestConfig (currentPath) {
  const fileAddress = path.resolve(currentPath, CONFIG_FILE_NAME)
  if (fs.existsSync(fileAddress)) {
    return {
      path: currentPath,
      config: fs.readFileSync(fileAddress, 'utf8')
    }
  } else if (currentPath !== '/') {
    return findNearestConfig(path.resolve(currentPath, '..'))
  }
  return null
}

module.exports = function parseConfig (currentPath) {
  const config = findNearestConfig(currentPath) ? findNearestConfig(currentPath) : getGlobalConfigFile()
  config.config = JSON.parse(config.config)
  return config
}
