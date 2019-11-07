const {
  execSync
} = require('child_process')

export default function executeShellCommand(command, args: string[] = [], cwd = process.env.PWD || '.') {
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
