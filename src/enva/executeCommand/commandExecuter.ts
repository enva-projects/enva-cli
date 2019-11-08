const {
  execSync
} = require('child_process')

export async function executePlugin(plugin: string, userArgs: string[]){
  const fn = await import(plugin);
  fn.default(...userArgs);
}

export function executeShellCommand(command: string, args: string[], cwd: string): void {
  execSync(command, {
    cwd,
    env: {
      ...process.env,
      args
    },
    stdio: 'inherit'
  })
}
