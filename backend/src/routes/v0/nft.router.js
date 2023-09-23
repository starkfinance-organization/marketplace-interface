const nftController = require("../../controllers/nft.controller");
const express = require("express");
const router = express.Router();

router.post("/list", nftController.saveListing);
router.get("/list", nftController.getListing);
router.put("/list", nftController.putListing);
router.get("/listing", nftController.getListingAll);
router.get("/listing-owner", nftController.getListingAddBuyAddressOwner);
router.get("/filter", nftController.getNFTFilter);

module.exports = router;
