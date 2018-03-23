
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
    public readonly app = express();

    private static setUpMiddleware(app: express.Application) {
        app.set("views", path.join(__dirname, "views"));
        app.set("view engine", "pug");

        app.use(morgan("dev"));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cookieParser(Secrets.cookieSecret));
        app.use("/public", lessMiddleware(path.join(__dirname, "public")));
        app.use("/public", express.static(path.join(__dirname, "public")));
    }

    private static readonly pageNotFoundHandler: express.Handler = () => {
        const error = new HTTPError("Page not found");
        error.status = 404;
        throw error;
    }

    private static readonly onError: express.ErrorRequestHandler = (
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

    public static getApp() {
        const app = express();

        App.setUpMiddleware(app);

        app.use("/", Routes.router);
        app.use(App.pageNotFoundHandler);
        app.use(App.onError);

        return app;
    }

    /**
     * This class cannot be instantiated.
     */
    private constructor() {
        throw new Error("This class cannot be instantiated.");
    }

}


export { App };
