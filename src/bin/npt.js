#!./node_modules/.bin/babel-node
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { docopt } from 'docopt';
import fs from 'fs-extra';
import Packer from '../index';

const execAsync = promisify(exec);

const doc =
`Usage:
  npt.js pack --config=<config> 
  npt.js test --config=<config>
  npt.js -h | --help

Options:
  -h  --help                shows help
  -c --config=<config>      config path
`;

async function pack({ config }) {
    const packer = new Packer(config);

    await packer.ready;
    await packer.packModule();
    await packer.prepare();
    await packer.packTests();
}

async function test({ config }) {
    await pack({ config });
    const cwd = path.resolve(config.dir);

    await execAsync('npm install --no-audit', { cwd });
    const { stdout } = await execAsync('npm run test', { cwd });

    console.log(stdout);
}

async function run(opts) {
    const configPath = path.resolve(opts['--config']);
    const config = await fs.readJSON(configPath);

    try {
        if (opts.pack) {
            await pack({ config });
        }

        if (opts.test) {
            await test({ config });
        }

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

run(docopt(doc));
