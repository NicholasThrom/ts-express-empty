import { Router } from "express";
import { Home } from "./home/home";

/**
 * **uninstantiable**
 *
 * The top of all the routes.
 * It only links to other routers,
 * it doesn't do anything on its own.
 */
class Routes {

    /**
     * This class cannot be instantiated.
     */
    private constructor() {
        throw new Error("This class cannot be instantiated.");
    }

    /**
     * **deterministic**,
     * **no side effects**
     *
     * Gets the top level `Router`.
     */
    public static getRouter() {
        const router = Router();
        router.use("/", Home.getRouter());
        return router;
    }

}

export { Routes };
