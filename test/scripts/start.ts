//
// Tests scripts/start.ts.
//

import * as chai from "chai";
import "mocha";
import * as sinon from "sinon";

const sandbox = sinon.sandbox.create();

import * as http from "http";

// Make sure nothing happens on import.
sandbox.stub(http, "createServer").returns({
    on() {},
    listen() {},
});

import start from "../../scripts/start";

describe("scripts/start.ts", function () {

    afterEach(function () {
        sandbox.restore();
    });

    it("should exist", function () {
        sinon.assert.pass(start);
    });

    describe("#normalizePort()", function () {

        it("should return a number if the string is a positive number", function () {
            const port = start["normalizePort"]("42");
            chai.assert.strictEqual(port, 42);
        });

        it("should return a number if the string is 0", function () {
            const port = start["normalizePort"]("0");
            chai.assert.strictEqual(port, 0);
        });

        it("should return a string is a non-number", function () {
            const port = start["normalizePort"]("string");
            chai.assert.strictEqual(port, "string");
        });

        it("should return a string is NaN", function () {
            const port = start["normalizePort"]("NaN");
            chai.assert.strictEqual(port, "NaN");
        });

        it("should return a string is \"NaN\"", function () {
            const port = start["normalizePort"]("NaN");
            chai.assert.strictEqual(port, "NaN");
        });

        it("should return a string is a negative number", function () {
            const port = start["normalizePort"]("-42");
            chai.assert.strictEqual(port, "-42");
        });

    });

});
