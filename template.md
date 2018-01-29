# Template

This is a template for TypeScript files.

Everything that is exported is a type (type, interface, class, or enum). This is not only nice, but also makes testing way easier by ensuring everything is stubbable.

Any code that needs to be run on the creation of the file is put in `init()`, or a similar suitably named function somewhere. This ensures that the initialization code can be run more than once for testing purposes, and makes it easy to convert things to `async`/`await` functions.

```js
//
// Description of file.
//

// External imports.
import * from "somewhere";

// Internal imports.
import something from "./something";



/**
 * The class to be exported.
 */
class E {

    // Other values.

    /**
     * Initializes this class.
     * For unit tests only – do not call.
     */
    public static init() {
        // Initialization code.
    }

    /**
     * This class is never instantiated.
     */
    private constructor() {}

}

E.init();


export default E;
```
