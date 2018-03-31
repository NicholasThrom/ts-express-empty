import { assert } from "chai";
import "mocha";
import { match, sandbox as sandboxFactory, SinonSpy, SinonStub } from "sinon";
const sandbox = sandboxFactory.create();

import * as http from "http";
import { log } from "../../modules/log/log";
import { stubConfig } from "../testing-utils/stub-config";

// Make sure nothing happens on import.
sandbox.stub(http, "createServer").returns({
    on() {},
    listen() {},
});
stubConfig.stubConfig(sandbox);

import { start } from "../../scripts/start";

sandbox.restore();

describe("scripts/start", function () {

    beforeEach(function () {
        stubConfig.stubConfig(sandbox);
    });

    afterEach(function () {
        sandbox.restore();
    });

    it("should exist", function () {
        assert.exists(start);
    });

    describe(".run()", function () {

        let createServerStub: SinonStub;
        let onSpy: SinonSpy;
        let listenSpy: SinonSpy;
        let oldPort: string | undefined;

        beforeEach(function () {
            listenSpy = sandbox.spy();
            onSpy = sandbox.spy();
            createServerStub = sandbox.stub(http, "createServer").returns({
                listen: listenSpy,
                on: onSpy,
            });

            oldPort = process.env.PORT;
        });

        afterEach(function () {
            // For some reason process.env.PORT coerces set values to strings.
            // This is obviously bad if it was undefined.
            if (oldPort === undefined) {
                delete process.env.PORT;
            } else {
                process.env.PORT = oldPort;
            }
        });

        it("should call createServer once", function () {
            start.run();

            assert.strictEqual(createServerStub.callCount, 1);
        });

        it("should call listen once", function () {
            start.run();

            assert.strictEqual(listenSpy.callCount, 1);
        });

        it("should call listen with the default port 3000", function () {
            start.run();

            assert.strictEqual(listenSpy.firstCall.args[0], 3000);
        });

        it("should call listen with a custom port", function () {
            process.env.PORT = "4000";

            start.run();

            assert.strictEqual(listenSpy.firstCall.args[0], 4000);
        });

        it("should call listen with a custom non-numeric port", function () {
            process.env.PORT =  "some string";

            start.run();

            assert.strictEqual(listenSpy.firstCall.args[0], "some string");
        });

        describe("on(\"listen\")", function () {

            it("should call on(\"listen\") once", function () {
                start.run();

                assert(onSpy.withArgs("listening", match.func).calledOnce);
            });

            it("should call logging function in passed function", function () {
                const logStub = sandbox.stub(log, "log");

                start.run();

                const onFunction = onSpy.withArgs("listening", match.func).firstCall.args[1];
                onFunction();
                assert(logStub.calledOnce);
            });

            it("should log numeric port in passed function", function () {
                const logStub = sandbox.stub(log, "log");
                process.env.PORT = "4000";

                start.run();

                const onFunction = onSpy.withArgs("listening", match.func).firstCall.args[1];
                onFunction();

                assert.match(logStub.firstCall.args[0], /port 4000/);
            });

            it("should log string port in passed function", function () {
                const logStub = sandbox.stub(log, "log");
                process.env.PORT = "some port";

                start.run();

                const onFunction = onSpy.withArgs("listening", match.func).firstCall.args[1];
                onFunction();

                assert.match(logStub.firstCall.args[0], /pipe some port/);
            });

        });

        describe("on(\"error\")", function () {

            it("should call on(\"error\") once", function () {
                start.run();

                assert(onSpy.withArgs("error", match.func).calledOnce);
            });

            it("should rethrow unrecognized errors in passed function", function () {
                const errorMessage = "error message";
                const error = new Error(errorMessage);

                start.run();

                const errorFunction = onSpy.withArgs("error", match.func).firstCall.args[1];

                assert.throws(() => { errorFunction(error); }, errorMessage);
            });

            it("should throw improved errors for \"EACCES\"", function () {
                const errorMessage = "error message";
                const error = new Error(errorMessage);
                (error as any).syscall = "listen";
                (error as any).code = "EACCES";

                start.run();

                const errorFunction = onSpy.withArgs("error", match.func).firstCall.args[1];
                assert.throws(() => { errorFunction(error); }, /permission/);
            });

            it("should throw improved errors for \"EADDRINUSE\"", function () {
                const errorMessage = "error message";
                const error = new Error(errorMessage);
                (error as any).syscall = "listen";
                (error as any).code = "EADDRINUSE";

                start.run();

                const errorFunction = onSpy.withArgs("error", match.func).firstCall.args[1];
                assert.throws(() => { errorFunction(error); }, /(using)|(use)/);
            });

            it("should rethrow errors with \"listen\" syscall but unknown code", function () {
                const errorMessage = "error message";
                const error = new Error(errorMessage);
                (error as any).syscall = "listen";
                (error as any).code = "unknown error";

                start.run();

                const errorFunction = onSpy.withArgs("error", match.func).firstCall.args[1];
                assert.throws(() => { errorFunction(error); }, errorMessage);
            });

        });

    });

    describe(".normalizePort()", function () {

        it("should return a number if the string is a positive number", function () {
            const port = start["normalizePort"]("42");

            assert.strictEqual(port, 42);
        });

        it("should return a number if the string is 0", function () {
            const port = start["normalizePort"]("0");

            assert.strictEqual(port, 0);
        });

        it("should return a string is a non-number", function () {
            const port = start["normalizePort"]("string");

            assert.strictEqual(port, "string");
        });

        it("should return a string is NaN", function () {
            const port = start["normalizePort"]("NaN");

            assert.strictEqual(port, "NaN");
        });

        it("should return a string is \"NaN\"", function () {
            const port = start["normalizePort"]("NaN");

            assert.strictEqual(port, "NaN");
        });

        it("should return a string is a negative number", function () {
            const port = start["normalizePort"]("-42");

            assert.strictEqual(port, "-42");
        });

    });

});
