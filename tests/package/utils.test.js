import { assert } from 'chai';
import { load } from '../utils';
import '../Test';

suite('Utils');

const { getTestCommand, getPrepareCommands } = load('utils');

const config = {
    'legacyNodeVersions' : '>=10 <12',
    'nodeVersions'       : '>=12 <=16',
    'legacyDependencies' : {
        'eslint' : '^7.32.0'
    }
};

test('getTestCommand', async function () {
    assert.equal(
        getTestCommand(
            config,
            {
                platform : 'win32',
                versions : { node: '10.17.3' }
            }
        ),
        'test-win:legacy'
    );

    assert.equal(
        getTestCommand(
            config,
            {
                platform : 'darwin',
                versions : { node: '10.17.3' }
            }
        ),
        'test-unix:legacy'
    );

    assert.equal(
        getTestCommand(
            config,
            {
                platform : 'win32',
                versions : { node: '14.17.3' }
            }
        ),
        'test-win'
    );

    assert.equal(
        getTestCommand(
            config,
            {
                platform : 'linux',
                versions : { node: '14.17.3' }
            }
        ),
        'test-unix'
    );

    assert.throw(
        () => getTestCommand(
            config,
            {
                platform : 'linux',
                versions : { node: '8.12.9' }
            }
        ),
        'Node 8.12.9 version not supported by {"legacyNodeVersions":">=10 <12","nodeVersions":">=12 <=16","legacyDependencies":{"eslint":"^7.32.0"}}'
    );
});

test('getPrepareCommands', async function () {
    assert.deepEqual(
        getPrepareCommands(
            config,
            {
                versions : { node: '10.17.3' }
            }
        ),
        [ 'npm install --no-save eslint@^7.32.0' ]
    );

    assert.deepEqual(
        getPrepareCommands(
            config,
            {
                versions : { node: '14.17.3' }
            }
        ),
        [ ]
    );

    assert.deepEqual(
        getPrepareCommands(
            { 'legacyNodeVersions': '>=10 <12', legacyDependencies: {} },
            {
                versions : { node: '10.17.3' }
            }
        ),
        [ ]
    );
});
