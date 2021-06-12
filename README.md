# node-package-tester
tool for testing npm packages.

[![Version][badge-vers]][npm]
[![Bundle size][npm-size-badge]][npm-size-url]
[![Downloads][npm-downloads-badge]][npm]

[![CodeFactor][codefactor-badge]][codefactor-url]
[![SonarCloud][sonarcloud-badge]][sonarcloud-url]
[![Codacy][codacy-badge]][codacy-url]
[![Total alerts][lgtm-alerts-badge]][lgtm-alerts-url]
[![Language grade][lgtm-lg-badge]][lgtm-lg-url]
[![Scrutinizer][scrutinizer-badge]][scrutinizer-url]

[![Dependencies][badge-deps]][npm]
[![Vulnerabilities][badge-vuln]](https://snyk.io/)
[![Build Status][tests-badge]][tests-url]
[![Coverage Status][badge-coverage]][url-coverage]

[![Commit activity][commit-activity-badge]][github]
[![FOSSA][fossa-badge]][fossa-url]
[![License][badge-lic]][github]

## Table of Contents
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contribute](#contribute)

## Requirements
[![Platform Status][appveyor-badge]][appveyor-url]

To use library you need to have [node](https://nodejs.org) and [npm](https://www.npmjs.com) installed in your machine:

* node `>=10`
* npm `>=6`

Package is [continuously tested][appveyor-url] on darwin, linux, win32 platforms. All active and maintenance [LTS](https://nodejs.org/en/about/releases/) node releases are supported.

## Installation

To install the library run the following command

```bash
  npm i --save-dev node-package-tester
```

## Usage

```
Usage:
  npt.js pack --config=<config> 
  npt.js test --config=<config>
  npt.js -h | --help

Options:
  -h  --help                shows help
  -c --config=<config>      config path
```

Example; 

```bash
  npt.js test -c .package-tester.json
```

### Configuration

Config sample

```json
{
    "dir": "tmp/package-tests",
    "copyDefaultFiles": true,
    "copy": [
        [ "tests/files/.default-config.json", "files/.default-config.json" ]
    ]
}
```

Config attribute description:

| Option | Required | Type | Description | Default |
|----|---|---|------------------------------------|------------------------------------|
| `dir`  | yes | ```string``` | Path to target directory (will be created automatically) |      |
| `copyDefaultFiles`    | no |  ```boolean```  | Copy default files. See [tests/init.js](tests/init.js) and [.mocharc.json](.mocharc.bundle.json)   | `false` |
| `copy`    | no |  ```array```  | Files to copy into packed tests | `[]` |
| `modules` | no |  ```array```  | Modules to copy into packed tests | `[]` |

## Contribute

Make the changes to the code and tests. Then commit to your branch. Be sure to follow the commit message conventions. Read [Contributing Guidelines](.github/CONTRIBUTING.md) for details.

[npm]: https://www.npmjs.com/package/node-package-tester
[github]: https://github.com/pustovitDmytro/node-package-tester
[coveralls]: https://coveralls.io/github/pustovitDmytro/node-package-tester?branch=master
[badge-deps]: https://img.shields.io/david/pustovitDmytro/node-package-tester.svg
[badge-vuln]: https://img.shields.io/snyk/vulnerabilities/npm/node-package-tester.svg?style=popout
[badge-vers]: https://img.shields.io/npm/v/node-package-tester.svg
[badge-lic]: https://img.shields.io/github/license/pustovitDmytro/node-package-tester.svg
[badge-coverage]: https://coveralls.io/repos/github/pustovitDmytro/node-package-tester/badge.svg?branch=master
[url-coverage]: https://coveralls.io/github/pustovitDmytro/node-package-tester?branch=master

[tests-badge]: https://img.shields.io/circleci/build/github/pustovitDmytro/node-package-tester
[tests-url]: https://app.circleci.com/pipelines/github/pustovitDmytro/node-package-tester

[codefactor-badge]: https://www.codefactor.io/repository/github/pustovitdmytro/node-package-tester/badge
[codefactor-url]: https://www.codefactor.io/repository/github/pustovitdmytro/node-package-tester

[commit-activity-badge]: https://img.shields.io/github/commit-activity/m/pustovitDmytro/node-package-tester

[scrutinizer-badge]: https://scrutinizer-ci.com/g/pustovitDmytro/node-package-tester/badges/quality-score.png?b=master
[scrutinizer-url]: https://scrutinizer-ci.com/g/pustovitDmytro/node-package-tester/?branch=master

[lgtm-lg-badge]: https://img.shields.io/lgtm/grade/javascript/g/pustovitDmytro/node-package-tester.svg?logo=lgtm&logoWidth=18
[lgtm-lg-url]: https://lgtm.com/projects/g/pustovitDmytro/node-package-tester/context:javascript

[lgtm-alerts-badge]: https://img.shields.io/lgtm/alerts/g/pustovitDmytro/node-package-tester.svg?logo=lgtm&logoWidth=18
[lgtm-alerts-url]: https://lgtm.com/projects/g/pustovitDmytro/node-package-tester/alerts/

[codacy-badge]: https://app.codacy.com/project/badge/Grade/6cfb66cf7c5543a1a5beb8c54ae46043
[codacy-url]: https://www.codacy.com/gh/pustovitDmytro/node-package-tester/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=pustovitDmytro/node-package-tester&amp;utm_campaign=Badge_Grade

[sonarcloud-badge]: https://sonarcloud.io/api/project_badges/measure?project=pustovitDmytro_node-package-tester&metric=alert_status
[sonarcloud-url]: https://sonarcloud.io/dashboard?id=pustovitDmytro_node-package-tester

[npm-downloads-badge]: https://img.shields.io/npm/dw/node-package-tester
[npm-size-badge]: https://img.shields.io/bundlephobia/min/node-package-tester
[npm-size-url]: https://bundlephobia.com/result?p=node-package-tester

[appveyor-badge]: https://ci.appveyor.com/api/projects/status/cvwovftl2hhvpo0r/branch/master?svg=true
[appveyor-url]: https://ci.appveyor.com/project/pustovitDmytro/node-package-tester/branch/master

[fossa-badge]: https://app.fossa.com/api/projects/custom%2B24828%2Fnode-package-tester.svg?type=shield
[fossa-url]: https://app.fossa.com/projects/custom%2B24828%2Fnode-package-tester?ref=badge_shield