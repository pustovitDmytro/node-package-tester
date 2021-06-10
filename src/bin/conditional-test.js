#!./node_modules/.bin/babel-node
/* eslint-disable censor/no-swear */

import { spawn } from 'child_process';
import path from 'path';
import semver from 'semver';

const { platform, versions } = process;
const nodeVersion = versions.node;

console.log(JSON.stringify({ platform, versions }));
// eslint-disable-next-line security/detect-non-literal-require
const packageJSON = require(path.join(process.cwd(), 'package.json'));
const config = packageJSON['node-package-tester'];

function getCommand() {
    const isLegacyVersion = semver.satisfies(nodeVersion, config.legacyNodeVersions);
    const isNodeVersion = semver.satisfies(nodeVersion, config.nodeVersions);
    const isWin = platform === 'win32';

    if (isLegacyVersion) {
        if (isWin) return 'test-win:legacy';

        return 'test-unix:legacy';
    }

    if (isNodeVersion) {
        if (isWin) return 'test-win';

        return 'test-unix';
    }

    throw new Error(`Node ${nodeVersion} version not supported by ${JSON.stringify(config)}`);
}

const command = getCommand();

const childProcess = spawn('npm', [ 'run', command ], { shell: true, stdio: 'inherit' });

childProcess.on('exit', (code) => process.exit(code));

