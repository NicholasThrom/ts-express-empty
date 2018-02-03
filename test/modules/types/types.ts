//
// Tests modules/types/types.ts
//

import * as chai from "chai";
import "mocha";
import * as sinon from "sinon";
const sandbox = sinon.sandbox.create();

// Subject
import { HTTPError } from "../../../modules/types/types";



describe("modules/types/types.ts", function () {

    afterEach(function () {
        sandbox.restore();
    });

    describe("class HTTPError", function () {

        it("should exist", function () {
            chai.assert(HTTPError);
        });

        it("should extend Error", function () {
            chai.assert(Error.isPrototypeOf(HTTPError));
        });

        it("should be instatiable", function () {
            const httpError = new HTTPError();

            chai.assert(httpError);
        });

        it("should have a message property", function () {
            const message = "some message";
            const httpError = new HTTPError(message);

            chai.assert.strictEqual(
                httpError.message,
                message,
            );
        });

        it("should have a default status of 500", function () {
            const httpError = new HTTPError();

            chai.assert.strictEqual(
                httpError.status,
                500,
            );
        });

        it("should have a settable status", function () {
            const status = 404;
            const httpError = new HTTPError();
            httpError.status = status;

            chai.assert.strictEqual(
                httpError.status,
                status,
            );
        });

    });

});
