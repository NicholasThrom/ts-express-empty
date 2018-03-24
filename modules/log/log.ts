/**
 * Has logging utilities.
 */
class Logger {

    /**
     * This class is never instantiated.
     */
    private constructor() {
        throw new Error("This class cannot be instantiated.");
    }

    /**
     * Logs the specified messages.
     */
    public static log(...messages: any[]) {
        console.log(...messages);
    }

}

export { Logger };
