import fs from 'fs';
import path from 'path';

const CONFIG_FILE_CONFIGS = {
  '.envarc': 'json',
  '.envarc.js': 'js',
  '.envarc.yml': 'yml'
}

export function findConfig(directory: string): { data: string, type: string }{
  for(const configFileName of Object.keys(CONFIG_FILE_CONFIGS)){
    const configFileAddress = path.resolve(directory, configFileName)
    if(fs.existsSync(configFileAddress)) {
      return {
        data: fs.readFileSync(configFileAddress, 'utf-8'),
        type: CONFIG_FILE_CONFIGS[configFileAddress],
      }
    }
  }
  return {
    data: '',
    type: '',
  };
}

export function parseConfig(data: string, type: string): ConfigObject{
  return JSON.parse(data);
}