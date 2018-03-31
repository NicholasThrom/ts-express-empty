
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import lessMiddleware = require("less-middleware");
import * as morgan from "morgan";
import * as path from "path";

import { config } from "./config/config";
import { HTTPError } from "./modules/types/types";
import { routes } from "./routes/routes";

/**
 * **singleton**
 *
 * Gets and sets up the express app.
 *
 * The relevant method is `getApp`.
 */
export const app = new (class App {

    /**
     * **mutates arguments**
     *
     * Sets up the middleware on the specified express app.
     */
    private setUpMiddleware(app: express.Application) {
        app.set("views", path.join(__dirname, "views"));
        app.set("view engine", "pug");

        app.use(morgan("dev"));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cookieParser(config.getCookieSecret()));
        app.use("/public", lessMiddleware(path.join(__dirname, "public")));
        app.use("/public", express.static(path.join(__dirname, "public")));
    }

    /**
     * The last `Handler`, to catch any requests that none of the other
     * `Handler`s caught.
     */
    private readonly pageNotFoundHandler: express.Handler = () => {
        const error = new HTTPError("Page not found");
        error.status = 404;
        throw error;
    }

    /**
     * The error handler.
     *
     * If an error occurs, this function responds appropriately.
     */
    private readonly errorHandler: express.ErrorRequestHandler = (
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
    public getApp() {
        const app = express();

        this.setUpMiddleware(app);

        app.use("/", routes.getRouter());
        app.use(this.pageNotFoundHandler);
        app.use(this.errorHandler);

        return app;
    }

})();
