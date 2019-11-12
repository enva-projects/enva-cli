import path from 'path';
import {
  execSync
} from 'child_process';

import findCommand from './findCommand/index';
import executeShellCommand from './executeShellCommand';
import { findConfig, parseConfig } from './configManager';

const ROOT = '/';

const GLOBAL_PATH = execSync('npm root').toString().trim();

export default function executeCommand(userCommand: string[], current: string = process.env.PWD || '.'): StatusWithMessage {
  const { data, type } = findConfig(current);
  if(data) {
    const parsedConfig = parseConfig(data, type);
    if(parsedConfig) {
      const { baseCommand, args } = findCommand(userCommand, parsedConfig)
      if(baseCommand){
        executeShellCommand(baseCommand, args, current);
        return {
          status: true,
          message: ''
        }
      }
    }else return {
      status: false,
      message: 'PARSE_CONFIG_FAILED'
    }
  }
  if(current === ROOT) return executeCommand(userCommand, GLOBAL_PATH);
  else if(current === GLOBAL_PATH) return {
    status: false,
    message: 'COMMAND_NOT_FOUND'
  }
  else return executeCommand(userCommand, path.resolve(current, '..'));
}