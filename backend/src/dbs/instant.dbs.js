"use strict";

const mysql = require("mysql2");
const { dbConfig } = require("../configs/db.config");

class DatabaseService {
  constructor() {
    this.pool = null;
  }

  async createPool(config) {
    try {
      this.pool = mysql.createPool(config);
    } catch (error) {
      console.log(error);
    }
  }

  getPool() {
    const pool = this.pool;
    if (!pool) {
      throw new Error(
        "Database pool is not defined. Please create a pool first."
      );
    }

    return pool;
  }

  queryPromise(query, params) {
    if (!this.pool) {
      createPool(dbConfig);
    }

    return new Promise((resolve, reject) => {
      this.pool.query(query, params, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }
}

module.exports = new DatabaseService();
