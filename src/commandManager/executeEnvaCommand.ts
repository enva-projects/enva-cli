import enquirer from 'enquirer'
import { writeConfig, config, getCommandNodes, commandRoots, createBasicConfig } from './configManager'
import mergeDeep from 'merge-deep'

async function createCommand() {
    const { root, name, command } = await enquirer.prompt([
        {
            type: 'input',
            name: 'root',
            message: 'What is command root?',
        },
        {
            type: 'input',
            name: 'name',
            message: 'What is command name?',
        },
        {
            type: 'input',
            name: 'command',
            message: 'What is command?',
        },
    ])

    const commandObj = {
        [root]: {
            [name]: command,
        },
    }

    const { configObj, path: configPath } = config

    configObj.commands = mergeDeep(configObj.commands, commandObj)

    writeConfig(configPath, configObj)
}

async function deleteCommand() {
    const roots = commandRoots

    if (!roots.length) {
        console.log('No commands found.')
        process.exit(-1)
    }

    const { root } = await enquirer.prompt([
        {
            type: 'select',
            name: 'root',
            message: 'Pick a command root',
            choices: roots,
        },
    ])

    const nodes = getCommandNodes(root)

    if (!nodes.length) {
        console.log('No commands found.')
        process.exit(-1)
    }

    const { node } = await enquirer.prompt([
        {
            type: 'select',
            name: 'node',
            message: 'Pick a node',
            choices: ['All', ...nodes],
        },
    ])

    const { configObj, path: configPath } = config

    if (node === 'All') {
        delete configObj.commands[root]
    } else {
        delete configObj.commands[root][node]
    }

    writeConfig(configPath, configObj)
}

module.exports = ([root, command]) => {
    if (root === 'init' || !root) {
        createBasicConfig()
    } else if (command === 'a') {
        createCommand()
    } else if (command === 'd') {
        deleteCommand()
    } else {
        console.error('Enva command not found!')
    }
}
