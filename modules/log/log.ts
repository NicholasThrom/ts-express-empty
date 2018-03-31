/**
 * **singleton**
 *
 * Has logging utilities.
 */
export const log = new (class Log {

    /**
     * Logs the specified messages.
     */
    public log(...messages: any[]) {
        console.log(...messages);
    }

})();
