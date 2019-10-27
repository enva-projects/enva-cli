const fs = require('fs')
import { resolve } from 'path'
import { execSync } from 'child_process'

const CONFIG_FILE_NAME = '.envarc'

function getGlobalPath() {
    return execSync('npm root -g', { encoding: 'utf8' })
}

function getGlobalConfigFile() {
    const envaPath = getGlobalPath().trim()

    const configFilePath = resolve(envaPath, CONFIG_FILE_NAME)

    if (fs.existsSync(configFilePath)) {
        return {
            path: envaPath,
            configObj: fs.readFileSync(resolve(envaPath, CONFIG_FILE_NAME), 'utf8'),
        }
    }
    return {
        path: envaPath,
        configObj: '{ "commands": {} }',
    }
}

function findNearestConfig(currentPath = process.env.PWD) {
    const fileAddress = resolve(process.env.PWD, CONFIG_FILE_NAME)
    if (fs.existsSync(fileAddress)) {
        return {
            path: process.env.PWD,
            configObj: fs.readFileSync(fileAddress, 'utf8'),
        }
    } else if (currentPath !== '/') {
        return findNearestConfig(resolve(currentPath, '..'))
    }
    return null
}

function getConfig() {
    const config = findNearestConfig(process.env.PWD) ? findNearestConfig(process.env.PWD) : getGlobalConfigFile()
    config.configObj = JSON.parse(config.configObj)
    return config
}

function createBasicConfig() {
    const basicConfig = {
        commands: {
            git: {
                add: 'git add',
            },
        },
    }
    writeConfig(process.env.PWD, basicConfig)
}

function writeConfig(configPath, config) {
    fs.writeFileSync(resolve(configPath, CONFIG_FILE_NAME), JSON.stringify(config, null, 2))
}

function getCommandNodes(root) {
    const {
        config: { commands },
    } = getConfig()

    return Object.keys(commands[root])
}

const config = getConfig()

const commandRoots = Object.keys(config.configObj.commands)

module.exports = {
    config,
    commandRoots,
    getCommandNodes,
    writeConfig,
    createBasicConfig,
}
