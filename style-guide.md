# Style Guide

This style guide exists to save time making trivial decisions.

This style guide does not claim to be objectively correct,
nor better than others.

## Contents

- [Things not included in this file](#things-not-included-in-this-file)
- [Markdown](#markdown)
- [File Structure](#file-structure)
- [Documentation Comments](#documentation-comments)
    - [Adjectives](#adjectives)
    - [_"should"_](#should)
    - [Formatting](#formatting)
- [Comments](#comments)
- [Code Formatting](#code-formatting)
- [Naming](#naming)
- [Exports & Modules](#exports-modules)
- [Tests](#tests)

## Things not included in this file

If something significant is not included in this file,
see what the rest of the code does, make a decision, and add it to this file.

## Markdown

Lines should not exceed 80 characters.
This improves diffs.

Break lines in natural places, not just after 80 characters.
This saves time if the length of one line changes.

## File Structure

Many directories are preferred to many files in a directory.
A directory with one file in it is acceptable.

If the purpose of a directory isn't immediately apparent,
place a `README.md` inside explaining it.

Many files are preferred to large files.

## Documentation Comments

Documentation comments are strongly preferred to no documentation comments.

More information is preferred to less information.

Concise documentation comments are preferred to verbose documentation comments.

Documentation comments that just restate the signature and type are useless.

### Adjectives

Some things have a few important attributes
that can quickly be described with a few adjectives.

This is the general use-case for jsdoc `@annotations`
but unfortunately not all useful adjectives are supported.

Adjectives should be added in a comma and newline separated list
at the top of the documentation.

Each adjective should be lowercase and bold.

The absence of an adjective does not imply its negation.
Adjectives are not mandatory.

Adjectives should be omitted if they are obvious.
For example, a function that returns `undefined`
need not be marked **deterministic**.

If an adjective seems useful but is not in this list,
add it to this list.

**Types:**
- **uninstantiable**: It cannot be instantiated.
- **immutable**: Its members cannot be changed
    after its construction.
- **mutable**: Its members can be changed
    after its construction.

**Fields:**
No adjectives here yet.

**Methods & Functions:**
- **pure**: The method has **no side effects** and is **deterministic**.
- **no side effects**: The method does not affect the universe
    other than providing a return value.
    For example: `x => 2 * x`.
- **side effects**: The method affects the universe.
    Side effects should be further described in documentation.
    For example: `x => that.y = x`.
- **mutates this**: The method affects `this`.
    Side effects should be further described in documentation.
    For example: `x => this.y = x`.
- **mutates argument[s]**: The method affects at least one argument.
    Side effects should be further described in documentation.
    For example: `x => x.y = 7`.
- **deterministic**: The method returns the same value
    given the same parameters
    and given the same, unchanged `this`.
    For example: `x => this.y + x`
- **nondeterministic**: The method returns a different value
    given the same parameters
    and given the same, unchanged `this`.
    For example: `x => x + Math.random()`
- **idempotent side effects**: The method's side effects have no effect
    when the method is called immediately following a previous call.
    For example: `x => this.x = x`
- **nonidempotent side effects**: The method's side effects have an effect
    when the method is called immediately following a previous call.
    For example: `x => this.x += x`
- **idempotent return**: If the function is unary,
    the function returns its first argument
    if the first argument is a return value of the function.
    For example: `x => Math.abs(x)`
    If the function is 0-ary,
    the function returns an object equivalent to its `this`,
    if its `this` value is a return value of the function.
    For example: `x => this.x === x ? this : new This(x)`
- **nonidempotent return**: If the function is unary,
    the function might not returns its first argument
    if the first argument is a return value of the function.
    For example: `x => x + 1`
    If the function is 0-ary,
    the function might not return an object equivalent to its `this`,
    if its `this` value is a return value of the function.
    For example: `x => this.children[x]`

### _"should"_

Do not use the word _"should"_ in documentation comments;
use documentation comments to tell what is, not what _"should"_ be.

For example, if a documentation comment says an argument _should_ be an integer,
it is ambiguous.
Will floats cause errors?
Will floats silently return incorrect results?
Will floats not be supported in the future?
Are floats against the philosophical purpose of the function?
Did the documenter just proclivity for integers?

Instead of using _"should"_,
state what happens if the argument is not an integer
and let the reader decide what they should do based on this behaviour.
Even better, use the word _"must"_ and throw an error if it is not.

### Formatting

Documentation comments should use markdown.

References to other classes should be wrapped in \`\`s.
Pluralizations of other classes should not be part of \`\`
unless the pluralization does not contain the original word.

For example, `` `Duck`s `` and `` `Geese` ``
are the plural of `` `Duck` `` and `` `Goose` ``.

References to parts of code should be used whenever possible.
For example, `` If the `Animal`s `.canFly` ``
is preferred to `If the animals can fly`.

## Comments

Comments may use markdown, even though they are not parsed.
Markdown is designed to be readable as plain text,
and documentation comments are written in markdown,
so anyone reading comments will be familiar with plaintext markdown.

## Code Formatting

Listen to `ts-lint`.

If something absolutely must go against `ts-lint`,
[disable the specific rule](ts-lint) with a comment.

[ts-lint]: https://palantir.github.io/tslint/usage/rule-flags/

`ts-lint` does not enforce the amount of indentation,
other than ensuring it is divisible by 4.
Obviously this should not be abused.

Where `ts-lint` does not have an opinion,
choose the most readable option.

## Naming

Consider reading [Swift's naming guidelines](swift-names).
Although they are not enforced in this style guide,
they are still useful to follow.

[swift-names]: https://swift.org/documentation/api-design-guidelines/#naming

Long descriptive names are preferred to short ambiguous names.

Short descriptive names are preferred to long descriptive names.

Words should not be shortened unless their long form would be surprising.

For example, `init`, `url`, and `cos`
are preferred to `initialize`, `universalResourceLocator`, and `cosine`.

Since `arguments` is used by the language,
`args` and `arg` are permitted.
More expressive names are preferred when possible.

If acronyms must be used, they should be all upper or lower case.

For example,
`nextURL` and `urlOfResource`
are preferred to `nextUrl` and `URLOfResource`.

Variable names that are accessible outside the file
in which they are declared must be descriptive without context.
Variable names that are not accessible outside the file
in which they are declared may rely on context to be descriptive.

For example, a private variable in the function `sum` may be named `result`,
but a public variable would be better named `sumOfInputs`.

## Exports & Modules

Default exports must not be used.

Primitives and functions must not be exported directly.

Each file may only have one export statement.
This export statement must be the last statement.
This export statement may include multiple things.

Any code run on the import of a file
that has side effects or relies on state outside the file
must be in a function on an exported object
so it can be unit tested.

## Tests

Test files must end in `.test.ts`.

Tests in a file must be in a `describe("file/name")`.

Every import must be tested for existence.

Each member must have its own `describe(".memberName")`.

Other `describe`s may be used.

`it` strings must start with the word `should`.
`it` strings must not end with punctuation.

Variables must be declared inside the describe.
The exception to this is `sandbox`,
as it is part of the `sinon` import,
and may be needed before importing the subject.

`assert` must not be called directly.

Only use `assert.isTrue` and `assert.ok` if that is actually what is meant.
For example, `assert.strictEqual(spy.callCount, 1)`,
is preferred to `assert.isTrue(spy.calledOnce)`,
as the former generates better error messages than the latter.

Prefer `assert.strictEqual` to `assert.equal`.


To save time, this template may be used:

```ts
import { assert } from "chai";
import "mocha";
import { sandbox as sandboxFactory } from "sinon";
const sandbox = sandboxFactory.create();

import { Subject } from "file/name";

describe("file/name", function () {

    afterEach(function () {
        sandbox.restore();
    });

    it("should exist", function () {
        assert.exists(Subject);
    });

});
```

## Commits

Commit messages serve two purposes.
They explain lines of code in blame,
and document the changes to the code.

The first line of a commit message must explain every line of code changed.
The first line must be as short as possible.

The second line must be blank.

The remaining lines may expand upon the first line.

If changes do not fit together, they must be put them in separate commits.
Commits may be unrelated to the current branch,
since it is best to fix problems as they are seen.

Many detailed commits are preferred to few, large commits.
