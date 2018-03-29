import * as fs from "fs";
import * as path from "path";

import { JSONable } from "../../modules/jsonable/jsonable";

class Uninstantiable {
    private constructor() {}
}

export class Secrets {

    private static readonly secretsFilePath = path.join(__dirname, "secrets-data.json");

    private static secretsCache: JSONable | undefined;

    /**
     * Throws an error with the specified problem
     * and advises the user to look at readme.
     */
    private static problem(problem: string): never {
        throw new Error(`${problem} See config/secrets/README.md.`);
    }

    private static getSecretsString() {
        let secrets: string | undefined;
        try {
            secrets = fs.readFileSync(Secrets.secretsFilePath, "utf8");
        } catch (e) {
            if (!(e.code === "ENOENT")) {
                throw e;
            }
            throw Secrets.problem(`Cannot find a ${Secrets.secretsFilePath} file.`);
        }
        return secrets;
    }

    private static getSecretsJSONable() {
        const secrets = new JSONable(Secrets.getSecretsString());
        if (secrets.isUndefined) {
            throw Secrets.problem(`Syntax error in ${Secrets.secretsFilePath}.`);
        }
        return secrets;
    }

    private static getSecrets() {
        if (!Secrets.secretsCache) {
            Secrets.secretsCache = Secrets.getSecretsJSONable();
        }
        return Secrets.secretsCache;
    }

    public static getCookieSecret() {
        const cookieSecret = Secrets.getSecrets().get("cookieSecret").string;
        if (!cookieSecret) {
            throw Secrets.problem(`${Secrets.secretsFilePath} is missing a "cookieSecret" string.`);
        }
    }

}
