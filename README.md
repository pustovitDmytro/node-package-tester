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
[![Security][snyk-badge]][snyk-url]
[![Build Status][tests-badge]][tests-url]
[![Coverage Status][badge-coverage]][url-coverage]

[![Commit activity][commit-activity-badge]][github]
[![FOSSA][fossa-badge]][fossa-url]
[![License][badge-lic]][github]

# 🇺🇦 Help Ukraine
I woke up on my 26th birthday at 5 am from the blows of russian missiles. They attacked the city of Kyiv, where I live, as well as the cities in which my family and friends live. Now my country is a war zone. 

We fight for democratic values, for freedom, for our future! 
I am stopping any support of my packages by the time until all russians leave my country on trucks or in boxes. 

💛💙  Help Ukraine! We need your support! There are dozen ways to help us, just do it!

## Table of Contents
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contribute](#contribute)

## Requirements
[![Platform Status][node-ver-test-badge]][node-ver-test-url]

To use library you need to have [node](https://nodejs.org) and [npm](https://www.npmjs.com) installed in your machine:

* node `>=10`
* npm `>=6`

Package is [continuously tested][node-ver-test-url] on darwin, linux and win32 platforms. All active and maintenance [LTS](https://nodejs.org/en/about/releases/) node releases are supported.

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
| `supportedNodeVersion` | no |  ```string```  | Supported NodeJS versions | `'>=12 <=16'` |
| `legacyNodeVersion` | no |  ```string```  | Legacy NodeJS versions | `'>=10 <12'` |
| `legacyMochaVersion` | no |  ```string```  | Mocha version, to run on `legacyNodeVersion` | `^6.0.0'` |

### Modules

List devDependencies, which need to be excluded from bundle and loaded with cjs. 

Use simple list:
```json
 "modules": [ "cls-hooked", "code-chronicle", "eslint" ] 
```

Or specify version for legacy nodeJS:

```json
 "modules": [ "cls-hooked", { "name": "eslint", "legacy": "^7.0.0" } ] 
```

### CI/CD

Some common examples of ci/cd integration can be found in [examples folder](./examples/ci).

For example, test npm package across darwin, linux, win32 platforms:

 - [Appveyour](https://www.appveyor.com): Test all active and maintenance LTS node releases using the next [appveyor.yml](examples/ci/appveyor.yml)
 - [GitHub Actions](https://github.com/features/actions): Test active and maintenance LTS node releases using the next [workflows.yml](examples/ci/npt.yml)

## Contribute

Make the changes to the code and tests. Then commit to your branch. Be sure to follow the commit message conventions. Read [Contributing Guidelines](.github/CONTRIBUTING.md) for details.

[npm]: https://www.npmjs.com/package/node-package-tester
[github]: https://github.com/pustovitDmytro/node-package-tester
[coveralls]: https://coveralls.io/github/pustovitDmytro/node-package-tester?branch=master
[badge-deps]: https://img.shields.io/librariesio/release/npm/node-package-tester.svg
[badge-vuln]: https://img.shields.io/snyk/vulnerabilities/npm/node-package-tester.svg?style=popout
[badge-vers]: https://img.shields.io/npm/v/node-package-tester.svg
[badge-lic]: https://img.shields.io/github/license/pustovitDmytro/node-package-tester.svg
[badge-coverage]: https://coveralls.io/repos/github/pustovitDmytro/node-package-tester/badge.svg?branch=master
[url-coverage]: https://coveralls.io/github/pustovitDmytro/node-package-tester?branch=master

[snyk-badge]: https://snyk-widget.herokuapp.com/badge/npm/node-package-tester/badge.svg
[snyk-url]: https://snyk.io/advisor/npm-package/node-package-tester

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

[node-ver-test-badge]: https://github.com/pustovitDmytro/node-package-tester/actions/workflows/npt.yml/badge.svg?branch=master
[node-ver-test-url]: https://github.com/pustovitDmytro/node-package-tester/actions?query=workflow%3A%22Node.js+versions%22

[fossa-badge]: https://app.fossa.com/api/projects/custom%2B24828%2Fnode-package-tester.svg?type=shield
[fossa-url]: https://app.fossa.com/projects/custom%2B24828%2Fnode-package-tester?ref=badge_shield