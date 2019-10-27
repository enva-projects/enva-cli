"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require('./configManager'), configObj = _a.config.configObj, path = _a.path;
var getCommand = require('./getCommand');
var executeCommand = require('./executeCommand');
var executeEnvaCommand = require('./executeEnvaCommand');
exports.default = {
    doesCommandExists: function (command) {
        return getCommand(command, configObj);
    },
    isEnvaCommand: function (_a) {
        var root = _a[0];
        return root === '-e' || !root;
    },
    executeCommand: function (userCommand) {
        var command = getCommand(userCommand, configObj);
        if (!command)
            throw new Error("Command doesn't exist!");
        executeCommand({
            command: command.command,
            args: command.args,
            cwd: path,
        });
    },
    executeEnvaCommand: function (_a) {
        var root = _a[0], command = _a[1];
        if (!this.isEnvaCommand([root]))
            throw new Error("Command isn't valid!");
        executeEnvaCommand([root, command]);
    },
};
