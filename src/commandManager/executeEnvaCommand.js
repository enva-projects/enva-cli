const { prompt } = require('enquirer')
const { writeConfig, config, getCommandNodes, commandRoots } = require('./configManager')
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

  const { configObj, path: configPath } = config

  configObj.commands = mergeDeep(configObj.commands, commandObj)

  writeConfig(configPath, configObj)
}

async function deleteCommand () {
  const roots = commandRoots

  if (!roots.length) {
    console.log('No commands found.')
    process.exit(-1)
  }

  const { root } = await prompt([{
    type: 'select',
    name: 'root',
    message: 'Pick a command root',
    choices: roots
  }])

  const nodes = getCommandNodes(root)

  if (!nodes.length) {
    console.log('No commands found.')
    process.exit(-1)
  }

  const { node } = await prompt([{
    type: 'select',
    name: 'node',
    message: 'Pick a node',
    choices: ['All', ...nodes]
  }])

  const { configObj, path: configPath } = config

  if (node === 'All') {
    delete configObj.commands[root]
  } else {
    delete configObj.commands[root][node]
  }

  writeConfig(configPath, configObj)
}

module.exports = (command) => {
  if (command === 'create') {
    createCommand()
  } else if (command === 'delete') {
    deleteCommand()
  } else {
    console.error('Enva command not found!')
  }
}
