import { Router } from "express";
import { Home } from "./home/home";

/**
 * **singleton**
 *
 * The top of all the routes.
 * It only links to other routers,
 * it doesn't do anything on its own.
 */
export const routes = new (class Routes {

    /**
     * **deterministic**,
     * **no side effects**
     *
     * Gets the top level `Router`.
     */
    public getRouter() {
        const router = Router();
        router.use("/", Home.getRouter());
        return router;
    }

})();
