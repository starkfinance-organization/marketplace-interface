"use strict";

class TestController {
  test = async (req, res, next) => {
    try {
      res.json({
        OK: 1,
      });
    } catch (error) {
      console.error(`error::`, error);
      next();
    }
  };
}

module.exports = new TestController();
