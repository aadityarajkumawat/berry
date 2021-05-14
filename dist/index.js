#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = __importDefault(require("child_process"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const readline_sync_1 = __importDefault(require("readline-sync"));
const booleanState_1 = require("./booleanState");
const berryArgs = process.argv.slice(2);
const cwd = process.cwd();
const exec = child_process_1.default.exec;
let child;
const commandType = berryArgs[0];
switch (commandType) {
    case 'add':
        if (berryArgs[1] === 'editorconfig') {
            addEditorConfig();
        }
        else {
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
    const filesAndDirectories = fs_1.default.readdirSync(cwd, { encoding: 'utf-8' });
    const editorConfigExists = new booleanState_1.BooleanState(false);
    const question = '❓ .editorconfig already exists do you want to replace it? [y/n]\n';
    if (filesAndDirectories.includes('.editorconfig')) {
        const answer = readline_sync_1.default.question(question);
        if (answer === 'Y' || answer === 'y') {
            editorConfigExists.setFalse();
        }
        else if (answer === 'N' || answer === 'n') {
            editorConfigExists.setTrue();
            console.log('OK');
        }
        else {
            console.log("This won't execute");
        }
    }
    if (!editorConfigExists.getBoolState()) {
        child = exec(`touch .editorconfig`, function (error, _, __) {
            if (error) {
                console.log(error);
                return;
            }
            const editorConfigContent = fs_1.default.readFileSync(path_1.default.join(__dirname, 'content', 'editorconfig.txt'), {
                encoding: 'utf-8',
            });
            fs_1.default.writeFileSync(path_1.default.join(cwd, '.editorconfig'), editorConfigContent, { encoding: 'utf-8' });
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
//# sourceMappingURL=index.js.map