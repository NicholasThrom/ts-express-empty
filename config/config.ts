import * as fs from "fs";
import * as path from "path";

import { JSONable } from "../modules/jsonable/jsonable";

class Uninstantiable {
    private constructor() {}
}

export class Config {

    private static readonly filePath = path.join(__dirname, "config-data.json");

    private static cache: JSONable | undefined;

    /**
     * Throws an error with the specified problem
     * and advises the user to look at readme.
     */
    private static problem(problem: string): never {
        throw new Error(`${problem} See /config/README.md.`);
    }

    private static getString() {
        let config: string | undefined;
        try {
            config = fs.readFileSync(Config.filePath, "utf8");
        } catch (e) {
            if (!(e.code === "ENOENT")) {
                throw e;
            }
            throw Config.problem(`Cannot find a ${Config.filePath} file.`);
        }
        return config;
    }

    private static getJSONable() {
        const config = JSONable.parse(Config.getString());
        if (config.isUndefined) {
            throw Config.problem(`Syntax error in ${Config.filePath}.`);
        }
        return config;
    }

    private static getConfig() {
        if (!Config.cache) {
            Config.cache = Config.getJSONable();
        }
        return Config.cache;
    }

    public static getCookieSecret() {
        const cookieSecret = Config.getConfig().get("cookieSecret").string;
        if (!cookieSecret) {
            throw Config.problem(`${Config.filePath} is missing a "cookieSecret" string.`);
        }
        return cookieSecret;
    }

}
