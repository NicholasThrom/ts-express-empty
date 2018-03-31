import { SinonSandbox } from "sinon";
import { config } from "../../app/config/config";

/**
 * Since the `config` file is designed to fail on initial clone,
 * but the tests should pass on initial clone,
 * this class stubs every method on config
 * to ensure tests can use it as normal.
 */
class StubConfig {

    /**
     * Stubs every accessor on the `config` object
     * to ensure a well-formed conffig file
     * is not required to run tests.
     */
    public stubConfig(sandbox: SinonSandbox) {
        sandbox.stub(config, "getCookieSecret").returns("stubbed cookie secret");
    }

}

export const stubConfig = new StubConfig();
