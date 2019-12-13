#!/usr/bin/env node

import enva from './enva'

import translations from './locale/en'

const args = process.argv.splice(2)

const { status, message } = enva(args)

if (!status) console.log(translations[message])
