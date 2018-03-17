//
// The top of the application. Everything runs from here.
//

// External imports.
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import lessMiddleware = require("less-middleware");
import * as morgan from "morgan";
import * as path from "path";

// Internal imports.
import { Secrets } from "../config/secrets/secrets";
import { HTTPError } from "../modules/types/types";
import routes from "./routes/routes";



/**
 * The class to be exported.
 */
class E {

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
        E.app.set("views", path.join(__dirname, "views"));
        E.app.set("view engine", "pug");

        E.app.use(morgan("dev"));
        E.app.use(bodyParser.json());
        E.app.use(bodyParser.urlencoded({ extended: true }));
        E.app.use(cookieParser(Secrets.cookieSecret));
        E.app.use("/public", lessMiddleware(path.join(__dirname, "public")));
        E.app.use("/public", express.static(path.join(__dirname, "public")));



        // Main app
        E.app.use("/", routes.router);



        // Error handling
        E.app.use(() => {
            const error = new HTTPError("Page not found");
            error.status = 404;
            throw error;
        });

        // Typescript apparently is incapable of working out these types for itself.
        E.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
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

E.init();



export default E;
