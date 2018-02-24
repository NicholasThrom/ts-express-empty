//
// Tests module/log/log.ts
//

import * as chai from "chai";
import "mocha";
import * as sinon from "sinon";
const sandbox = sinon.sandbox.create();

// Subject
import Log from "../../../modules/log/log";



describe("module/log/log.ts", function () {

    afterEach(function () {
        sandbox.restore();
    });

    it("should exist", function () {
        chai.assert(Log);
    });

    describe(".log()", function () {

        let logStub: sinon.SinonSpy;

        beforeEach(function () {
            logStub = sandbox.stub(console, "log");
        });

        it("should call console.log", function () {
            Log.log();

            chai.assert(logStub.calledOnce);

            // This is called so the result of the test is output.
            sandbox.restore();
        });

        it("should call console.log with a single string argument", function () {
            const args = ["string"];
            Log.log(...args);

            chai.assert.deepEqual(
                logStub.firstCall.args,
                args,
            );

            sandbox.restore();
        });

        it("should call console.log with multiple string arguments", function () {
            const args = ["string", "another string"];
            Log.log(...args);

            chai.assert.deepEqual(
                logStub.firstCall.args,
                args,
            );

            sandbox.restore();
        });

        it("should call console.log with complex arguments", function () {
            const args = [{ id: 7 }, [[[3], 3]]];
            Log.log(...args);

            chai.assert.deepEqual(
                logStub.firstCall.args,
                args,
            );

            sandbox.restore();
        });

    });

    describe(".constructor()", function () {

        it("should not be instantiable", function () {
            chai.assert.throws(() => { Reflect.construct(Log, []); });
        });

    });

});
