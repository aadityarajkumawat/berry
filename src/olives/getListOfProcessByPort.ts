import { chalk, execSync, State } from '../utils';

export function getListOfProcessByPort(
    port: number,
    pidState: State<number | undefined>,
) {
    try {
        const stdout = execSync(`lsof -i:${port}`, {
            encoding: 'utf-8',
        });

        const processData = stdout.split('\n');

        const columns = processData[0];
        const values = processData[1];

        const colNamesArray = columns.replace(/\s+/g, ',').split(',');
        const valNamesArray = values.replace(/\s+/g, ',').split(',');

        valNamesArray.length = colNamesArray.length;

        const indexOfPID = colNamesArray.indexOf('PID'); // 1
        pidState.setState(parseInt(valNamesArray[indexOfPID]));

        console.log(chalk.greenBright.bold('✓ Process terminated!!'));
    } catch (error) {
        if (error.status === 1) {
            console.log(
                chalk.magenta.bold(
                    `✕ There is no process running on port ${port}`,
                ),
            );
        }
    }
}
