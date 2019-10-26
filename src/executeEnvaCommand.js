const { prompt } = require('enquirer')
const { writeConfig, getConfig, getCommandNodes, getCommandRoots } = require('./configManager')
const mergeDeep = require('merge-deep')

async function createCommand () {
  const { root, name, command } = await prompt([
    {
      type: 'input',
      name: 'root',
      message: 'What is command root?'
    },
    {
      type: 'input',
      name: 'name',
      message: 'What is command name?'
    },
    {
      type: 'input',
      name: 'command',
      message: 'What is command?'
    }
  ])

  const commandObj = {
    [root]: {
      [name]: command
    }
  }

  const { config, path: configPath } = getConfig()

  config.commands = mergeDeep(config.commands, commandObj)

  writeConfig(configPath, config)
}

async function deleteCommand () {
  const roots = getCommandRoots()

  const { root } = await prompt([{
    type: 'select',
    name: 'root',
    message: 'Pick a command root',
    choices: roots
  }])

  const nodes = getCommandNodes(root)

  const { node } = await prompt([{
    type: 'select',
    name: 'node',
    message: 'Pick a node',
    choices: ['All', ...nodes]
  }])

  const { config, path: configPath } = getConfig()

  if (node === 'All') {
    delete config.commands[root]
  } else {
    delete config.commands[root][node]
  }

  writeConfig(configPath, config)
}

module.exports = (command) => {
  if (command === 'create') {
    createCommand()
  } else if (command === 'delete') {
    deleteCommand()
  }
}
