import parseCommand from './parseCommand';

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

export default function findCommand(args: string[], config){
  const command = testCommands(config, args);
  if(command) {
    return {
      baseCommand: parseCommand(command.command, command.args.split(' ')),
      args: command.args.split(' '),
    }
  }
  return false;
}