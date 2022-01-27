import path from 'path';
import { assert } from 'chai';
import fs from 'fs-extra';
import Packer from '../entry';
import Test from '../Test';
import { tmpFolder } from '../constants';

const factory = new Test();

suite('Packer #no-pack');

before(async function () {
    await factory.setTmpFolder();
});

test('prepare: specify legacy versions', async function () {
    const dir = path.join(tmpFolder, 'prepare');
    const packer = new Packer({
        dir,
        modules              : [ { name: 'eslint', legacy: '^7.0.0' } ],
        copyDefaultFiles     : true,
        legacyMochaVersion   : '5',
        legacyNodeVersion    : '8',
        supportedNodeVersion : '14'
    });

    await packer.ready;
    await packer.packModule();
    await packer.prepare();

    assert.isTrue(await fs.exists(path.join(dir, 'package.json')), 'package.json exists');

    const packageJSON = await fs.readJSON(path.join(dir, 'package.json'));

    assert.deepOwnInclude(packageJSON, {
        legacyDependencies    : { eslint: '^7.0.0' },
        'node-package-tester' : { legacyNodeVersions: '8', nodeVersions: '14' }
    });

    assert.exists(packageJSON.devDependencies.eslint);
    assert.notEqual(packageJSON.devDependencies.eslint, '^7.0.0');
});


after(async function () {
    await factory.cleanTmpFolder();
});
