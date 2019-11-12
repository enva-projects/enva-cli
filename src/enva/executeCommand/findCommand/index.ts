import parseCommand from './parseCommand';

function testCommands({ commands }: ConfigObject, args: string[]): { command: string, args: string[] }{
  const commandKeys = Object.keys(commands);
  for(const command of commandKeys){
    const commandRegex = new RegExp(`${command}(.*)`);
    const splittedCommand = commandRegex.exec(args.join(' '));
    if(splittedCommand) return {
        command: commands[command].trim(),
        args: splittedCommand[1].trim().split(' ')
      }
  }
  return {
    command: '',
    args: []
  };
}

export default function findCommand(userArgs: string[], config: ConfigObject): { baseCommand: string, args: string[] } {
  const { command, args } = testCommands(config, userArgs);
  return command ? {
    baseCommand: parseCommand(command, args),
    args,
  } : {
    baseCommand: '',
    args: []
  };
}