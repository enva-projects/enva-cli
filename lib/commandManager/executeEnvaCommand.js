"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var enquirer_1 = __importDefault(require("enquirer"));
var configManager_1 = require("./configManager");
var merge_deep_1 = __importDefault(require("merge-deep"));
function createCommand() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, root, name, command, commandObj, configObj, configPath;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, enquirer_1.default.prompt([
                        {
                            type: 'input',
                            name: 'root',
                            message: 'What is command root?',
                        },
                        {
                            type: 'input',
                            name: 'name',
                            message: 'What is command name?',
                        },
                        {
                            type: 'input',
                            name: 'command',
                            message: 'What is command?',
                        },
                    ])];
                case 1:
                    _a = _d.sent(), root = _a.root, name = _a.name, command = _a.command;
                    commandObj = (_b = {},
                        _b[root] = (_c = {},
                            _c[name] = command,
                            _c),
                        _b);
                    configObj = configManager_1.config.configObj, configPath = configManager_1.config.path;
                    configObj.commands = merge_deep_1.default(configObj.commands, commandObj);
                    configManager_1.writeConfig(configPath, configObj);
                    return [2 /*return*/];
            }
        });
    });
}
function deleteCommand() {
    return __awaiter(this, void 0, void 0, function () {
        var roots, root, nodes, node, configObj, configPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    roots = configManager_1.commandRoots;
                    if (!roots.length) {
                        console.log('No commands found.');
                        process.exit(-1);
                    }
                    return [4 /*yield*/, enquirer_1.default.prompt([
                            {
                                type: 'select',
                                name: 'root',
                                message: 'Pick a command root',
                                choices: roots,
                            },
                        ])];
                case 1:
                    root = (_a.sent()).root;
                    nodes = configManager_1.getCommandNodes(root);
                    if (!nodes.length) {
                        console.log('No commands found.');
                        process.exit(-1);
                    }
                    return [4 /*yield*/, enquirer_1.default.prompt([
                            {
                                type: 'select',
                                name: 'node',
                                message: 'Pick a node',
                                choices: __spreadArrays(['All'], nodes),
                            },
                        ])];
                case 2:
                    node = (_a.sent()).node;
                    configObj = configManager_1.config.configObj, configPath = configManager_1.config.path;
                    if (node === 'All') {
                        delete configObj.commands[root];
                    }
                    else {
                        delete configObj.commands[root][node];
                    }
                    configManager_1.writeConfig(configPath, configObj);
                    return [2 /*return*/];
            }
        });
    });
}
module.exports = function (_a) {
    var root = _a[0], command = _a[1];
    if (root === 'init' || !root) {
        configManager_1.createBasicConfig();
    }
    else if (command === 'a') {
        createCommand();
    }
    else if (command === 'd') {
        deleteCommand();
    }
    else {
        console.error('Enva command not found!');
    }
};
