module.exports = function getCommand (command, { commands }) {
  let finalCommand
  if (command.length > 1) {
    finalCommand = commands[command[0]] ? commands[command[0]][command[1]] : null
  } else {
    finalCommand = commands[command[0]]
  }
  if (!finalCommand) return null
  return finalCommand
}
