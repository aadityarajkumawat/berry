#!/usr/bin/env node

import { State } from './elephant/manageState'
import { addEditorConfig } from './olives/addEditorConfig'
import { addGitIgnore } from './olives/addGitIgnore'
import { addPrettierrc } from './olives/addPrettierrc'
import { getListOfProcessByPort } from './olives/getListOfProcessByPort'
import { killProcessByPort } from './olives/killProcessByPort'
import { printCWD } from './olives/printCWD'
import { printToolDetails } from './river/defaultInfo'
import { help } from './river/help'

/**
 * List of features that I want to have
 *
 * 1) Add .editorconfig file in pwd.
 * 2) Kill a process on a particular port.
 * 3) Add a .gitignore
 * 4) Add a .prettierrc
 */

const berryArgs = process.argv.slice(2)
const commandType = berryArgs[0]

switch (commandType) {
    case 'add':
        if (berryArgs[1] === 'editorconfig') {
            addEditorConfig()
        } else if (berryArgs[1] === 'gitignore') {
            addGitIgnore()
        } else if (berryArgs[1] === 'prettierrc') {
            addPrettierrc()
        } else {
            console.log(`I have no idea about ${berryArgs[1]}`)
        }
        break
    case 'setup':
        addEditorConfig()
        addGitIgnore()
        addPrettierrc()
        break
    case 'kill-port':
        if (berryArgs[1]) {
            const pidState = new State<number | undefined>(undefined)
            const port = parseInt(berryArgs[1])

            getListOfProcessByPort(port, pidState)

            const PID = pidState.getState()
            if (!PID) break

            killProcessByPort(PID)
        }
        break
    case 'pwd':
        printCWD()
        break
    case '--help':
    case '-h':
        console.log(help)
        break
    default:
        printToolDetails()
}
