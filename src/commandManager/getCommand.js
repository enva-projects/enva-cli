module.exports = function getCommand (command, { commands }) {
  if (typeof commands[command[0]] === 'object') {
    if (command[1] && commands[command[0]][command[1]]) {
      return {
        command: commands[command[0]][command[1]],
        args: [...command].splice(2)
      }
    }
    return null
  }
  if (commands[command[0]]) {
    return {
      command: commands[command[0]],
      args: [...command].splice(1)
    }
  }
  return null
}
