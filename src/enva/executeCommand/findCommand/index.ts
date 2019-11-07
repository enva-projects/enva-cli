import fs from 'fs';
import path from 'path';

const ROOT = '/';

import parseCommand from './parseCommand';
import { findConfig, findGlobalConfig, parseConfig } from './configManager';

function testCommands({ commands }, args: string[]){
  const commandKeys = Object.keys(commands);
  for(const command of commandKeys){
    const commandRegex = new RegExp(`${command}(.*)`);
    const splittedCommand = commandRegex.exec(args.join(' '));
    if(splittedCommand) return {
        command: commands[command].trim(),
        args: splittedCommand[1].trim()
      }
  }
  return false;
}

export default function findCommand(args: string[], current = process.env.PWD || '.'){
  const config = findConfig(current);
  if(config){
    const parsedConfig = parseConfig(config)
    if(parsedConfig){
      const command = testCommands(parsedConfig, args);
      if(command) {
        return {
          command: parseCommand(command.command, command.args.split(' ')),
          args: command.args,
          cwd: current,
        }
      }
    }
    console.log("Couldnt parse config file");
  }
  if(current === ROOT) return findGlobalConfig();
  return findCommand(args, path.resolve(current, '..'));
}