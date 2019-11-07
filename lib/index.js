#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var enva_1 = __importDefault(require("./enva"));
var en_1 = __importDefault(require("./locale/en"));
var args = process.argv.splice(2);
var _a = enva_1.default(args), status = _a.status, message = _a.message;
if (!status)
    console.log(en_1.default[message]);
