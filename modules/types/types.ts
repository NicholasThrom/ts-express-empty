/**
 * This is an error for express middleware to pass to `next()`.
 * For example,
 * ```
 * route.use("/somewhere", () => {
 *    if (somethingBadHappened) {
 *        const error = new HTTPError("Something bad happened!");
 *        error.status = 418;
 *        throw error;
 *    }
 * });
 * ```
 */
class HTTPError extends Error {

    /**
     * The http status code the error page will return.
     * See https://httpstatuses.com/ for details.
     */
    public status = 500;

}

export {
    HTTPError,
};
