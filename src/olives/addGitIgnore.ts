import { gitIgnoreExistsQuestion } from '../questions';
import {
    BooleanState,
    chalk,
    cwd,
    exec,
    fs,
    path,
    readlineSync,
} from '../utils';

export function addGitIgnore() {
    const filesAndDirectories = fs.readdirSync(cwd, { encoding: 'utf-8' });
    const gitIgnoreExists = new BooleanState(false);

    if (filesAndDirectories.includes('.gitignore')) {
        const answer = readlineSync
            .question(gitIgnoreExistsQuestion)
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
        exec('touch .gitignore', function (error, _, __) {
            if (error) {
                console.log(error);
                return;
            }

            const gitIgnoreContent = fs.readFileSync(
                path.join(__dirname, '..', 'content', 'gitignore.txt'),
                { encoding: 'utf-8' },
            );

            fs.writeFileSync(path.join(cwd, '.gitignore'), gitIgnoreContent, {
                encoding: 'utf-8',
            });
        });

        console.log(chalk.green('+ Added a new .gitignore file'));
    }
}
