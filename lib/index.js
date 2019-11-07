#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var enva_1 = __importDefault(require("./enva"));
var args = process.argv.splice(2);
enva_1.default(args);
