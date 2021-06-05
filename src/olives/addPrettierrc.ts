import { prettierExistsQuestion } from '../questions';
import {
    BooleanState,
    chalk,
    cwd,
    exec,
    fs,
    path,
    readlineSync,
} from '../utils';

export function addPrettierrc() {
    const filesAndDirectories = fs.readdirSync(cwd, { encoding: 'utf-8' });
    const gitIgnoreExists = new BooleanState(false);

    if (filesAndDirectories.includes('.prettierrc')) {
        const answer = readlineSync
            .question(prettierExistsQuestion)
            .toUpperCase();

        if (answer === 'Y') {
            gitIgnoreExists.setFalse();
        } else if (answer === 'N') {
            gitIgnoreExists.setTrue();
            console.log('OK');
        } else {
            // not executed
        }
    }

    if (!gitIgnoreExists.getBoolState()) {
        exec('touch .prettierrc', function (error, _, __) {
            if (error) {
                console.log(error);
                return;
            }

            const gitIgnoreContent = fs.readFileSync(
                path.join(__dirname, '..', 'content', 'prettierrc.txt'),
                { encoding: 'utf-8' },
            );

            fs.writeFileSync(path.join(cwd, '.prettierrc'), gitIgnoreContent, {
                encoding: 'utf-8',
            });
        });

        console.log(chalk.green('+ Added a new .prettierrc file'));
    }
}
