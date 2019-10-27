#!/usr/bin/env node
"use strict";
var commandManager = require('./commandManager');
var command = process.argv.slice(2);
if (commandManager.isEnvaCommand(command)) {
    commandManager.executeEnvaCommand(command);
}
else if (commandManager.doesCommandExists(command)) {
    commandManager.executeCommand(command);
}
else {
    console.error('Command not found!');
    process.exit(-1);
}
