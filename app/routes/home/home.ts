//
// The home router.
//

// External imports.
import * as express from "express";

// Internal imports.



/**
 * The class to be exported.
 */
class E {

    public static readonly router = express.Router();

    /**
     * Initializes this class.
     * For unit tests only – do not call.
     */
    public static init() {
        E.router.use("/", (req, res) => {
            res.render("super");
        });
    }

    /**
     * This class is never instantiated.
     */
    private constructor() {}

}

E.init();



export default E;
