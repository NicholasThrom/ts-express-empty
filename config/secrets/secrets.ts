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
    private static getSecrets(): any {

        /**
         * The contents of secrets.json before parsing.
         */
        let secretsString: string | undefined;

        try {
            secretsString = fs.readFileSync(path.join(__dirname, "secrets.json"), "utf8");
        } catch (e) {
            if (!(e.code === "ENOENT")) {
                throw e;
            }

            // The extraneous throw convinces the ts compiler that this catch always
            // throws, even though problem returns `never`.
            throw E.problem("Cannot find a config/secrets/secrets.json file.");
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

            E.problem("The secrets.json file is not valid json.");
        }

        return secrets;

    }

    /**
     * Initializes this class.
     * For unit tests only – do not call.
     */
    public static init() {

        const secrets = this.getSecrets();

        /** A cookie-signing string before typechecking. */
        const untypedCookieSecret = secrets.cookieSecret;

        if (typeof untypedCookieSecret !== "string") {
            throw E.problem(`The secrets.json's \"cookieSecret\" holds ${untypedCookieSecret} instead of a string.`);
        }

        E.cookieSecret = untypedCookieSecret;

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
