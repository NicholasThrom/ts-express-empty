import { assert } from "chai";

/**
 * **uninstantiable**
 *
 * This class is for custom assertions
 * that are not easily available on the `chai.assert`.
 */
export class CustomAssert {

    /**
     * **side effects**
     *
     * Asserts that the specified `callback` throws
     * a value strictly equal to `expectedError`.
     *
     * As a side effect, the callback function is called.
     *
     * @param callback The function that is called.
     * @param expectedError The expected error for the callback to throw.
     */
    public static throws(callback: () => void, expectedError: any) {
        try {
            callback();
            assert.fail();
        } catch (actualError) {
            assert.strictEqual(actualError, expectedError);
        }
    }

}
