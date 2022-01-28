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
    const dir = path.join(tmpFolder, 'prepare_1');
    const packer = new Packer({
        dir,
        modules              : [ { name: 'eslint', legacy: '^7.0.0' }, { name: 'uuid' }, 'node-package-tester' ],
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
        'node-package-tester' : {
            legacyNodeVersions : '8',
            nodeVersions       : '14',
            legacyDependencies : { eslint: '^7.0.0' }
        }
    });
    [ 'eslint', 'uuid', 'node-package-tester' ].forEach(dep => {
        assert.exists(packageJSON.devDependencies[dep]);
    });
    assert.notEqual(packageJSON.devDependencies.eslint, '^7.0.0');
});


test('prepare: copy files to npt location', async function () {
    const dir = path.join(tmpFolder, 'prepare_2');
    const packer = new Packer({
        dir,
        copyDefaultFiles : true,
        copy             : [
            [ 'src/bin/npt.js', 'bin.js' ],
            [ 'unknown-path/1.js', 'unknown.js' ]
        ]
    });

    await packer.ready;
    await packer.packModule();
    await packer.prepare();

    for (const file of [ 'package.json', 'tests-init.js', '.mocharc.json', 'bin.js' ]) {
        assert.isTrue(await fs.exists(path.join(dir, file)), `${file} exists`);
    }

    assert.isFalse(await fs.exists(path.join(dir, 'unknown.js')), 'unknown.js exists');
});


after(async function () {
    await factory.cleanTmpFolder();
});
