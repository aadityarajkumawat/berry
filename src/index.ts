#!/usr/bin/env node

import childProcess from 'child_process';
import fs from 'fs';
import path from 'path';
import readlineSync from 'readline-sync';
import { BooleanState } from './booleanState';
import { editorConfigAlreadyExistsQuestion } from './questions';

/**
 * List of features that I want to have
 *
 * 1) Add .editorconfig file in pwd.
 * 2) Kill a process on a particular port.
 * 3) ...
 */

const berryArgs = process.argv.slice(2);
const cwd = process.cwd();

const exec = childProcess.exec;
let child;

const commandType = berryArgs[0];

switch (commandType) {
    case 'add':
        if (berryArgs[1] === 'editorconfig') {
            addEditorConfig();
        } else {
            console.log('what do i add');
        }
        break;
    case 'pwd':
        printCWD();
        break;
    default:
        console.log('default what!');
}

function addEditorConfig() {
    const filesAndDirectories = fs.readdirSync(cwd, { encoding: 'utf-8' });
    const editorConfigExists = new BooleanState(false);

    if (filesAndDirectories.includes('.editorconfig')) {
        const answer = readlineSync.question(editorConfigAlreadyExistsQuestion);

        if (answer === 'Y' || answer === 'y') {
            editorConfigExists.setFalse();
        } else if (answer === 'N' || answer === 'n') {
            editorConfigExists.setTrue();
            console.log('OK');
        } else {
            console.log("This won't execute");
        }
    }

    if (!editorConfigExists.getBoolState()) {
        child = exec(`touch .editorconfig`, function (error, _, __) {
            if (error) {
                console.log(error);
                return;
            }

            const editorConfigContent = fs.readFileSync(
                path.join(__dirname, 'content', 'editorconfig.txt'),
                {
                    encoding: 'utf-8',
                },
            );

            fs.writeFileSync(
                path.join(cwd, '.editorconfig'),
                editorConfigContent,
                { encoding: 'utf-8' },
            );
        });
        console.log('Added a new editor config');
    }
}

function printCWD() {
    child = exec('pwd', function (error, stdout, stderr) {
        console.log({ stdout, stderr });
        if (error) {
            console.log(error);
        }
    });
}
