//
// The top of all the routes.
// It doesn't do anything but link to other routers.
//

import * as express from "express";

import { router as home } from "./home/home";

const router = express.Router();

router.use("/", home);

export { router };
