import * as express from "express";

/**
 * The home router.
 */
class Home {

    public static readonly router = express.Router();

    /**
     * Initializes this class.
     * For unit tests only – do not call.
     */
    public static init() {
        Home.router.use("/", (req, res) => {
            res.render("super");
        });
    }

    /**
     * This class is never instantiated.
     */
    private constructor() {
        throw new Error("This class cannot be instantiated");
    }

}

Home.init();



export { Home };
