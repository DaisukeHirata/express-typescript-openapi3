import "mocha";
import chaiHttp = require("chai-http");
import * as chai from "chai";
import { initApp } from "../src/application";
import { testContainer } from "./inversify.test.config";

const expect = chai.expect;
chai.use(chaiHttp);

describe("App", () => {
  let app = null;

  beforeEach(() => {
    app = initApp(testContainer);
  });

  afterEach(() => {
    app = null;
  });

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
