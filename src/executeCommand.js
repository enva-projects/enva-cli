const {
  execSync
} = require('child_process')

module.exports = (command, fileAddress) => {
  execSync(command, {
    cwd: fileAddress,
    env: process.env,
    stdio: 'inherit'
  })
}
