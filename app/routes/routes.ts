import * as express from "express";

import home from "./home/home";

/**
 * The top of all the routes.
 * It only links to other routers.
 */
class Routes {

    /**
     * The top level router.
     */
    public static readonly router = express.Router();

    /**
     * Initializes this class.
     * For unit tests only – do not call.
     */
    public static init() {

        Routes.router.use("/", home.router);

    }

    /**
     * This class is never instantiated.
     */
    private constructor() {
        throw new Error("This class cannot be instantiated");
    }

}

Routes.init();

export { Routes };
