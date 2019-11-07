const envaCommands = {
  init(){
    console.log("INIT")
  }
}

export default function executeEnvaCommand(args: string[]){
  const envaCommand = args[0].toLowerCase().trim().replace(/-/g, '')
  if(envaCommand in envaCommands) {
    envaCommands[envaCommand]();
    return true;
  }
  return false;
}