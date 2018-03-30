
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import lessMiddleware = require("less-middleware");
import * as morgan from "morgan";
import * as path from "path";

import { Config } from "../config/config";
import { HTTPError } from "../modules/types/types";
import { Routes } from "./routes/routes";

/**
 * **uninstantiable**
 *
 * The whole app.
 */
export class App {

    /**
     * This class cannot be instantiated.
     */
    private constructor() {
        throw new Error("This class cannot be instantiated.");
    }

    /**
     * **mutates arguments**
     *
     * Sets up the middleware on the specified express app.
     */
    private static setUpMiddleware(app: express.Application) {
        app.set("views", path.join(__dirname, "views"));
        app.set("view engine", "pug");

        app.use(morgan("dev"));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cookieParser(Config.getCookieSecret()));
        app.use("/public", lessMiddleware(path.join(__dirname, "public")));
        app.use("/public", express.static(path.join(__dirname, "public")));
    }

    /**
     * The last `Handler`, to catch any requests that none of the other
     * `Handler`s caught.
     */
    private static readonly pageNotFoundHandler: express.Handler = () => {
        const error = new HTTPError("Page not found");
        error.status = 404;
        throw error;
    }

    /**
     * The error handler.
     *
     * If an error occurs, this function responds appropriately.
     */
    private static readonly errorHandler: express.ErrorRequestHandler = (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
        // Four arguments are needed so express can tell it is an error handler.
    ) => {
        if (err instanceof HTTPError) {
            res.status(err.status);
        } else {
            res.status(500);
        }
        res.send(err.message);
    }

    /**
     * **no side effects**,
     * **deterministic**
     *
     * Gets and sets up the express app.
     *
     * Does not do anything with the app.
     */
    public static getApp() {
        const app = express();

        App.setUpMiddleware(app);

        app.use("/", Routes.getRouter());
        app.use(App.pageNotFoundHandler);
        app.use(App.errorHandler);

        return app;
    }

}
