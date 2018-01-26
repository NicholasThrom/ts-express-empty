//
// The home router.
//

import * as express from "express";

const router = express.Router();

router.use("/", (req, res) => {
    res.render("super");
});

export { router };
