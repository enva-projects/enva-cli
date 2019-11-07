export default function parseCommand(command: string, args: string[]){
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