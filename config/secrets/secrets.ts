//
// This loads in the contents of config/secrets.json
//

// External imports.
import * as fs from "fs";
import * as path from "path";



/**
 * The class to be exported.
 */
class E {

    /**
     * This holds a random string with which to sign cookies.
     */
    public static cookieSecret: string;

    /**
     * Throws an error with the specified problem and advises the user to look
     * at readme.
     */
    private static problem(problem: string): never {
        throw new Error(`${problem} See config/secrets/README.md.`);
    }

    /**
     * Gets the json in the secrets.json file. Throws nice errors if there is a
     * problem.
     */
    private static getSecrets() {

        /**
         * The contents of secrets.json before parsing.
         */
        let secretsString: string | undefined;

        const secretsPath = path.join(__dirname, "secrets.json");

        try {
            secretsString = fs.readFileSync(secretsPath, "utf8");
        } catch (e) {
            if (!(e.code === "ENOENT")) {
                throw e;
            }

            // The extraneous throw convinces the ts compiler that this catch always
            // throws, even though problem returns `never`.
            throw E.problem(`Cannot find a ${secretsPath} file.`);
        }

        /**
         * The contents of the secrets.json file after parsing.
         */
        let secrets: any;

        try {
            secrets = JSON.parse(secretsString);
        } catch (e) {
            if (!(e instanceof SyntaxError)) {
                throw e;
            }

            throw E.problem("The secrets.json file is not valid json.");
        }

        if (typeof secrets !== "object") {
            throw E.problem(`The secrets.json file must hold an object, not ${secrets}`);
        }

        // Logically this is the only possible thing in a json object.
        return secrets as {[_: string]: any};

    }

    /**
     * Pulls the cookie secret out of the passed `secrets`.
     */
    private static extractCookieSecret(secrets: {[_: string]: any}) {
        /** A cookie-signing string before typechecking. */
        const cookieSecret = secrets.cookieSecret;

        if (typeof cookieSecret !== "string") {
            throw E.problem(`The secrets.json's \"cookieSecret\" holds ${cookieSecret} instead of a string.`);
        }

        return cookieSecret;
    }

    /**
     * Initializes this class.
     * For unit tests only – do not call.
     */
    public static init() {

        const secrets = this.getSecrets();

        E.cookieSecret = E.extractCookieSecret(secrets);

    }

    /**
     * This class is never instantiated.
     */
    private constructor() {
        throw new Error("This class cannot be instantiated");
    }

}

E.init();


export default E;
