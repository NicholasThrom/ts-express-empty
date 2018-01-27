//
// This file is for simple, reusuable types that are too small to deserve their
// own file.
//

/**
 * `Optional<T>` is a more descriptive title for `T | null`.
 * `undefined` was not included as this was intended for things that could
 * explicitly be null, not for things that have not yet been defined.
 */
type Optional<T> = T | null;

/**
 * This is an error for express middleware to pass to `next()`.
 * For example,
 * ```
 * route.use("/somewhere", (res, req, next) => {
 *    if (somethingBadHappened) {
 *        const error = new HTTPError("Something bad happened!");
 *        error.status = 418;
 *        next(error);
 *    }
 * });
 * ```
 */
class HTTPError extends Error {

    /**
     * The http status code the error page should return.
     * See https://httpstatuses.com/ for details.
     */
    public status = 500;
}

export { Optional, HTTPError };
