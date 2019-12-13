interface StatusWithMessage {
    status: boolean
    message: string
}

type TEnvaCommand = () => void
type TEnvaCommandList = Record<string, TEnvaCommand>

interface ConfigObject {
    commands: Object
    plugins: [
        {
            name: string
            command: string
        }
    ]
}
