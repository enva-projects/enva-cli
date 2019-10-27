const {
  execSync
} = require('child_process')

module.exports = ({command, cwd, args}) => {
  const commandWithArgs = `${command} ${args.join(' ')}`
  execSync(commandWithArgs, {
    cwd,
    env: {
      ...process.env,
      args
    },
    stdio: 'inherit'
  })
}
