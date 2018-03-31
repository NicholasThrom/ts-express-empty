import { assert } from "chai";
import "mocha";
import { sandbox as sandboxFactory } from "sinon";
const sandbox = sandboxFactory.create();

import { log } from "../../../modules/log/log";

describe("module/log/log", function () {

    afterEach(function () {
        sandbox.restore();
    });

    it("should exist", function () {
        assert.exists(log);
    });

    describe(".log()", function () {

        let logStub: sinon.SinonSpy;

        beforeEach(function () {
            logStub = sandbox.stub(console, "log");
        });

        it("should call console.log", function () {
            log.log();

            assert.strictEqual(logStub.callCount, 1);

            // This is called so the result of the test is output.
            sandbox.restore();
        });

        it("should call console.log with a single string argument", function () {
            const args = ["any string"];
            log.log(...args);

            assert.deepEqual(logStub.firstCall.args, args);

            sandbox.restore();
        });

        it("should call console.log with multiple string arguments", function () {
            const args = ["string", "another string"];
            log.log(...args);

            assert.deepEqual(logStub.firstCall.args, args);

            sandbox.restore();
        });

        it("should call console.log with complex arguments", function () {
            const args = [{ id: 7 }, [[[3], 3]]];
            log.log(...args);

            assert.deepEqual(logStub.firstCall.args, args);

            sandbox.restore();
        });

    });

});
