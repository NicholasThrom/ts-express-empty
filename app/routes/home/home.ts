import { Router } from "express";

/**
 * **singleton**
 *
 * The `Router` for the home page.
 */
export const home = new (class Home {

    /**
     * **deterministic**,
     * **no side effects**
     *
     * Gets the `Home` `Router`.
     */
    public getRouter() {
        const router = Router();
        router.use("/", (req, res) => {
            res.render("super");
        });
        return router;
    }

})();
