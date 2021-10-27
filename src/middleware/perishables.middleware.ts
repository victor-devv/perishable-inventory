import express from "express";

class PerishablesMiddleware {

    async validateRequiredAddItemBodyFields(req: express.Request, res: express.Response, next: express.NextFunction) {

      if (req.body && req.body.quantity && req.body.expiry) {
          next();
      } else {
          res.status(400).send({
              status: `Failed`,
              error: `Required Fields Missing`,
          });
      }

    }

    async validateRequiredSellItemBodyFields(req: express.Request, res: express.Response, next: express.NextFunction) {

      if (req.body && req.body.quantity) {
          next();
      } else {
          res.status(400).send({
              status: `Failed`,
              error: `Required Field Missing`,
          });
      }

    }
}

export default new PerishablesMiddleware();