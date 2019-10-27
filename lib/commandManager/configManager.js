"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var path_1 = require("path");
var child_process_1 = require("child_process");
var CONFIG_FILE_NAME = '.envarc';
function getGlobalPath() {
    return child_process_1.execSync('npm root -g', { encoding: 'utf8' });
}
function getGlobalConfigFile() {
    var envaPath = getGlobalPath().trim();
    var configFilePath = path_1.resolve(envaPath, CONFIG_FILE_NAME);
    if (fs.existsSync(configFilePath)) {
        return {
            path: envaPath,
            configObj: fs.readFileSync(path_1.resolve(envaPath, CONFIG_FILE_NAME), 'utf8'),
        };
    }
    return {
        path: envaPath,
        configObj: '{ "commands": {} }',
    };
}
function findNearestConfig(currentPath) {
    if (currentPath === void 0) { currentPath = process.env.PWD || ''; }
    var fileAddress = path_1.resolve(process.env.PWD || '', CONFIG_FILE_NAME);
    if (fs.existsSync(fileAddress)) {
        return {
            path: process.env.PWD,
            configObj: fs.readFileSync(fileAddress, 'utf8'),
        };
    }
    else if (currentPath !== '/') {
        return findNearestConfig(path_1.resolve(currentPath, '..'));
    }
    return null;
}
function getConfig() {
    var config = findNearestConfig(process.env.PWD) ? findNearestConfig(process.env.PWD) : getGlobalConfigFile();
    config.configObj = JSON.parse(config.configObj);
    return config;
}
function createBasicConfig() {
    var basicConfig = {
        commands: {
            git: {
                add: 'git add',
            },
        },
    };
    writeConfig(process.env.PWD, basicConfig);
}
exports.createBasicConfig = createBasicConfig;
function writeConfig(configPath, config) {
    fs.writeFileSync(path_1.resolve(configPath, CONFIG_FILE_NAME), JSON.stringify(config, null, 2));
}
exports.writeConfig = writeConfig;
function getCommandNodes(root) {
    var commands = getConfig().config.commands;
    return Object.keys(commands[root]);
}
exports.getCommandNodes = getCommandNodes;
var config = getConfig();
exports.config = config;
var commandRoots = Object.keys(config.configObj.commands);
exports.commandRoots = commandRoots;
