# ts-express-empty
Just an empty typescript/express app to save some time setting up.

This repo is for you if you happen to like the exact same dependencies as I, and you don't want to spend a bunch of time setting it up.

Anyone may use this repository as a starting point without giving credit. You may not hold me legally responsible for any problems, but you may insult me for them.

## Contents
- [Notable Dependencies](#notable-dependencies)
- [Scripts](#scripts)
  - [`start`](#npm-start)
  - [`compile`](#npm-run-compile)
  - [`compiling`](#npm-run-compiling)
  - [`test`](#npm-test)
  - [`testing`](#npm-run-testing)
  - [`lint`](#npm-run-lint)
  - [`linting`](#npm-run-linting)
  - [`concatenate`](#npm-run-concatenate)
  - [`concatenating`](#npm-run-concatenating)
- [File Structure](#file-structure)
  - [`app/`](#app)
    - [`app/views/`](#app-views)
    - [`app/routes/`](#app-routes)
    - [`app/public/`](#app-public)
  - [`modules/`](#modules)
  - [`test/`](#test)
  - [`scripts/`](#scripts-1)

## Notable Dependencies
- Language – [TypeScript](https://www.typescriptlang.org/)
- Framework – [Express](https://expressjs.com/)
- Template engine – [Pug](https://pugjs.org/)
- CSS preprocessor – [Less](http://lesscss.org/)
- Testing framework – [Mocha](https://mochajs.org/), [Sinon](http://sinonjs.org/), [Chai](http://chaijs.com/), and [Istanbul](https://istanbul.js.org/).
- Linters – [tslint](https://palantir.github.io/tslint/) and [pug-lint](https://github.com/pugjs/pug-lint)

For a full list of dependencies just read `package.json`.

## Scripts

#### `npm start`

Runs the server on the set port, or by default port 3000. Does not automatically rerun on changes.

#### `npm run compile`

Compiles the .ts files into .js files. Also runs [`concatenate`](#npm-run-concatenate).

#### `npm run compiling`

Reruns [`compile`](#npm-run-compile) on file changes.

#### `npm test`

Runs the [Mocha](https://mochajs.org/) tests.

#### `npm run testing`

Reruns [`test`](#npm-run-test) on file changes.

#### `npm run lint`

Runs tslint and pug-lint.

#### `npm run linting`

Reruns [`lint`](#npm-run-lint) on file changes. Seems to run too often – use with caution.

#### `npm run concatenate`

Concatenates every file that ends with `.js` in `app/public/subscripts` and subdirectories into `app/public/subscripts/script.js`. This allows pages to get the javascript with only one network request.

#### `npm run concatenating`

Reruns [`concatenate`](#npm-run-concatenate) on file changes.

## File Structure

### `app/`

`app/` holds things unique to this project and intended for production.

#### `app/views/`

`app/views/` holds the `.pug` files.

#### `app/routes/`

`app/routes/` holds the `express.Router`s. The directory structure reflects that paths on the website.

#### `app/public/`

Anything in `app/public/` can be loaded from `[url]/public/`.

It contains:
- `app/public/icons` for favicons.
- `app/public/styles` for `.less` files. Everything in this directory is `@import`ed into `style.less` so that only one network request must be made.
- `app/public/scripts` for generated `.js` files. Nothing is manually put here.
- `app/public/subscripts` for `.ts` files that will available on the client. Anything in here will be compiled and concatenated into `app/public/scripts/script.js`.

### `modules/`

`modules/` holds generic utility type files that could theoretically standalone on npm.

### `test/`

`test/` holds the [Mocha](https://mochajs.org/) tests. Everything in this directory will be run by [`npm test`](#npm-test).

### `scripts/`

`scripts/` holds anything used by scripts.
