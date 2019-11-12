const {
  execSync
} = require('child_process')

export default function executeShellCommand(command: string, args: string[], cwd: string): void {
  execSync(command, {
    cwd,
    env: {
      ...process.env,
      args
    },
    stdio: 'inherit'
  })
}
