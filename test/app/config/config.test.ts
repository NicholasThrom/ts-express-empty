import { assert } from "chai";
import "mocha";
import { sandbox as sandboxFactory, SinonStub } from "sinon";
const sandbox = sandboxFactory.create();

import * as fs from "fs";
import { JSONable } from "../../../app/modules/jsonable/jsonable";
import { CustomAssert } from "../../testing-utils/custom-assert";

import { config } from "../../../app/config/config";

describe("config/config", function () {

    let readFileSyncStub: SinonStub;
    let oldCache: JSONable | undefined;

    beforeEach(function () {
        oldCache = config["cache"];
        readFileSyncStub = sandbox.stub(fs, "readFileSync").withArgs(config["filePath"]);
    });

    afterEach(function () {
        config["cache"] = oldCache;
        sandbox.restore();
    });

    it("should exist", function () {
        assert.exists(config);
    });

    describe(".problem", function () {

        it("should throw", function () {
            assert.throws(() => { config["problem"](""); });
        });

        it("should throw error containing passed string", function () {
            const message = "any string";
            assert.throws(() => { config["problem"](message); }, RegExp(message));
        });

        it("should throw an error pointing the user to the readme", function () {
            assert.throws(() => { config["problem"](""); }, /config\/README\.md/);
        });

    });

    describe(".getString", function () {

        it("should read the `config-data.json` file", function () {
            config["getString"]();

            assert.strictEqual(readFileSyncStub.callCount, 1);
        });

        it("should throw if the file cannot be read", function () {
            readFileSyncStub.throws();

            assert.throws(() => { config["getString"](); });
        });

        it("should rethrow if the file cannot be read for an unknown reason", function () {
            const error = new Error("any error");
            readFileSyncStub.throws(error);

            CustomAssert.throws(() => { config["getString"](); }, error);
        });

        it("should throw a specific error if the file cannot be found", function () {
            const error = new Error("any string");
            (error as any).code = "ENOENT";
            readFileSyncStub.throws(error);

            assert.throws(() => { config["getString"](); }, /Cannot find .* file\./);
        });

        it("should return the contents of the `config-data.json` file", function () {
            const contents = "any string";
            readFileSyncStub.returns(contents);

            assert.strictEqual(config["getString"](), contents);
        });

    });

    describe(".getJSONable", function () {

        it("should call `readFileSync`", function () {
            readFileSyncStub.returns("{}");
            config["getJSONable"]();

            assert.strictEqual(readFileSyncStub.callCount, 1);
        });

        it("should throw if `getString` does not return parsable JSON", function () {
            readFileSyncStub.returns("not parsable json");

            assert.throws(() => { config["getJSONable"](); });
        });

        it("should throw a specific error if `getString` does not return parsable JSON", function () {
            readFileSyncStub.returns("not parsable json");

            assert.throws(() => { config["getJSONable"](); }, /Syntax error in .*\./);
        });

        it("should return the parsed `JSONable` if `getString`", function () {
            readFileSyncStub.returns("{ \"a\": \"a\" }");

            assert.strictEqual(config["getJSONable"]().get("a").string, "a");
        });

    });

    describe(".getConfig", function () {

        describe("with cached value", function () {

            beforeEach(function () {
                config["cache"] = JSONable.parse("\"any JSONable\"");
            });

            it("should return the contents of `cache`", function () {
                // Since calling getConfig could change the cached value, it is saved.
                const cachedValue = config["cache"];

                assert.strictEqual(config["getConfig"](), cachedValue);
            });

            it("should not call `readFileSync`", function () {
                config["getConfig"]();

                assert.strictEqual(readFileSyncStub.callCount, 0);
            });

        });

        describe("without cached value", function () {

            beforeEach(function () {
                config["cache"] = undefined;
            });

            it("should call `readFileSync`", function () {
                readFileSyncStub.returns("{}");
                config["getConfig"]();

                assert.strictEqual(readFileSyncStub.callCount, 1);
            });

            it("should return the result of `getJSONable`", function () {
                readFileSyncStub.returns("{ \"a\": \"b\" }");

                assert.strictEqual(config["getConfig"]().get("a").string, "b");
            });

            it("should set `cache` to the result of `getJSONable`", function () {
                readFileSyncStub.returns("{ \"a\": \"b\" }");
                config["getConfig"]();

                assert.strictEqual((config["cache"] as JSONable).get("a").string, "b");
            });

        });

    });

    describe(".getCookieSecret", function () {

        it("should return `readFileSync`'s `cookieSecret` string", function () {
            const cookieSecret = "any string";
            readFileSyncStub.returns(`{ "cookieSecret": "${cookieSecret}" }`);

            assert.strictEqual(config.getCookieSecret(), cookieSecret);
        });

        it("should throw if `cookieSecret` is not present", function () {
            readFileSyncStub.returns("{}");

            assert.throws(() => { config.getCookieSecret(); });
        });

        it("should throw a specific error if `cookieSecret` is not present", function () {
            readFileSyncStub.returns("{}");

            assert.throws(() => { config.getCookieSecret(); }, /missing a "cookieSecret" string\./);
        });

        it("should throw if `cookieSecret` is not a `string", function () {
            readFileSyncStub.returns("{ \"cookieSecret\": 9000 }");

            assert.throws(() => { config.getCookieSecret(); });
        });

        it("should throw a specific error if `cookieSecret` is not a `string`", function () {
            readFileSyncStub.returns("{ \"cookieSecret\": 9000 }");

            assert.throws(() => { config.getCookieSecret(); }, /missing a "cookieSecret" string\./);
        });

    });

});
