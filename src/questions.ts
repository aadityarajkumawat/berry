import chalk from 'chalk';

export const editorConfigAlreadyExistsQuestion = chalk.cyan(
    'A .editorconfig file already exists do you want to replace it?\n[y/n]: ',
);

export const gitIgnoreExistsQuestion = chalk.cyan(
    'A .gitignore already exists, do you want to replace it?\n[y/n]: ',
);
