import { exec } from '../utils';

export function printCWD() {
    exec('pwd', function (error, stdout, stderr) {
        console.log({ stdout, stderr });
        if (error) {
            console.log(error);
        }
    });
}
