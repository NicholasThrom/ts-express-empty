//
// A logger replacement for console.log. This is primarily so that tests can
// safely stub logging without losing test logs.
//


/**
 * The class to be exported.
 */
class E {

    // Other values.

    public static log(...messages: any[]) {
        console.log(...messages);
    }

    /**
     * This class is never instantiated.
     */
    private constructor() {}

}


export default E;
