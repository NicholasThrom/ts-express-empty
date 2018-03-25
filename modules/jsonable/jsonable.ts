/**
 * A map of strings to `any`.
 *
 * Note that while it would be possible to use the type system
 * to ensure only valid JSON could be in a JSON object,
 * it would make checking the type exceedingly difficult,
 * and completely prevent the access of malformed JSON.
 * This way, the values are checked as they are needed.
 */
interface JSONObject { [key: string]: any; }

/**
 * An array of JSON values.
 *
 * See the `JSONObject documentation
 * for details why `any` was used.
 */
type JSONArray = any[];

/**
 * **immutable**
 *
 * A type-safe representation of JSONable data.
 *
 * This class helps avoid having to repeated type-check every step of the way
 * when accessing a value nested in JSON.
 *
 * For example,
 * ```ts
 *  const key = JSONable.parse(json).get("secrets", 3, "key").string;
 *  if (key) {
 *      // go
 *  }
 * ```
 */
class JSONable {

    /**
     * The underlying value of this JSONable.
     *
     * All other instance methods interpret this value.
     */
    public readonly value: any;

    /**
     * **no side effects**
     *
     * Constructs a new JSONable with the specified `value`.
     *
     * If `value` is a `string`, it is **not** parsed.
     * Use `JSONable.parse` for that.
     */
    public constructor(value: any) {
        this.value = value;
    }

    /**
     * `true` if this `JSONable` represents a `string`.
     */
    public get isString() {
        return typeof this.value === "string";
    }

    /**
     * The value of this `JSONable` as a `string`,
     * or `undefined` if it is not a `string`.
     */
    public get string() {
        if (this.isString) { return this.value as string; }
    }

    /**
     * `true` if this `JSONable` represents a `number`.
     */
    public get isNumber() {
        return typeof this.value === "number";
    }

    /**
     * The value of this `JSONable` as a `number`,
     * or `undefined` if it is not a `number`.
     */
    public get number() {
        if (this.isNumber) { return this.value as number; }
    }

    /**
     * `true` if this `JSONable` represents a `boolean`.
     */
    public get isBoolean() {
        return typeof this.value === "boolean";
    }

    /**
     * The value of this `JSONable` as a `boolean`,
     * or `undefined` if it is not a `boolean`.
     */
    public get boolean() {
        if (this.isBoolean) { return this.value as boolean; }
    }

    /**
     * `true` if this `JSONable` represents a `null`.
     *
     * There is no `.null`
     * since there is only one possible `null` value.
     */
    public get isNull() {
        return this.value === null;
    }

    /**
     * `true` if this `JSONable` is `undefined`.
     */
    public get isUndefined() {
        return this.value === undefined;
    }

    /**
     * `true` if this `JSONable` is a `JSONArray`.
     */
    public get isArray() {
        return Array.isArray(this.value);
    }

    /**
     * The value of this `JSONable` as a `JSONArray`,
     * or `undefined` if it is not a `JSONArray`.
     *
     * Prefer using `.get` for access,
     * instead of accessing the `array` directly.
     */
    public get array() {
        if (this.isArray) { return this.value as JSONArray; }
    }

    /**
     * `true` if this `JSONable` is a `JSONObject`.
     */
    public get isObject() {
        return !this.isArray && !this.isNull && typeof this.value === "object";
    }

    /**
     * The value of this `JSONable` as a `JSONObject`,
     * or `undefined` if it is not a `JSONObject`.
     *
     * Prefer using `.get` for access,
     * instead of accessing the `JSONObjects` directly.
     */
    public get object() {
        if (this.isObject) { return this.value as JSONObject; }
    }

    /**
     * **pure**
     *
     * Prefer `.get`.
     *
     * Gets the `JSONable` under the specified `key`,
     * or the undefined `JSONable` if it is not available.
     *
     * For example,
     * ```ts
     * new JSONable([0, 1, 2]).getSingle(1) === 1;
     * new JSONable({ a: "a", b: "b" }).getSingle("a").string === "a";
     * ```
     *
     * Only `string` keys can be used if this `JSONable` `.isObject`,
     * and only `number` keys can be used if this `JSONable` `.isArray`.
     *
     * Note that `({ 1: 1 })["1"] === 1`,
     * so this does not result in any limitations.
     *
     * @param key The key of the value to return.
     */
    public getSingle(key: string | number) {
        if (typeof key === "string") {
            const object = this.object;
            if (object) { return new JSONable(object[key]); }
        } else if (typeof key === "number") {
            const array = this.array;
            if (array) { return new JSONable(array[key]); }
        }

        return JSONable.undefined;
    }

    /**
     * **pure**
     *
     * Gets the `JSONable` under the specified chain of keys,
     * or the undefined `JSONable` if it is not available.
     *
     * See `.getSingle` for
     *
     * For example,
     * ```ts
     * new JSONable({ a: [{ b: "c" }] }).get("a", 0, "b").string === "c";
     * ```
     * @param keys The chain of keys to the value to return.
     */
    public get(...keys: (string | number)[]) {
        let current: JSONable = this;
        for (const key of keys) {
            current = current.getSingle(key);
            if (current.isUndefined) { return JSONable.undefined; }
        }
        return current;
    }

    /**
     * **pure**
     *
     * Returns a JSON `string` representing this `JSONable`.
     */
    public stringify() {
        try {
            return JSON.stringify(this.value);
        } catch (e) {
            return undefined;
        }
    }

    /**
     * Represents an invalid, malformed, or nonexistent `JSONable`.
     *
     * `JSONable.undefined` is used instead of `undefined`
     * so that methods and properties can be accessed safely.
     */
    public static readonly undefined = new JSONable(undefined);

    /**
     * Parses the `text` to produce a `JSONable`.
     *
     * If the `text` is not valid JSON,
     * returns `JSONable.undefined`.
     *
     * For example
     * ```ts
     * JSONable.parse("{\"a\":[{\"b\":\"c\"}]}").get("a", 0, "b").string === "c";
     * ```
     *
     * @param text The JSON `string` to parse.
     */
    public static parse(text: string) {
        try {
            return new JSONable(JSON.parse(text));
        } catch {
            return JSONable.undefined;
        }
    }

}

export { JSONable };
