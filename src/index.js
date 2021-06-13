
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import os from 'os';
import { rollup } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import multi from '@rollup/plugin-multi-entry';
import babel from '@rollup/plugin-babel';
import fs from 'fs-extra';
import packageInfo from '../package.json';

const execAsync = promisify(exec);
const rootDir = path.join(__dirname, '../');

export default class Packer {
    constructor({ dir, copy = [], modules = [], copyDefaultFiles } = {}) {
        const packageJSONPath = path.resolve(process.cwd(), 'package.json');

        if (!dir) throw new Error("'dir' option is required");
        this.dir = path.resolve(dir);
        this.copy = copy;
        this.copy.push([ path.join(rootDir, 'lib/bin/conditional-test.js'), 'conditional-test.js' ]);
        if (copyDefaultFiles) {
            this.copy.push(
                [ path.join(rootDir, 'tests/init.js'),  'tests-init.js' ],
                [ path.join(rootDir, '.mocharc.bundle.json'), '.mocharc.json' ]
            );
        }

        this.modules = modules;
        this.modules.push('mocha');

        this.ready = this._init(packageJSONPath);
    }

    async _init(packageJSONPath) {
        await this.cleanup();
        [ this.packageInfo ] = await Promise.all([
            fs.readJSON(packageJSONPath),
            fs.ensureDir(this.dir)
        ]);
    }

    async cleanup() {
        await fs.remove(this.dir);
    }

    async packModule() {
        const { stdout } = await execAsync('npm pack');
        const filename = stdout.split(os.EOL).filter(i => i).pop().trim();

        this.tarPath = path.join(this.dir, filename);
        await fs.move(
            path.resolve(process.cwd(), filename),
            this.tarPath
        );
    }

    async prepare() {
        const nodeModulesPath = [ 'node_modules', this.packageInfo.name, 'lib' ];
        const devDependencies = this.packageInfo.peerDependencies || {};

        for (const dep of this.modules) {
            devDependencies[dep] = this.packageInfo.devDependencies[dep];
        }

        devDependencies['mocha-legacy'] = 'npm:mocha@^6.0.0';

        const unixEntry = path.posix.join(...nodeModulesPath);
        const winEntry = path.win32.join(...nodeModulesPath);

        const mochaLegacyPath = './node_modules/mocha-legacy/bin/mocha';
        const mochaLegacyUnix = path.posix.normalize(mochaLegacyPath);
        const mochaLegacyWin = path.win32.normalize(`${mochaLegacyPath}`);

        const testConfig = {
            'name'    : `${this.packageInfo.name}-tests`,
            'version' : this.packageInfo.version,
            'scripts' : {
                'test' : 'node conditional-test.js',

                'test-win'  : `set ENTRY=${winEntry}&& mocha --config .mocharc.json tests.js`,
                'test-unix' : `ENTRY="${unixEntry}" mocha --config .mocharc.json tests.js`,

                'test-win:legacy'  : `set ENTRY=${winEntry}&& node ${mochaLegacyWin} --config .mocharc.json tests.js`,
                'test-unix:legacy' : `ENTRY="${unixEntry}" ${mochaLegacyUnix} --config .mocharc.json tests.js`
            },
            'dependencies' : {
                [this.packageInfo.name] : path.basename(this.tarPath),
                semver                  : packageInfo.dependencies.semver
            },
            devDependencies,
            'node-package-tester' : {
                'legacyNodeVersions' : '>=10 <12',
                'nodeVersions'       : '>=12 <=16'
            }
        };

        await fs.writeJSON(path.resolve(this.dir, 'package.json'), testConfig);

        await Promise.all(this.copy.reverse().map(async ([ from, to ]) => {
            const fromPath = path.resolve(process.cwd(), from);
            const toPath = path.resolve(this.dir, to);

            if (await fs.exists(fromPath)) {
                await fs.copy(fromPath, toPath);
                console.log(`${fromPath} copied to ${toPath}`);
            } else console.log(`${fromPath} not found`);
        }));
    }

    async packTests() {
        const resolveIgnoreRegexp = `^(?!${this.modules.map(m => `^${m}$`).join('|')}).*$`;

        const bundle = await rollup({
            input   : 'tests/**/*test.js',
            plugins : [
                babel({
                    exclude      : 'node_modules/**',
                    babelHelpers : 'inline'
                }),
                resolve({
                    preferBuiltins : true,
                    // eslint-disable-next-line security/detect-non-literal-regexp
                    resolveOnly    : [ new RegExp(resolveIgnoreRegexp) ]
                }),
                commonjs({
                    include               : [ /node_modules/ ],
                    sourceMap             : false,
                    ignoreDynamicRequires : true
                }),
                json({
                    compact : true
                }),
                multi()
            ]
        });

        await bundle.write({
            file   : path.resolve(this.dir, 'tests.js'),
            format : 'cjs'
        });
    }
}
