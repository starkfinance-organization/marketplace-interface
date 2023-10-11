const nftController = require("../../controllers/nft.controller");
const express = require("express");
const router = express.Router();

router.post("/list", nftController.saveListing);
router.get("/list", nftController.getListing);
router.put("/list", nftController.putListing);
router.get("/listing", nftController.getListingAll);
router.get("/listing-owner", nftController.getListingAddBuyAddressOwner);
router.get("/filter", nftController.getNFTFilter);

router.get("/offers", nftController.getAllOffersForNFT);
router.get("/offers/signer", nftController.getAllOffersBySigner);
router.put("/accept-offer", nftController.acceptOffer);
router.put("/cancel-offer", nftController.cancelOffer);
router.post("/offer", nftController.saveOffer);

module.exports = router;
