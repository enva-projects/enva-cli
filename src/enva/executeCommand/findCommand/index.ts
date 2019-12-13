import parseCommand from './parseCommand'

function testCommand(command, userCommand) {
    const commandRegex = new RegExp(`${command}(.*)`)
    return commandRegex.exec(userCommand)
}

function testPlugins({ plugins }: ConfigObject, args: string[]): { name: string; args: string[] } {
    for (const plugin of plugins) {
        const splittedCommand = testCommand(plugin.command, args.join(' '))
        if (splittedCommand) {
            return {
                name: plugin.name.trim(),
                args: splittedCommand[1].trim().split(' '),
            }
        }
    }
    return {
        name: '',
        args: [],
    }
}

function testCommands({ commands }: ConfigObject, args: string[]): { command: string; args: string[] } {
    const commandKeys = Object.keys(commands)
    for (const command of commandKeys) {
        const splittedCommand = testCommand(command, args.join(' '))
        if (splittedCommand)
            return {
                command: commands[command].trim(),
                args: splittedCommand[1].trim().split(' '),
            }
    }
    return {
        command: '',
        args: [],
    }
}

export default function findCommand(
    userArgs: string[],
    config: ConfigObject
): { baseCommand: string; args: string[]; type: string; pluginName: string } {
    const { command, args } = testCommands(config, userArgs)
    if (command) {
        return {
            baseCommand: parseCommand(command, args),
            args,
            type: 'shell',
            pluginName: '',
        }
    } else {
        const { name, args } = testPlugins(config, userArgs)
        if (name) {
            return {
                baseCommand: '',
                args,
                type: 'plugin',
                pluginName: name,
            }
        }
    }
    return {
        baseCommand: '',
        args: [],
        type: '',
        pluginName: '',
    }
}
