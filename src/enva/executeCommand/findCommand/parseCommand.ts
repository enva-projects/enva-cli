function getDefaultValue(commandArgument: string): string {
    const itemWithDefaultRegexp = /\${\d+:(.+?)}/
    const splittedItem = itemWithDefaultRegexp.exec(commandArgument)
    return splittedItem ? splittedItem[1] : ''
}

export default function parseCommand(command: string, args: string[]): string {
    const commandRegexp = /\${?(\d)*(?::.*?})?/g

    // Check for $ existance in the middle or the end
    if (!/\$$/.test(command) && !/\$\s/.test(command)) {
        // Add args at the end of the command
        command += ' $'
    }

    return command
        .replace(commandRegexp, item => {
            const defaultValue = getDefaultValue(item)

            // Split item in to parts
            const parsedItem = commandRegexp.exec(item)

            const argNumber = parsedItem ? Number(parsedItem[1]) - 1 : null

            // $\d+
            if (argNumber) {
                return args[Number(argNumber) - 1] || defaultValue
            }
            // $
            return args.join(' ')
        })
        .replace(/\s{2,}/, ' ')
        .trim()
}
