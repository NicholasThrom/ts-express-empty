interface JSONObject { [key: string]: any; }
interface JSONArray extends Array<any> {}

class JSONable {

    public static readonly undefined = new JSONable(undefined);

    private readonly value: any;

    public constructor(value: any) {
        this.value = value;
    }

    public static parse(text: string) {
        try {
            return new JSONable(JSON.parse(text));
        } catch {
            return JSONable.undefined;
        }
    }

    public get isString() {
        return typeof this.value === "string";
    }

    public get string() {
        if (this.isString) { return this.value as string; }
    }

    public get isNumber() {
        return typeof this.value === "number";
    }

    public get number() {
        if (this.isNumber) { return this.value as number; }
    }

    public get isBoolean() {
        return typeof this.value === "boolean";
    }

    public get boolean() {
        if (this.isBoolean) { return this.value as boolean; }
    }

    public get isNull() {
        return this.value === null;
    }

    public get isDefined() {
        return this.value === undefined;
    }

    public get isArray() {
        return Array.isArray(this.value);
    }

    public get array() {
        if (Array.isArray(this.value)) { return this.value as JSONArray; }
    }

    public get isObject() {
        return !this.isArray && !this.isNull && typeof this.value === "object";
    }

    public get object() {
        if (this.isObject) {
            return this.value as JSONObject;
        }
    }

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

    public get(...keys: (string | number)[]) {
        const current = this;
        for (const key of keys) {
            const current = this.getSingle(key);
            if (!current) { return JSONable.undefined; }
        }
        return current;
    }

    public stringify() {
        try {
            return JSON.stringify(this.value);
        } catch (e) {
            return undefined;
        }
    }

}
