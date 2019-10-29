# Enva CLI

Shared and colabrative scripts on your command.

Enva CLI enables users to define most used commands so it can be sharable and much easier to use.

## Motivation

## Installation

```bash
$ npm install -g @enva/cli
```

Or install it using [Yarn](https://yarnpkg.com/)

```bash
$ yarn global add @enva/cli
```

## Usage

Enva uses `.envarc` files as config files to understand what commands you're going to use in your enviroment. Here's an example:

`~/.envarc`

```json
{
    "commands": {
        // Yarn helpers
        "y": "yarn",
        "yi": "yarn add $1 $", // enva yi

        // Git aliases
        "clone": "git clone https://github.com/${2:johndoe}/$1; cd $1;"
    }
}
```

## Contributing

_Contributing guide on going_

## License

[MIT](./LICENSE)
