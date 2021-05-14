import chalk from 'chalk';
import childProcess from 'child_process';
import fs from 'fs';
import path from 'path';
import readlineSync from 'readline-sync';
import { BooleanState } from './elephant/booleanState';
import { State } from './elephant/manageState';

const berryArgs = process.argv.slice(2);
const cwd = process.cwd();

const exec = childProcess.exec;
const execSync = childProcess.execSync;

let child;

export {
    chalk,
    childProcess,
    fs,
    path,
    readlineSync,
    BooleanState,
    State,
    berryArgs,
    cwd,
    exec,
    execSync,
    child,
};
