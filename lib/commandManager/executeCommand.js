"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var execSync = require('child_process').execSync;
module.exports = function (_a) {
    var command = _a.command, cwd = _a.cwd, args = _a.args;
    var commandWithArgs = command + " " + args.join(' ');
    execSync(commandWithArgs, {
        cwd: cwd,
        env: __assign(__assign({}, process.env), { args: args }),
        stdio: 'inherit'
    });
};
