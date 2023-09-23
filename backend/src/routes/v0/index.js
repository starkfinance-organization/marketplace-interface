const express = require("express");
const router = express.Router();

router.use("/nft", require("./nft.router"));
router.use("/collection", require("./collection.router"));

module.exports = router;
