//
// Tests config/secrets/secrets.ts
//

import * as chai from "chai";
import "mocha";
import * as sinon from "sinon";
const sandbox = sinon.sandbox.create();

// External imports
import * as fs from "fs";

const readFileSyncStub = sandbox.stub(fs, "readFileSync");
readFileSyncStub.withArgs(sinon.match(/.*secrets\.json/), "utf8").returns(`
{
    "cookieSecret": "fakeSecret"
}
`);
readFileSyncStub.callThrough();

// Subject
import { Secrets } from "../../../config/secrets/secrets";

sandbox.restore();

describe("config/secrets/secrets.ts", function () {

    afterEach(function () {
        sandbox.restore();
    });

    it("should exist", function () {
        chai.assert(Secrets);
    });

});
