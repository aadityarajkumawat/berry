import { execSync } from '../utils';

export function killProcessByPort(pid: number) {
    execSync(`kill -9 ${pid}`, { encoding: 'utf-8' });
}
