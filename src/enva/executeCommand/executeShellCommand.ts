const {
  execSync
} = require('child_process')

export default function executeShellCommand(command: string, args: string[] = [], cwd: string): void {
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
