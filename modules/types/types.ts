/**
 * This file is for simple, reusuable types that are too small to deserve their
 * own file.
 */

/**
 * `Optional<T>` is a more descriptive title for `T | null`.
 * `undefined` was not included as this was intended for things that could
 * explicitly be null, not for things that have not yet been defined.
 */
export type Optional<T> = T | null;

export class HttpError extends Error {
    public status = 500;
}
