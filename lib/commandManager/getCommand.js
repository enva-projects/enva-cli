"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
module.exports = function getCommand(command, _a) {
    var commands = _a.commands;
    if (typeof commands[command[0]] === 'object') {
        if (command[1] && commands[command[0]][command[1]]) {
            return {
                command: commands[command[0]][command[1]],
                args: __spreadArrays(command).splice(2),
            };
        }
        return null;
    }
    if (commands[command[0]]) {
        return {
            command: commands[command[0]],
            args: __spreadArrays(command).splice(1),
        };
    }
    return null;
};
