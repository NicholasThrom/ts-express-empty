# ts-express-empty
Just an empty typescript/express app to save some time setting up.

This repository is primarily for me.

However, this repository may also be for you
if you happen to like the exact same dependencies as I,
and you don't want to spend a bunch of time setting it up.

If you do decide to use this repository,
there are a couple of opinionated files you will wish to change.
`package.json` contains the name, description, and version of this repository.
`LICENSE` contains this repository's license.
`style-guide.md`, `tslint.json`, `ts-config.json`, and `pug-lintrc.json`,
contain very opinionated instructions on how to write your code.

You may use this repository as a starting point without giving credit.
You may not hold me legally responsible for any problems,
but you may insult me for them.

## Contents
- [Notable Dependencies](#notable-dependencies)
- [Scripts](#scripts)
    - [`start`](#npm-start)
    - [`test`](#npm-test)
    - [`lint`](#npm-run-lint)
    - [`typecheck`](#npm-run-typecheck)
    - [`mocha`](#npm-run-mocha)
    - [`coverage`](#npm-run-coverage)
    - [`compile`](#npm-run-compile)
- [File Structure](#file-structure)

## Notable Dependencies
- Language – [TypeScript](https://www.typescriptlang.org/)
- Framework – [Express](https://expressjs.com/)
- Template engine – [Pug](https://pugjs.org/)
- JS minification — [webpack](https://webpack.js.org/)
- CSS preprocessor –
    [Less](http://lesscss.org/)
    and [clean-css](https://github.com/jakubpawlowicz/clean-css)
- Testing framework –
    [Mocha](https://mochajs.org/),
    [Sinon](http://sinonjs.org/),
    [Chai](http://chaijs.com/),
    and [Istanbul](https://istanbul.js.org/)
- Linters –
    [tslint](https://palantir.github.io/tslint/)
    and [pug-lint](https://github.com/pugjs/pug-lint)

For a full list of dependencies see `package.json`.

## Scripts

#### `npm start`

Runs the server on the set port, or by default port 3000.
Does not automatically rerun on changes.

#### `npm test`

Runs [lint](#npm-run-lint),
[typecheck](#npm-run-typecheck),
and [mocha](#npm-run-mocha).

#### `npm run lint`

Runs `tslint` and `pug-lint`.

#### `npm run typecheck`

Runs `tsc` with `--no-emit` to ensure files are well typed.

#### `npm run mocha`

Runs the [mocha](https://mochajs.org/) tests.

#### `npm run coverage`

Generates a coverage from istanbul and [mocha](#npm-run-mocha).

#### `npm run compile`

Compiles the files in `app/client`, putting them in `public`.
See [`npm run compile-js`](#npm-run-compile-js)
and [`npm run compile-css`](#npm-run-compile-css)
for details.

#### `npm run compile-js`

Compiles everything in `app/client/scripts/index.ts`,
as well as any files it imports,
and places it in `public/scripts/script.js`.

#### `npm run compile-css`

Compiles everything in `app/client/styles/index.ts`,
as well as any files it imports,
and places it in `public/styles/style.js`.

## File Structure

Most directories contain a `README` explaining their purpose
in more detail.

`app/` contains everything about the function of this app.

`test/` contains tests for this app, as well as testing utilities.

`public/` contains files that are accessible from `[url]/public`.
There is no `README` there since it would be publicly accessible.

`scripts/` contains files for `ts-node` to run.
