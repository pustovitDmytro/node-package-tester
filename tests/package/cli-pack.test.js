import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs-extra';
import { assert } from 'chai';
import { testsRootFolder } from '../constants';
import Test from '../Test';
import defaultConfig from '../files/.default-config';
import { resolve } from '../utils';

const execAsync = promisify(exec);

const factory = new Test();

suite('cli: pack #no-pack');

before(async function () {
    await factory.setTmpFolder();
});

const binPath = resolve('bin/npt.js');

test('Positive: cli on default config', async function () {
    const configPath = path.join(testsRootFolder, 'files/.default-config.json');

    await execAsync(`${binPath} pack -c "${configPath}"`, { shell: true });

    assert.isTrue(await fs.exists(path.resolve(defaultConfig.dir, 'package.json')), 'package.json exists');
});

test('Negative: dir not specified', async function () {
    const configPath = path.join(testsRootFolder, 'files/.no-dir-config.json');

    try {
        await execAsync(`${binPath} pack -c "${configPath}"`, { shell: true });
        assert.fail('command should fail');
    } catch (error)  {
        assert.include(error.toString(), "Error: 'dir' option is required");
    }
});

after(async function () {
    await factory.cleanTmpFolder();
});
