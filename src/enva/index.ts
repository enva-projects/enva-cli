//

import executeEnvaCommand from './executeEnvaCommand';
import executeCommand from './executeCommand';

export default function enva(args: string[]){
  if(args[0].startsWith('-')) {
    if(!executeEnvaCommand(args)) console.log("Enva Command Not Found!");
  }
  if(!executeCommand(args)) console.log("Command Not Found!");
}