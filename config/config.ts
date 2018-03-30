import * as fs from "fs";
import * as path from "path";

import { JSONable } from "../modules/jsonable/jsonable";

class Config {

    private readonly filePath = path.join(__dirname, "config-data.json");

    private cache: JSONable | undefined;

    /**
     * Throws an error with the specified problem
     * and advises the user to look at readme.
     */
    private problem(problem: string): never {
        throw new Error(`${problem} See /config/README.md.`);
    }

    private getString() {
        let config: string | undefined;
        try {
            config = fs.readFileSync(this.filePath, "utf8");
        } catch (e) {
            if (!(e.code === "ENOENT")) {
                throw e;
            }
            throw this.problem(`Cannot find a ${this.filePath} file.`);
        }
        return config;
    }

    private getJSONable() {
        const config = JSONable.parse(this.getString());
        if (config.isUndefined) {
            throw this.problem(`Syntax error in ${this.filePath}.`);
        }
        return config;
    }

    private  getConfig() {
        if (!this.cache) {
            this.cache = this.getJSONable();
        }
        return this.cache;
    }

    public getCookieSecret() {
        const cookieSecret = this.getConfig().get("cookieSecret").string;
        if (!cookieSecret) {
            throw this.problem(`${this.filePath} is missing a "cookieSecret" string.`);
        }
        return cookieSecret;
    }

}

export const config = new Config();
