require("dotenv").config();
const compression = require("compression");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const testController = require("./controllers/test.controller");
const databaseService = require("./dbs/instant.dbs");
const { dbConfig } = require("./configs/db.config");
const nftController = require("./controllers/nft.controller");
const cron = require("node-cron");
const { checkTransactions, CronCancel } = require("./services/cronTracsaction");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

databaseService.createPool(dbConfig);

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    stack: error.stack,
    message: error.message || "Internal Server Error",
  });
});

app.use("/api", require("./routes"));

app.get("/api", (req, res) => {
  testController.test(req, res);
});

cron.schedule("*/30 * * * * *", () => {
  console.log("cron started");
  checkTransactions();
  CronCancel();
});
checkTransactions();

module.exports = app;
