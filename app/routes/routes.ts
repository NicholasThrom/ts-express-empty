//
// The top of all the routes.
// It doesn't do anything but link to other routers.
//

// External imports.
import * as express from "express";

// Internal imports.
import home from "./home/home";



/**
 * The class to be exported.
 */
class E {

    /**
     * The top level router.
     */
    public static readonly router = express.Router();

    /**
     * Initializes this class.
     * For unit tests only – do not call.
     */
    public static init() {

        E.router.use("/", home.router);

    }

    /**
     * This class is never instantiated.
     */
    private constructor() {}

}

E.init();



export default E;
