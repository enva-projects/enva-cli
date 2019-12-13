import path from 'path'
import { execSync } from 'child_process'

import findCommand from './findCommand/index'
import { findConfig, parseConfig } from './configManager'
import { executePlugin, executeShellCommand } from './commandExecuter'

const ROOT = '/'

const GLOBAL_PATH = execSync('npm root')
    .toString()
    .trim()

export default function executeCommand(
    userCommand: string[],
    current: string = process.env.PWD || '.'
): StatusWithMessage {
    const { data, type } = findConfig(current)
    if (data) {
        const parsedConfig = parseConfig(data, type)
        if (parsedConfig) {
            const { pluginName, args, type, baseCommand } = findCommand(userCommand, parsedConfig)
            if (type) {
                if (type === 'shell') executeShellCommand(baseCommand, args, current)
                else executePlugin(pluginName, args)
                return {
                    status: true,
                    message: 'SUCCESS',
                }
            }
        } else
            return {
                status: false,
                message: 'PARSE_CONFIG_FAILED',
            }
    }
    if (current === ROOT) return executeCommand(userCommand, GLOBAL_PATH)
    else if (current === GLOBAL_PATH)
        return {
            status: false,
            message: 'COMMAND_NOT_FOUND',
        }
    else return executeCommand(userCommand, path.resolve(current, '..'))
}
