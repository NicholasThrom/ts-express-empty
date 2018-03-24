import { Router } from "express";

/**
 * **uninstantiable**
 *
 * The `Router` for the home page.
 */
class Home {

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
     * Gets the `Home` `Router`.
     */
    public static getRouter() {
        const router = Router();
        router.use("/", (req, res) => {
            res.render("super");
        });
        return router;
    }

}

export { Home };
