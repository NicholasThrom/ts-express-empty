
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import lessMiddleware = require("less-middleware");
import * as morgan from "morgan";
import * as path from "path";

import { Secrets } from "../config/secrets/secrets";
import { HTTPError } from "../modules/types/types";
import { Routes } from "./routes/routes";

/**
 * The whole app.
 */
class App {

    /**
     * The express application.
     */
    public static app = express();

    /**
     * Initializes this class.
     * For unit tests only – do not call.
     */
    public static init() {

        // Set up the app.
        App.app.set("views", path.join(__dirname, "views"));
        App.app.set("view engine", "pug");

        App.app.use(morgan("dev"));
        App.app.use(bodyParser.json());
        App.app.use(bodyParser.urlencoded({ extended: true }));
        App.app.use(cookieParser(Secrets.cookieSecret));
        App.app.use("/public", lessMiddleware(path.join(__dirname, "public")));
        App.app.use("/public", express.static(path.join(__dirname, "public")));



        // Main app
        App.app.use("/", Routes.router);



        // Error handling
        App.app.use(() => {
            const error = new HTTPError("Page not found");
            error.status = 404;
            throw error;
        });

        // Typescript apparently is incapable of working out these types for itself.
        App.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            if (err instanceof HTTPError) {
                res.status(err.status);
            } else {
                res.status(500);
            }
            res.send(err.message);
        });

    }

    /**
     * This class is never instantiated.
     */
    private constructor() {
        throw new Error("This class cannot be instantiated");
    }

}

App.init();

export { App };
