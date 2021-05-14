import { editorConfigAlreadyExistsQuestion } from '../questions';
import {
    BooleanState,
    chalk,
    cwd,
    exec,
    fs,
    path,
    readlineSync,
} from '../utils';

export function addEditorConfig() {
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
        exec(`touch .editorconfig`, function (error, _, __) {
            if (error) {
                console.log(error);
                return;
            }

            const editorConfigContent = fs.readFileSync(
                path.join(__dirname, '..', 'content', 'editorconfig.txt'),
                { encoding: 'utf-8' },
            );

            fs.writeFileSync(
                path.join(cwd, '.editorconfig'),
                editorConfigContent,
                { encoding: 'utf-8' },
            );
        });
        console.log(chalk.green('+ Added a new .editorconfig file'));
    }
}
