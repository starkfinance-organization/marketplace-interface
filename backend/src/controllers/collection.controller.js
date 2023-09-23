const databaseService = require("../dbs/instant.dbs");

class CollectionController {
  getAllCollection = async (req, res) => {
    let query = `SELECT * FROM collection`;

    try {
      let result = await databaseService.queryPromise(query, []);
      res.status(200).send({ data: result });
    } catch (error) {
      res.status(404).send({ error: error });
    }
  };

  getCollectionByAddress = async (req, res) => {
    let { contract_address } = req.params;

    let query = `SELECT * FROM collection WHERE contract_address = ?`;
    let value = [contract_address];
    try {
      let result = await databaseService.queryPromise(query, value);
      res.status(200).send({ data: result });
    } catch (error) {
      res.status(404).send({ error: error });
    }
  };
}

module.exports = new CollectionController();
