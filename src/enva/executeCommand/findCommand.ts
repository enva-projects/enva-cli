import fs from 'fs';
import path from 'path';
import {
  execSync
} from 'child_process';

const CONFIG_FILE_CONFIGS = {
  '.envarc': 'json',
  '.envarc.js': 'js',
  'envarc.yml': 'yml'
}

const ROOT = '/';

function parseCommand(command: string, args: string[]){
  const commandRegexp = /\${?\d*(:.*?})?/g;
  return command.replace(commandRegexp, (item)=>{
    const itemWithDefaultRegexp = /\${(\d+):(.+?)}/;
    const splittedItem = itemWithDefaultRegexp.exec(item);
    if(splittedItem){
      return args[Number(splittedItem[1]) - 1] || splittedItem[2]
    }else {
      const numberOfArg = item.replace('$', '');
      if(numberOfArg) {
        return args[Number(numberOfArg) - 1] || ''
      }
      return args.join(' ');
    }
  }).replace(/\s{2,}/, ' ').trim();
}

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

function parseConfig({ data, type }){
  return JSON.parse(data);
}

function findConfig(directory){
  for(const configFileName of Object.keys(CONFIG_FILE_CONFIGS)){
    const configFileAddress = path.resolve(directory, configFileName)
    if(fs.existsSync(configFileAddress)) {
      return {
        data: fs.readFileSync(configFileAddress, 'utf-8'),
        type: CONFIG_FILE_CONFIGS[configFileAddress],
      }
    }
  }
  return false;
}

function findGlobalConfig(){
  const globalPath = execSync('npm root').toString().trim();
  return findConfig(globalPath)
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