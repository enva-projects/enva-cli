interface StatusWithMessage {
  status: boolean,
  message: string
}

interface ConfigObject {
  commands: Object,
  plugins: [
    {
      name: string,
      command: string
    }
  ]
}