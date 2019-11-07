import findCommand from './findCommand';
import exeuteShellCommand from './executeShellCommand';

export default function executeCommand(userCommand: string[]){
  const { command, args, cwd } = findCommand(userCommand)
  console.log(command, args)
  if(!command) return false
  exeuteShellCommand(command, args.split(' '), cwd);
  return true;
}