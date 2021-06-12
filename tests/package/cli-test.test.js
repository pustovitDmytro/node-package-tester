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

suite('cli: test #no-pack');

before(async function () {
    await factory.setTmpFolder();
});

const binPath = resolve('bin/npt.js');

test('cli on default config ', async function () {
    const configPath = path.join(testsRootFolder, 'files/.default-config.json');

    await execAsync(`node ${binPath} test -c "${configPath}"`);

    assert.isTrue(await fs.exists(path.resolve(defaultConfig.dir, 'package.json')), 'package.json exists');
});

after(async function () {
    await factory.cleanTmpFolder();
});
