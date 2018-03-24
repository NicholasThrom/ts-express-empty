import * as fs from "fs";
import * as path from "path";

interface Json {
    [key: string]: Json
}

/**
 * Contains data that should not be checked into version control.
 */
class Secrets {

    /**
     * A random string with which to sign cookies.
     */
    public static cookieSecret: string;

    /**
     * This class is uninstantiable.
     */
    private constructor() {
        throw new Error("This class cannot be instantiated");
    }

    /**
     * Throws an error with the specified problem
     * and advises the user to look at readme.
     */
    private static problem(problem: string): never {
        throw new Error(`${problem} See config/secrets/README.md.`);
    }

    /**
     * Gets the json in the secrets-data.json file.
     */
    private static getSecrets() {
        let secretsString: string | undefined;
        const secretsPath = path.join(__dirname, "secrets-data.json");

        try {
            secretsString = fs.readFileSync(secretsPath, "utf8");
        } catch (e) {
            if (!(e.code === "ENOENT")) {
                throw e;
            }
            throw Secrets.problem(`Cannot find a ${secretsPath} file.`);
        }

        let secrets: any;

        try {
            secrets = JSON.parse(secretsString);
        } catch (e) {
            if (!(e instanceof SyntaxError)) {
                throw e;
            }
            throw Secrets.problem("The secrets.json file is not valid json.");
        }

        if (typeof secrets !== "object") {
            throw Secrets.problem(`The secrets.json file must hold an object, not ${secrets}`);
        }

        return secrets as Json;
    }

    /**
     * Pulls the cookie key out of the passed `secrets`.
     */
    private static extractCookieSecret(secrets: {[_: string]: any}) {
        /** A cookie-signing string before typechecking. */
        const cookieSecret = secrets.cookieSecret;

        if (typeof cookieSecret !== "string") {
            throw Secrets.problem(`The secrets.json's \"cookieSecret\" holds ${cookieSecret} instead of a string.`);
        }

        return cookieSecret;
    }

    /**
     * Initializes this class.
     * For unit tests only - do not call.
     */
    public static init() {
        const secrets = this.getSecrets();
        Secrets.cookieSecret = Secrets.extractCookieSecret(secrets);
    }

}

Secrets.init();

export { Secrets };
