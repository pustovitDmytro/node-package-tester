import semver from 'semver';

export function getTestCommand(config, { platform, versions }) {
    const nodeVersion = versions.node;
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

export function getPrepareCommands(config, { versions }) {
    const commands = [];
    const nodeVersion = versions.node;
    const isLegacyVersion = semver.satisfies(nodeVersion, config.legacyNodeVersions);

    if (isLegacyVersion) {
        const deps = Object.keys(config.legacyDependencies).map(depName => `${depName}@${config.legacyDependencies[depName]}`);

        if (deps.length > 0) commands.push(`npm install --no-save ${deps.join(' ')}`);
    }

    return commands;
}
