import { spawn, execSync } from 'child_process';
import path from 'path';
import fs from 'fs-extra';
import {
    getTestCommand,
    getPrepareCommands
} from '../utils';

async function main() {
    const { platform, versions } = process;

    console.log(JSON.stringify({ platform, versions }));
    const packageJSON = await fs.readJSON(path.join(process.cwd(), 'package.json'));
    const config = packageJSON['node-package-tester'];
    const testCommand = getTestCommand(config, { platform, versions });
    const prepareCommands = getPrepareCommands(config, { platform, versions });

    for (const prepareCommand of prepareCommands) {
        execSync(prepareCommand);
    }

    const childProcess = spawn('npm', [ 'run', testCommand ], { shell: true, stdio: 'inherit' });

    childProcess.on('exit', (code) => process.exit(code));
}

main();

