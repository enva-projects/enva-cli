const {
    config: { configObj },
    path,
} = require('./configManager')
const getCommand = require('./getCommand')
const executeCommand = require('./executeCommand')
const executeEnvaCommand = require('./executeEnvaCommand')

export default {
    doesCommandExists(command) {
        return getCommand(command, configObj)
    },
    isEnvaCommand([root]) {
        return root === '-e' || !root
    },
    executeCommand(userCommand) {
        const command = getCommand(userCommand, configObj)
        if (!command) throw new Error(`Command doesn't exist!`)
        executeCommand({
            command: command.command,
            args: command.args,
            cwd: path,
        })
    },
    executeEnvaCommand([root, command]) {
        if (!this.isEnvaCommand([root])) throw new Error(`Command isn't valid!`)
        executeEnvaCommand([root, command])
    },
}
