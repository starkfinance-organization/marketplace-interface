const databaseService = require("../dbs/instant.dbs");
const axios = require("axios");

class NFTController {
  saveListing = async (req, res) => {
    const {
      contract_address,
      token_id,
      signer,
      price,
      signature4,
      nonce,
      image_url,
      name,
      time_end,
    } = req.body;

    const saveListingSQL = `INSERT INTO listing_nft_record (contract_address, token_id, signer, price, signature4, nonce, status, transaction_hash, is_listing, image_url, name, time_end)
    SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?
    WHERE NOT EXISTS (
      SELECT 1
      FROM listing_nft_record
      WHERE contract_address = ? AND token_id = ? AND signer = ? AND signature4 = ? AND status NOT IN ('SALE', 'CANCEL')
    )`;

    const saveListingValue = [
      contract_address,
      token_id,
      signer,
      price,
      signature4,
      nonce,
      "LISTING",
      "",
      1,
      image_url || "",
      name || "",
      time_end,
      contract_address,
      token_id,
      signer,
      signature4,
    ];

    const checkIfExistsSQL = `SELECT * FROM listing_nft_record  WHERE contract_address = ? AND token_id = ? AND signer = ? AND status NOT IN ('SALE', 'CANCEL')`;
    const checkIfExistsValues = [contract_address, token_id, signer];

    let resultsExists = await databaseService.queryPromise(
      checkIfExistsSQL,
      checkIfExistsValues
    );

    if (resultsExists.length > 0) {
      res.status(400).json({ error: "The listing already exists." });
      return;
    }

    try {
      let resultsSave = await databaseService.queryPromise(
        saveListingSQL,
        saveListingValue
      );

      if (resultsSave.length > 0) {
        res.status(200).json({ error: "The listing already exists." });
      }
      return res.status(200).json({ resultsSave });
    } catch (e) {
      if (resultsSave.length > 0) {
        res.status(400).json({ error: "Insert fail." });
      }
    }
  };

  getListing = async (req, res) => {
    const collectionAddress = req.query.contract_address;
    const tokenId = req.query.token_id;
    const signer = req.query.signer;

    let query = `
      SELECT *
      FROM listing_nft_record
    `;

    const values = [];

    if (collectionAddress && tokenId) {
      query += ` WHERE contract_address = ? AND token_id = ?`;
      values.push(collectionAddress, tokenId);
    } else if (signer) {
      query += ` WHERE signer = ?`;
      values.push(signer);
    } else if (collectionAddress) {
      query += ` WHERE contract_address = ?`;
      values.push(collectionAddress);
    } else {
      return res.status(400).json({ error: "Invalid request parameters" });
    }

    query += `AND status NOT IN ('SALE', 'CANCEL') `;
    try {
      let data = await databaseService.queryPromise(query, values);
      return res.status(200).json({ data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  getListingAll = async (req, res) => {
    let query = `
      SELECT *
      FROM listing_nft_record
      WHERE status NOT IN ('CANCEL')
    `;

    const values = [];

    try {
      let data = await databaseService.queryPromise(query, values);
      return res.status(200).json({ data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  getListingAddBuyAddressOwner = async (req, res) => {
    let { owner_address } = req.query;

    let query = `
    SELECT *
    FROM listing_nft_record
    WHERE signer = ?
  `;

    const values = [owner_address];

    try {
      let data = await databaseService.queryPromise(query, values);
      return res.status(200).json({ data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  putListing = async (req, res) => {
    const { contract_address, token_id, status, transaction_hash } = req.body;
    const transaction_hash_value = transaction_hash || "";

    const sql = `UPDATE listing_nft_record SET status = ?, update_at = NOW(), transaction_hash = ? WHERE contract_address = ? AND token_id = ?`;
    const values = [status, transaction_hash_value, contract_address, token_id];

    try {
      let result = await databaseService.queryPromise(sql, values);
      res.status(200).json({ message: "NFT Listing updated successfully" });
    } catch (err) {
      res
        .status(500)
        .json({ error: "An error occurred while updating the listing" });
    }
  };

  getNFTFilter = async (req, res, next) => {
    let {
      contract_address,
      sort,
      limit,
      page,
      min_price,
      max_price,
      type,
      token_id,
      signer,
      status,
    } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 30;
    sort = sort || "DESC";
    status = status || "LISTING";
    const offset = (page - 1) * limit;

    let queryNFT = `SELECT *
    FROM listing_nft_record 
    WHERE 1=1 ${min_price ? "AND price >= ?" : ""}
        ${max_price ? "AND price <= ?" : ""}
        ${contract_address ? "AND contract_address = ?" : ""}
        ${signer ? "AND signer = ?" : ""}
        ${token_id ? "AND token_id = ?" : ""}
        ${status ? "AND status = ?" : ""}`;

    const countTotalRow = `SELECT count(*) as total
    FROM listing_nft_record 
    WHERE 1=1 ${min_price ? "AND price >= ?" : ""}
        ${max_price ? "AND price <= ?" : ""}
        ${contract_address ? "AND contract_address = ?" : ""}
        ${signer ? "AND signer = ?" : ""}
        ${token_id ? "AND token_id = ?" : ""}
        ${status ? "AND status = ?" : ""}`;

    const values = [];
    if (min_price) values.push(min_price);
    if (max_price) values.push(max_price);
    if (contract_address) values.push(contract_address);
    if (signer) values.push(signer);
    if (token_id) values.push(token_id);
    if (status) values.push(status);

    let sortSrt = "";
    switch (type) {
      case "1": {
        sortSrt = ` ORDER BY created_at DESC`;
        break;
      }
      case "3": {
        sortSrt = ` ORDER BY price DESC`;
        break;
      }
      case "2": {
        sortSrt = ` ORDER BY -price DESC`;
        break;
      }
    }

    queryNFT = queryNFT + sortSrt + ` LIMIT ? OFFSET ?`;

    try {
      const totalResult = await databaseService.queryPromise(
        countTotalRow,
        values
      );

      const totalRecord = totalResult[0].total;
      const totalPages = Math.ceil(totalRecord / limit);

      values.push(limit, offset);

      const result = await databaseService.queryPromise(queryNFT, values);

      res.status(200).json({
        data: result,
        totalPages,
        nextPage: page + 1,
      });
    } catch (err) {
      console.log(err);
      res.send(500);
    }
  };

  cronTrasaction = async (req, res) => {};
}

module.exports = new NFTController();
