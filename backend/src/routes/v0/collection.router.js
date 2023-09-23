const collectionController = require("../../controllers/collection.controller");
const express = require("express");
const router = express.Router();

router.get("/:contract_address", collectionController.getCollectionByAddress);
router.get("/", collectionController.getAllCollection);

module.exports = router;
