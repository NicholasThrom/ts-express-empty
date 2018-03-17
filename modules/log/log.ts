/**
 * Has logging utilities.
 */
class Logger {
    /**
     * Logs the specified messages.
     */
    public static log(...messages: any[]) {
        console.log(...messages);
    }

    /**
     * This class is never instantiated.
     */
    private constructor() {
        throw new Error("This class cannot be instantiated.");
    }

}


export { Logger };
