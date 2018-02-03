//
// Tests scripts/start.ts.
//

import * as chai from "chai";
import * as http from "http";
import "mocha";
import * as sinon from "sinon";

const sandbox = sinon.sandbox.create();

import App from "../../app/app";
import Log from "../../modules/log/log";

// Make sure nothing happens on import.
sandbox.stub(http, "createServer").returns({
    on() {},
    listen() {},
});

import Start from "../../scripts/start";

sandbox.restore();

describe("scripts/start.ts", function () {

    afterEach(function () {
        sandbox.restore();
    });

    it("should exist", function () {
        sinon.assert.pass(Start);
    });

    describe("#run()", function () {

        let createServerStub: sinon.SinonStub;
        let onSpy: sinon.SinonSpy;
        let listenSpy: sinon.SinonSpy;
        let oldPort: string | undefined;

        beforeEach(function () {
            onSpy = sandbox.spy();
            listenSpy = sandbox.spy();
            createServerStub = sandbox.stub(http, "createServer").returns({
                on: onSpy,
                listen: listenSpy,
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
            Start.run();

            chai.assert(createServerStub.calledOnce);
        });

        it("should call createServer on app.app", function () {
            Start.run();

            chai.assert.deepEqual(
                createServerStub.firstCall.args,
                [App.app],
            );
        });

        it("should call listen once", function () {
            Start.run();

            chai.assert(listenSpy.calledOnce);
        });

        it("should call listen with the default port 3000", function () {
            Start.run();

            chai.assert.deepEqual(
                listenSpy.firstCall.args,
                [3000],
            );
        });

        it("should call listen with a custom port", function () {
            const oldPort = process.env.PORT;
            process.env.PORT = "4000";

            Start.run();

            chai.assert.deepEqual(
                listenSpy.firstCall.args,
                [4000],
            );
        });

        it("should call listen with a custom non-numeric port", function () {
            process.env.PORT =  "some string";

            Start.run();

            chai.assert.deepEqual(
                listenSpy.firstCall.args,
                ["some string"],
            );
        });

        describe("on(\"listen\")", function () {

            it("should call on(\"listen\") once", function () {
                Start.run();

                chai.assert(onSpy.withArgs("listening", sinon.match.func).calledOnce);
            });

            it("should call logging function in passed function", function () {
                const logStub = sandbox.stub(Log, "log");

                Start.run();

                const onFunction = onSpy.withArgs("listening", sinon.match.func).firstCall.args[1];
                onFunction();
                chai.assert(logStub.calledOnce);
            });

            it("should log numeric port in passed function", function () {
                const logStub = sandbox.stub(Log, "log");
                process.env.PORT = "4000";

                Start.run();

                const onFunction = onSpy.withArgs("listening", sinon.match.func).firstCall.args[1];
                onFunction();

                chai.assert.match(logStub.firstCall.args[0], /port 4000/);
            });

            it("should log string port in passed function", function () {
                const logStub = sandbox.stub(Log, "log");
                process.env.PORT = "some port";

                Start.run();

                const onFunction = onSpy.withArgs("listening", sinon.match.func).firstCall.args[1];
                onFunction();

                chai.assert.match(logStub.firstCall.args[0], /pipe some port/);
            });

        });

        describe("on(\"error\")", function () {

            it("should call on(\"error\") once", function () {
                Start.run();

                chai.assert(onSpy.withArgs("error", sinon.match.func).calledOnce);
            });

            it("should rethrow unrecognized errors in passed function", function () {
                const errorMessage = "error message";
                const error = new Error(errorMessage);

                Start.run();

                const errorFunction = onSpy.withArgs("error", sinon.match.func).firstCall.args[1];

                chai.assert.throws(() => { errorFunction(error); }, errorMessage);
            });

            it("should throw improved errors for \"EACCES\"", function () {
                const errorMessage = "error message";
                const error = new Error(errorMessage);
                (error as any).syscall = "listen";
                (error as any).code = "EACCES";

                Start.run();

                const errorFunction = onSpy.withArgs("error", sinon.match.func).firstCall.args[1];
                chai.assert.throws(() => { errorFunction(error); }, /permission/);
            });

            it("should throw improved errors for \"EADDRINUSE\"", function () {
                const errorMessage = "error message";
                const error = new Error(errorMessage);
                (error as any).syscall = "listen";
                (error as any).code = "EADDRINUSE";

                Start.run();

                const errorFunction = onSpy.withArgs("error", sinon.match.func).firstCall.args[1];
                chai.assert.throws(() => { errorFunction(error); }, /(using)|(use)/);
            });

            it("should rethrow errors with \"listen\" syscall but unknown code", function () {
                const errorMessage = "error message";
                const error = new Error(errorMessage);
                (error as any).syscall = "listen";
                (error as any).code = "unknown error";

                Start.run();

                const errorFunction = onSpy.withArgs("error", sinon.match.func).firstCall.args[1];
                chai.assert.throws(() => { errorFunction(error); }, errorMessage);
            });

        });


    });

    describe("#normalizePort()", function () {

        it("should return a number if the string is a positive number", function () {
            const port = Start["normalizePort"]("42");

            chai.assert.strictEqual(port, 42);
        });

        it("should return a number if the string is 0", function () {
            const port = Start["normalizePort"]("0");

            chai.assert.strictEqual(port, 0);
        });

        it("should return a string is a non-number", function () {
            const port = Start["normalizePort"]("string");

            chai.assert.strictEqual(port, "string");
        });

        it("should return a string is NaN", function () {
            const port = Start["normalizePort"]("NaN");

            chai.assert.strictEqual(port, "NaN");
        });

        it("should return a string is \"NaN\"", function () {
            const port = Start["normalizePort"]("NaN");

            chai.assert.strictEqual(port, "NaN");
        });

        it("should return a string is a negative number", function () {
            const port = Start["normalizePort"]("-42");

            chai.assert.strictEqual(port, "-42");
        });

    });

    describe("#constructor()", function () {

        it("should not do anything", function () {
            const start = Reflect.construct(Start, []);

            chai.assert.deepEqual(start, {});
        });

    });


});
