import chaiHttp = require("chai-http");
import * as chai from "chai";
import { initApp } from "../src/application";
import { myContainer } from "../src/inversify/inversify.config";
import "mocha";

const expect = chai.expect;
chai.use(chaiHttp);
const app = initApp(myContainer);

describe("App", () => {
  it("works", (done: () => void): void => {
  chai.request(app)
      .get("/docs/")
      .send({})
      .end((err: Error, res: any): void => {
          expect(res.statusCode).to.be.equal(200);
          done();
      });
    });
});
