#!/usr/bin/env node

const parseTsConfig = require('./tsconfig');
const compile = require('./compile');

const tsconfig = parseTsConfig();
compile(tsconfig.fileNames, tsconfig.options);
