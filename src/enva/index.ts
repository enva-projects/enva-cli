//

import executeEnvaCommand from './executeEnvaCommand';
import executeCommand from './executeCommand';

export default function enva(args: string[]){
  if(args[0].startsWith('-')) {
    if(executeEnvaCommand(args)) {
      return {
        status: true,
        message: ''
      }
    }
  }
  return executeCommand(args)
}