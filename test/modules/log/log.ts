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

    describe("#log()", function () {

        let logSpy: sinon.SinonSpy;

        beforeEach(function () {
            logSpy = sandbox.spy(console, "log");
        });

        it("should call console.log", function () {
            Log.log();

            chai.assert(logSpy.calledOnce);
        });

        it("should call console.log with a single string argument", function () {
            const args = ["string"];
            Log.log(...args);

            chai.assert.deepEqual(
                logSpy.firstCall.args,
                args,
            );
        });

        it("should call console.log with multiple string arguments", function () {
            const args = ["string", "another string"];
            Log.log(...args);

            chai.assert.deepEqual(
                logSpy.firstCall.args,
                args,
            );
        });

        it("should call console.log with complex arguments", function () {
            const args = [{ id: 7 }, [[[3], 3]]];
            Log.log(...args);

            chai.assert.deepEqual(
                logSpy.firstCall.args,
                args,
            );
        });

    });

    describe("#constructor()", function () {

        it("should not be instantiable", function () {
            chai.assert.throws(() => { Reflect.construct(Log, []); });
        });

    });

});
