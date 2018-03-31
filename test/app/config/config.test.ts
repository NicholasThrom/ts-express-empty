import { assert } from "chai";
import "mocha";
import { sandbox as sandboxFactory, SinonStub } from "sinon";
const sandbox = sandboxFactory.create();

import * as fs from "fs";
import { JSONable } from "../../../app/modules/jsonable/jsonable";
import { CustomAssert } from "../../testing-utils/custom-assert";

import { config } from "../../../app/config/config";

describe("config/config", function () {

    afterEach(function () {
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

        let readFileSyncStub: SinonStub;

        beforeEach(function () {
            readFileSyncStub = sandbox.stub(fs, "readFileSync").withArgs(config["filePath"]);
        });

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

        let getStringStub: SinonStub;

        beforeEach(function () {
            getStringStub = sandbox.stub(config, "getString" as any);
        });

        it("should call `getString`", function () {
            getStringStub.returns("{}");
            config["getJSONable"]();

            assert.strictEqual(getStringStub.callCount, 1);
        });

        it("should throw if `getString` does not return parsable JSON", function () {
            getStringStub.returns("not parsable json");

            assert.throws(() => { config["getJSONable"](); });
        });

        it("should throw a specific error if `getString` does not return parsable JSON", function () {
            getStringStub.returns("not parsable json");

            assert.throws(() => { config["getJSONable"](); }, /Syntax error in .*\./);
        });

        it("should return the parsed `JSONable` if `getString`", function () {
            getStringStub.returns("{ \"a\": \"a\" }");

            assert.strictEqual(config["getJSONable"]().get("a").string, "a");
        });

    });

    describe(".getConfig", function () {

        let getJSONableStub: SinonStub;
        let oldCache: JSONable | undefined;

        beforeEach(function () {
            oldCache = config["cache"];
            getJSONableStub = sandbox.stub(config, "getJSONable" as any);
        });

        afterEach(function () {
            config["cache"] = oldCache;
        });

        describe("with cached value", function () {

            beforeEach(function () {
                config["cache"] = JSONable.parse("\"any JSONable\"");
            });

            it("should return the contents of `cache`", function () {
                // Since calling getConfig could change the cached value, it is saved.
                const cachedValue = config["cache"];

                assert.strictEqual(config["getConfig"](), cachedValue);
            });

            it("should not call `getJSONable`", function () {
                config["getConfig"]();

                assert.strictEqual(getJSONableStub.callCount, 0);
            });

        });

        describe("without cached value", function () {

            beforeEach(function () {
                config["cache"] = undefined;
            });

            it("should call `getJSONable`", function () {
                config["getConfig"]();

                assert.strictEqual(getJSONableStub.callCount, 1);
            });

            it("should return the result of `getJSONable`", function () {
                const jsonable = JSONable.parse("\"any jsonable\"");
                getJSONableStub.returns(jsonable);

                assert.strictEqual(config["getConfig"](), jsonable);
            });

            it("should set `cache` to the result of `getJSONable`", function () {
                const jsonable = JSONable.parse("\"any jsonable\"");
                getJSONableStub.returns(jsonable);
                config["getConfig"]();

                assert.strictEqual(config["cache"], jsonable);
            });

        });

    });

    describe(".getCookieSecret", function () {

        let getConfigStub: SinonStub;

        beforeEach(function () {
            getConfigStub = sandbox.stub(config, "getConfig" as any)
                .returns(new JSONable({ cookieSecret: "temporary unused cookie secret" }));
        });

        it("should call `getConfig`", function () {
            config.getCookieSecret();

            assert.strictEqual(getConfigStub.callCount, 1);
        });

        it("should return `getConfig`'s `cookieSecret` string", function () {
            const cookieSecret = "any string";
            getConfigStub.returns(new JSONable({ cookieSecret }));

            assert.strictEqual(config.getCookieSecret(), cookieSecret);
        });

        it("should throw if `cookieSecret` is not present", function () {
            getConfigStub.returns(new JSONable({}));

            assert.throws(() => { config.getCookieSecret(); });
        });

        it("should throw a specific error if `cookieSecret` is not present", function () {
            getConfigStub.returns(new JSONable({}));

            assert.throws(() => { config.getCookieSecret(); }, /missing a "cookieSecret" string\./);
        });

        it("should throw if `cookieSecret` is not a `string", function () {
            getConfigStub.returns(new JSONable({ cookieSecret: 9000 }));

            assert.throws(() => { config.getCookieSecret(); });
        });

        it("should throw a specific error if `cookieSecret` is not a `string`", function () {
            getConfigStub.returns(new JSONable({ cookieSecret: 9000 }));

            assert.throws(() => { config.getCookieSecret(); }, /missing a "cookieSecret" string\./);
        });

    });

});
