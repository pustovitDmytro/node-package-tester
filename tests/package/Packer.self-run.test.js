import path from 'path';
import { assert } from 'chai';
import fs from 'fs-extra';
import Packer from '../entry';
import Test from '../Test';
import { tmpFolder } from '../constants';

const factory = new Test();

suite('Packer: self run');

before(async function () {
    await factory.setTmpFolder();
});

test('packModule', async function () {
    const dir = path.join(tmpFolder, 'packModule');
    const packer = new Packer({ dir });

    await packer.ready;
    await packer.packModule();

    const tarPath = packer.tarPath;

    assert.notInclude(path.relative(dir, tarPath), '..', 'tarPath should be inside dir');
    assert.isTrue(await fs.exists(tarPath), 'tarFile exists');
});

test('packTests', async function () {
    const dir = path.join(tmpFolder, 'packTests');
    const packer = new Packer({ dir });

    await packer.ready;
    await packer.packModule();
    await packer.packTests();

    assert.isTrue(await fs.exists(path.join(dir, 'tests.js')), 'tests.js exists');
});

test('prepare', async function () {
    const dir = path.join(tmpFolder, 'prepare');
    const packer = new Packer({
        dir,
        copy : [ [ 'tests/init.js',  'tests-init.js' ] ]
    });

    await packer.ready;
    await packer.packModule();
    await packer.prepare();

    assert.isTrue(await fs.exists(path.join(dir, 'package.json')), 'package.json exists');
});


after(async function () {
    await factory.cleanTmpFolder();
});
