#!/usr/bin/env node

/**
 * List of features that I want to have
 *
 * 1) Add .editorconfig file in pwd.
 * 2) Kill a process on a particular port.
 * 3) ...
 */

const berryArgs = process.argv.slice(2);
const cwd = process.cwd();

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
        console.log(process.cwd());
        break;
    default:
        console.log('default what!');
}

function addEditorConfig() {
    console.log('Added an editor config');
}
