import { assert } from "chai";
import "mocha";
import { sandbox as sandboxFactory } from "sinon";
const sandbox = sandboxFactory.create();

import { HTTPError } from "../../../modules/types/types";

describe("modules/types/types", function () {

    afterEach(function () {
        sandbox.restore();
    });

    describe("class HTTPError", function () {

        it("should exist", function () {
            assert.exists(HTTPError);
        });

        it("should be instatiable", function () {
            const httpError = new HTTPError();

            assert.exists(httpError);
        });

        it("should support `instanceof HTTPError`", function () {
            assert.instanceOf(new HTTPError(), HTTPError);
        });

        it("should support `instanceof Error`", function () {
            assert.instanceOf(new HTTPError(), Error);
        });

        it("should have a message property", function () {
            const message = "any string";
            const httpError = new HTTPError(message);

            assert.strictEqual(httpError.message, message);
        });

        it("should have a default status of 500", function () {
            const httpError = new HTTPError();

            assert.strictEqual(httpError.status, 500);
        });

        it("should have a settable status", function () {
            const status = 404;
            const httpError = new HTTPError();
            httpError.status = status;

            assert.strictEqual(httpError.status, status);
        });

    });

});
