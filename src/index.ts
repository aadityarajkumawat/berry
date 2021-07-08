#!/usr/bin/env node

import chalk from 'chalk'
import { State } from './elephant/manageState'
import { addEditorConfig } from './olives/addEditorConfig'
import { addGitIgnore } from './olives/addGitIgnore'
import { addPrettierrc } from './olives/addPrettierrc'
import { getListOfProcessByPort } from './olives/getListOfProcessByPort'
import { killProcessByPort } from './olives/killProcessByPort'
import { printCWD } from './olives/printCWD'

/**
 * List of features that I want to have
 *
 * 1) Add .editorconfig file in pwd.
 * 2) Kill a process on a particular port.
 * 3) Add a .gitignore
 */

const berryArgs = process.argv.slice(2)
const commandType = berryArgs[0]
const $3s = '   '

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
        console.log('cool')
        break
    case '--help':
    case '-h':
        console.log(`   Usage
   [commands]:
        add: adds the required file.
        kill-port: kills the running process on a port
        pwd: gives the current path

   [add command]:
        editorconfig - adds an editorconfig file
        gitignore - adds a gitignore file
        prettierrc - adds a prettierrc file, while minimal config

   [kill-port]:
        <port-number> - kills process on a particular port
        `)
        break
    default:
        console.log(chalk.greenBright(`${$3s}|||| Welcome to berryx ||||`))
        console.log(
            `\n${$3s}Berryx was developed to do tasks that I don't like\n${$3s}doing manaually or are better to do using terminal`,
        )
        console.log(
            `\n${$3s}Github Repository: https://github.com/aadityarajkumawat/berry\n${$3s}--help | -h: To see all options`,
        )
        console.log(
            chalk.hex('#dccfff').bold(`\n${$3s}Author: Aditya Raj Kumawat`),
        )
}
