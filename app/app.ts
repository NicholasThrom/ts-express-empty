//
// The top of the application. Everything runs from here.
//

import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import lessMiddleware = require("less-middleware");
import * as morgan from "morgan";
import * as path from "path";
import { cookieSecret } from "../config/secrets/secrets";
import { HTTPError } from "../modules/types/types";

import { router } from "./routes/routes";

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(cookieSecret));
app.use("/public", lessMiddleware(path.join(__dirname, "public")));
app.use("/public", express.static(path.join(__dirname, "public")));



// Main app
app.use("/", router);

// Error handling
app.use((req, res, next) => {
    const error = new HTTPError("Page not found");
    error.status = 404;
    next(error);
});

// Typescript apparently is incapable of working out these types for itself.
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof HTTPError) {
        res.status(err.status);
    } else {
        res.status(500);
    }
    res.send(err.message);
});

export { app };
