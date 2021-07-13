import { chalk } from '../utils'

const $3s = '   '

export function printToolDetails() {
    console.log(chalk.greenBright(`${$3s}|||| Welcome to berryx ||||`))
    console.log(
        `\n${$3s}Berryx was developed to do tasks that I don't like\n${$3s}doing manaually or are better to do using terminal`,
    )
    console.log(
        `\n${$3s}Github Repository: https://github.com/aadityarajkumawat/berry\n${$3s}--help | -h: To see all options`,
    )
    console.log(chalk.hex('#dccfff').bold(`\n${$3s}Author: Aditya Raj Kumawat`))
}
