#!/usr/bin/env node

import chalk from 'chalk';
import childProcess from 'child_process';
import fs from 'fs';
import path from 'path';
import readlineSync from 'readline-sync';
import { BooleanState } from './booleanState';
import { State } from './manageState';
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
const execSync = childProcess.execSync;

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
    case 'kill-port':
        if (berryArgs[1]) {
            const port = parseInt(berryArgs[1]);
            getListOfProcessByPort(port);
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
        console.log(chalk.green('+ Added a new editor config'));
    }
}

function getListOfProcessByPort(port: number) {
    const pidState = new State<number | undefined>(undefined);

    try {
        const stdout = execSync(`lsof -i:${port}`, {
            encoding: 'utf-8',
        });

        const processData = stdout.split('\n');

        const columns = processData[0];
        const values = processData[1];

        const colNamesArray = columns.replace(/\s+/g, ',').split(',');
        const valNamesArray = values.replace(/\s+/g, ',').split(',');

        valNamesArray.length = colNamesArray.length;

        const indexOfPID = colNamesArray.indexOf('PID'); // 1
        pidState.setState(parseInt(valNamesArray[indexOfPID]));

        const PID = pidState.getState();
        if (!PID) return;

        killProcessByPort(PID);

        console.log(chalk.greenBright.bold('✓ Process terminated!!'));
    } catch (error) {
        if (error.status === 1) {
            console.log(
                chalk.magenta.bold(
                    `✕ There is no process running on port ${port}`,
                ),
            );
        }
    }
}

function killProcessByPort(pid: number) {
    execSync(`kill -9 ${pid}`, { encoding: 'utf-8' });
}

function printCWD() {
    child = exec('pwd', function (error, stdout, stderr) {
        console.log({ stdout, stderr });
        if (error) {
            console.log(error);
        }
    });
}
