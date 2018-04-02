# `test/`

Holds testing files.

The `testing-utils` directory is for files that do not test,
but help other tests.

The `mocha.opts` file allows mocha to work with `ts-node`,
and also specifies which files are to be tested.

The `tslint.json` allows `string` access of properties,
which allows access of private methods.

For example,
```ts
class Foo {
    private static bar;
}

Foo.bar; // Will not compile.
Foo["bar"]; // Will compile.
```
