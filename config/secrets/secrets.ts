//
// This loads in the contents of config/secrets.json
//

import * as fs from "fs";
import * as path from "path";

/**
 * Throws an error with the specified problem and advises the user to look at
 * readme.
 */
function problem(problem: string): never {
    throw new Error(`${problem} See config/secrets/README.md.`);
}

/**
 * A string to hold the contents of secrets.json.
 */
let secretsString: string | undefined;

try {
    secretsString = fs.readFileSync(path.join(__dirname, "secrets.json"), "utf8");
} catch (e) {
    if (!(e.code === "ENOENT")) {
        throw e;
    }

    // This extraneous throw convinces the ts compiler that this catch always
    // throws, even though problem returns `never`.
    throw problem("Cannot find a config/secrets/secrets.json file.");
}

/**
 * This should hold the contents of the secrets.json file.
 */
let secrets: any;

try {
    secrets = JSON.parse(secretsString);
} catch (e) {
    if (!(e instanceof SyntaxError)) {
        throw e;
    }

    problem("The secrets.json file is not valid json.");
}

/**
 * This should hold a random string with which to sign cookies.
 */
const untypedCookieSecret = secrets.cookieSecret;

if (typeof untypedCookieSecret !== "string") {
    throw problem(`The secrets.json's \"cookieSecret\" holds ${untypedCookieSecret} instead of a string.`);
}

/**
 * This should hold a random string with which to sign cookies.
 */
const cookieSecret: string = untypedCookieSecret;

export { cookieSecret };
