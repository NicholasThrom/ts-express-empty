import { assert } from "chai";
import "mocha";
import { sandbox as sandboxFactory } from "sinon";
const sandbox = sandboxFactory.create();

import { JSONable } from "../../../modules/jsonable/jsonable";

describe("modules/jsonable/jsonable", function () {

    afterEach(function () {
        sandbox.restore();
    });

    it("should exist", function () {
        assert.exists(JSONable);
    });

    it("should support `instanceof JSONable`", function () {
        const jsonable = new JSONable("any");

        assert.instanceOf(jsonable, JSONable);
    });

    describe(".value", function () {

        it("should be the argument specified in the constructor", function () {
            const anyValue = { a: "any value" };
            const jsonable = new JSONable(anyValue);

            assert.strictEqual(jsonable.value, anyValue);
        });

    });

    describe(".value", function () {

        it("should be the argument specified in the constructor", function () {
            const anyValue = { a: "any value" };
            const jsonable = new JSONable(anyValue);

            assert.strictEqual(jsonable.value, anyValue);
        });

    });

    describe(".isString", function () {

        it("should be true only if `.value` is a `string`", function () {
            assert.isTrue(new JSONable("any string").isString);
            assert.isFalse(new JSONable(9000).isString);
            assert.isFalse(new JSONable(NaN).isString);
            assert.isFalse(new JSONable(0).isString);
            assert.isFalse(new JSONable(true).isString);
            assert.isFalse(new JSONable(false).isString);
            assert.isFalse(new JSONable(null).isString);
            assert.isFalse(new JSONable(undefined).isString);
            assert.isFalse(new JSONable({ string: "stringy" }).isString);
            assert.isFalse(new JSONable(["string"]).isString);
        });

    });

    describe(".string", function () {

        it("should be `.value` if it is a `string`", function () {
            const anyString = "any string";
            assert.strictEqual(new JSONable(anyString).string, anyString);
        });

        it("should be `.undefined` if it is not a `string`", function () {
            assert.isUndefined(new JSONable({}).string);
        });

    });

    describe(".isNumber", function () {

        it("should be true only if `.value` is a `number`", function () {
            assert.isFalse(new JSONable("number").isNumber);
            assert.isFalse(new JSONable("9000").isNumber);
            assert.isTrue(new JSONable(9000).isNumber);
            assert.isTrue(new JSONable(NaN).isNumber);
            assert.isTrue(new JSONable(0).isNumber);
            assert.isFalse(new JSONable(true).isNumber);
            assert.isFalse(new JSONable(false).isNumber);
            assert.isFalse(new JSONable(null).isNumber);
            assert.isFalse(new JSONable(undefined).isNumber);
            assert.isFalse(new JSONable({ number: 9000 }).isNumber);
            assert.isFalse(new JSONable([9000]).isNumber);
        });

    });

    describe(".number", function () {

        it("should be `.value` if it is a `number`", function () {
            const anyNumber = 9000;
            assert.strictEqual(new JSONable(anyNumber).number, anyNumber);
        });

        it("should be `.undefined` if it is not a `string`", function () {
            assert.isUndefined(new JSONable({}).number);
        });

    });

    describe(".isBoolean", function () {

        it("should be true only if `.value` is a `number`", function () {
            assert.isFalse(new JSONable("number").isBoolean);
            assert.isFalse(new JSONable(9000).isBoolean);
            assert.isFalse(new JSONable(NaN).isBoolean);
            assert.isFalse(new JSONable(0).isBoolean);
            assert.isTrue(new JSONable(true).isBoolean);
            assert.isTrue(new JSONable(false).isBoolean);
            assert.isFalse(new JSONable(null).isBoolean);
            assert.isFalse(new JSONable(undefined).isBoolean);
            assert.isFalse(new JSONable({ boolean: true }).isBoolean);
            assert.isFalse(new JSONable([true]).isBoolean);
        });

    });

    describe(".boolean", function () {

        it("should be `.value` if it is a `boolean`", function () {
            const anyBoolean = true;
            assert.strictEqual(new JSONable(anyBoolean).boolean, anyBoolean);
        });

        it("should be `.undefined` if it is not a `boolean`", function () {
            assert.isUndefined(new JSONable({}).boolean);
        });

    });

    describe(".isNull", function () {

        it("should be true only if `.value` is `null`", function () {
            assert.isFalse(new JSONable("null").isNull);
            assert.isFalse(new JSONable(9000).isNull);
            assert.isFalse(new JSONable(NaN).isNull);
            assert.isFalse(new JSONable(0).isNull);
            assert.isFalse(new JSONable(true).isNull);
            assert.isFalse(new JSONable(false).isNull);
            assert.isTrue(new JSONable(null).isNull);
            assert.isFalse(new JSONable(undefined).isNull);
            assert.isFalse(new JSONable({}).isNull);
            assert.isFalse(new JSONable([null]).isNull);
            assert.isFalse(new JSONable([]).isNull);
        });

    });

    describe(".isUndefined", function () {

        it("should be true only if `.value` is `null`", function () {
            assert.isFalse(new JSONable("undefined").isUndefined);
            assert.isFalse(new JSONable(9000).isUndefined);
            assert.isFalse(new JSONable(NaN).isUndefined);
            assert.isFalse(new JSONable(0).isUndefined);
            assert.isFalse(new JSONable(true).isUndefined);
            assert.isFalse(new JSONable(false).isUndefined);
            assert.isFalse(new JSONable(null).isUndefined);
            assert.isTrue(new JSONable(undefined).isUndefined);
            assert.isFalse(new JSONable({}).isUndefined);
            assert.isFalse(new JSONable([undefined]).isUndefined);
            assert.isFalse(new JSONable([]).isUndefined);
        });

    });

    describe(".isObject", function () {

        it("should be true only if `.value` is `null`", function () {
            assert.isFalse(new JSONable("[object Object]").isObject);
            assert.isFalse(new JSONable(9000).isObject);
            assert.isFalse(new JSONable(NaN).isObject);
            assert.isFalse(new JSONable(0).isObject);
            assert.isFalse(new JSONable(true).isObject);
            assert.isFalse(new JSONable(false).isObject);
            assert.isFalse(new JSONable(null).isObject);
            assert.isFalse(new JSONable(undefined).isObject);
            assert.isFalse(new JSONable([{}, {}]).isObject);
            assert.isFalse(new JSONable([]).isObject);
            assert.isTrue(new JSONable({}).isObject);
            assert.isTrue(new JSONable({ 0: 0, 1: 1, 2: 2, length: 3 }).isObject);
        });

    });

    describe(".object", function () {

        it("should be `.value` if it is an `object`", function () {
            const anyObject = {};
            assert.strictEqual(new JSONable(anyObject).object, anyObject);
        });

        it("should be `.undefined` if it is not an `object`", function () {
            assert.isUndefined(new JSONable([]).object);
        });

    });

    describe(".isArray", function () {

        it("should be true only if `.value` is `null`", function () {
            assert.isFalse(new JSONable("[]").isArray);
            assert.isFalse(new JSONable(9000).isArray);
            assert.isFalse(new JSONable(NaN).isArray);
            assert.isFalse(new JSONable(0).isArray);
            assert.isFalse(new JSONable(true).isArray);
            assert.isFalse(new JSONable(false).isArray);
            assert.isFalse(new JSONable(null).isArray);
            assert.isFalse(new JSONable(undefined).isArray);
            assert.isTrue(new JSONable([{}, []]).isArray);
            assert.isTrue(new JSONable([]).isArray);
            assert.isFalse(new JSONable({}).isArray);
            assert.isFalse(new JSONable({ 0: 0, 1: 1, 2: 2, length: 3 }).isArray);
        });

    });

    describe(".array", function () {

        it("should be `.value` if it is an `array`", function () {
            const anyArray = [9000];
            assert.strictEqual(new JSONable(anyArray).array, anyArray);
        });

        it("should be `.undefined` if it is not an `array`", function () {
            assert.isUndefined(new JSONable({}).array);
        });

    });

    describe(".getSingle", function () {

        const array = [0, 1, 2];
        const jsonArray = new JSONable(array);
        const object = { a: "a", b: "b", c: "c", 1: "1" };
        const jsonObject = new JSONable(object);

        it("should return the value for a `number` key in arrays", function () {
            assert.strictEqual(jsonArray.getSingle(1).number, array[1]);
        });

        it("should return the value for a `string` key in objects", function () {
            assert.strictEqual(jsonObject.getSingle("a").string, object.a);
        });

        it("should return the value for a number `string` key in objects", function () {
            assert.strictEqual(jsonObject.getSingle("1").string, object[1]);
        });

        it("should return `undefined` for a nonexistent `number` key in arrays", function () {
            assert.isTrue(jsonArray.getSingle(4).isUndefined);
        });

        it("should return `undefined` for a nonexistent `string` key in objects", function () {
            assert.isTrue(jsonObject.getSingle("d").isUndefined);
        });

        it("should return `undefined` for a `string` key in arrays", function () {
            assert.isTrue(jsonArray.getSingle("1").isUndefined);
        });

        it("should return `undefined` for a `number` key in objects", function () {
            assert.isTrue(jsonObject.getSingle(1).isUndefined);
        });

    });

    describe(".get", function () {

        const array: [number, number, number[]] = [0, 1, [0, 1, 2]];
        const jsonArray = new JSONable(array);
        const object = {
            a: "a",
            array: [{ a: "a", 1: "1" }, 9, true],
            object: { a: "a" },
            0: "0",
        };
        const jsonObject = new JSONable(object);

        it("should return the itself value for no arguments", function () {
            assert.strictEqual(jsonArray.get(), jsonArray);
        });

        it("should return the correct value for a single `number` argument", function () {
            assert.strictEqual(jsonArray.get(1).number, 1);
        });

        it("should return the correct value for a single `string` argument", function () {
            assert.strictEqual(jsonObject.get("a").string, "a");
        });

        it("should return the correct value for a single number `string` argument", function () {
            assert.strictEqual(jsonObject.get("0").string, "0");
        });

        it("should return the correct value for multiple `number` arguments", function () {
            assert.strictEqual(jsonArray.get(2, 1).number, 1);
        });

        it("should return the correct value for multiple `string` arguments", function () {
            assert.strictEqual(jsonObject.get("object", "a").string, "a");
        });

        it("should return the correct value for multiple `string` and `number` arguments", function () {
            assert.strictEqual(jsonObject.get("array", 0, "a").string, "a");
        });

        it("should allow chaining", function () {
            assert.strictEqual(jsonObject.get("array", 0).get("a").string, "a");
            assert.strictEqual(jsonObject.get("array").get(0, "a").string, "a");
            assert.strictEqual(jsonObject.get("array").get(0).get("a").string, "a");
        });

        it("should return an undefined `JSONable` for a single `number` argument", function () {
            assert.isTrue(jsonArray.get(3).isUndefined);
        });

        it("should return an undefined `JSONable` for a single `string` argument", function () {
            assert.isTrue(jsonObject.get("b").isUndefined);
        });

        it("should return an undefined `JSONable` for a single `number` argument on an object", function () {
            assert.isTrue(jsonObject.get(0).isUndefined);
        });

        it("should return an undefined `JSONable` for a single number `string` argument", function () {
            assert.isTrue(jsonArray.get("1").isUndefined);
        });

        it("should return an undefined `JSONable` for multiple arguments where the last does not exist", function () {
            assert.isTrue(jsonArray.get("array", 1, "b").isUndefined);
        });

        it("should return an undefined `JSONable` for multiple arguments where the last goes too far", function () {
            assert.isTrue(jsonArray.get("array", 1, "a", 3).isUndefined);
        });

        it("should return an undefined `JSONable` for multiple arguments where the first does not exist", function () {
            assert.isTrue(jsonArray.get("d", 1, "a", 3).isUndefined);
        });

    });

    describe(".stringify", function () {

        it("should return a string representing the JSONable", function () {
            const json = new JSONable({
                array: [1, "a", 3],
                b: "b",
                c: true,
                d: null,
                e: undefined,
                1: 1,
            });
            const jsonString = "{\"1\":1,\"array\":[1,\"a\",3],\"b\":\"b\",\"c\":true,\"d\":null}";

            assert.strictEqual(json.stringify(), jsonString);
        });

        it("should return undefined if the JSONable contains a circular reference", function () {
            const object = { a: {} };
            object.a = object; // Please don't do this.

            assert.isUndefined(new JSONable(object).stringify());
        });

    });

    describe(".parse", function () {

        it("should return a `JSONable`", function () {
            assert.instanceOf(JSONable.parse("any string"), JSONable);
        });

        it("should return a `JSONable` `string`", function () {
            assert.strictEqual(JSONable.parse("\"any string\"").string, "any string");
        });

        it("should return a `JSONable` `number`", function () {
            assert.strictEqual(JSONable.parse("9000").number, 9000);
        });

        it("should return a `JSONable` `boolean`", function () {
            assert.strictEqual(JSONable.parse("true").boolean, true);
        });

        it("should return a `JSONable` `null`", function () {
            assert.isTrue(JSONable.parse("null").isNull);
        });

        it("should return a `JSONable` `array`", function () {
            assert.deepEqual(JSONable.parse("[1, 2, 3]").array, [1, 2, 3]);
        });

        it("should return a `JSONable` `object`", function () {
            assert.deepEqual(JSONable.parse("{\"a\":\"a\"}").object, { a: "a" });
        });

        it("should return a `JSONable` `undefined` for unparsable JSON", function () {
            assert.isTrue(JSONable.parse("nope").isUndefined);
        });

    });

    describe.skip(".undefined", function () {

    });

});
