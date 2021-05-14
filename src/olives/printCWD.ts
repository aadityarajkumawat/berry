import { exec } from '../utils';

export function printCWD() {
    exec('pwd', function (error, stdout, _) {
        console.log(stdout.substring(0, stdout.length - 1));
        if (error) {
            console.log(error);
        }
    });
}
