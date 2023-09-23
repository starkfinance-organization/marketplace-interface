const { default: axios } = require("axios");
const databaseService = require("../dbs/instant.dbs");

const checkTransactions = async () => {
  let query = `
      SELECT *
      FROM listing_nft_record
      WHERE status = 'BUYING'
    `;
  const values = [];

  try {
    let transactionList = await databaseService.queryPromise(query, values);
    for (let i = 0; i < transactionList.length; i++) {
      let transaction = transactionList[i];
      console.log("Transaction processing: " + transactionList.length);

      const tx = transaction.transaction_hash;
      const options = {
        method: "GET",
        url: `https://api.starkscan.co/api/v0/transaction/${tx}`,
        headers: {
          accept: "application/json",
          "x-api-key": "zFHLASqKrQ1m1rWnZwhR08ldxj8Fdc3NJxxlbJSj",
        },
      };

      axios
        .request(options)
        .then(async (response) => {
          if (
            response.data.transaction_status == "ACCEPTED_ON_L1" ||
            response.data.transaction_status == "ACCEPTED_ON_L2"
          ) {
            let query = `
                    UPDATE listing_nft_record SET status = 'SALE'
                     WHERE id = ?
                `;
            const values = [transaction.id];

            let result = await databaseService.queryPromise(query, values);
          }
        })
        .catch(function (error) {
          console.error("error transaction", tx);
        });
    }
  } catch (error) {
    console.log(error);
  }
};

const CronCancel = async () => {
  const query = `SELECT * FROM listing_nft_record WHERE status = 'LISTING' AND time_end < NOW()`;

  try {
    let response = await databaseService.queryPromise(query, []);

    response.forEach(async (element) => {
      let queryCancel = `UPDATE listing_nft_record SET status = 'CANCEL', update_at = NOW() WHERE id = ?`;
      let values = [element.id];

      let result = await databaseService.queryPromise(queryCancel, values);
      console.log("canceled", result);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { checkTransactions, CronCancel };
