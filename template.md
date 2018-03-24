# Template

Copy-pasting code is usually bad,
but most tests have some things in common,
so they are going to be copy-pasted anyways.

This file ensures there is a canonical version,
so the peculiarities of any one file do not spread.

```typescript
import { assert } from "chai";
import "mocha";
import { sandbox as sandboxFactory } from "sinon";
const sandbox = sandboxFactory.create();

import { Subject } from "file";

describe("file", function () {

    afterEach(function () {
        sandbox.restore();
    });

    it("should exist", function () {
        assert.exists(Subject);
    });

});
```
