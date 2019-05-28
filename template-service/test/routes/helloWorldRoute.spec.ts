import "mocha";
import chaiHttp = require("chai-http");
import * as chai from "chai";
import { initApp } from "../../src/application";
import { testContainer } from "../inversify.test.config";

const expect = chai.expect;
chai.use(chaiHttp);

describe("Hello World - Test path with parameters ", function () {
  let app = null;

  beforeEach(() => {
    app = initApp(testContainer);
  });

  afterEach(() => {
    app = null;
  });

  it("should be able to return hello xxx with parameters", (done: () => void): void => {
      chai.request(app)
          .get("/api/hello?greeting=world")
          .set("content-type", "application/json")
          .send({})
          .end((err: Error, res: any): void => {
              expect(res.statusCode).to.be.equal(200);
              expect(res.body.msg).to.be.equal("hello world");
              done();
          });
  });

  it("should return an error for missing required parameters", (done: () => void): void => {
    chai.request(app)
        .get("/api/hello/")
        .set("content-type", "application/json")
        .send({})
        .end((err: Error, res: any): void => {
            expect(res.statusCode).to.be.equal(400);
            expect(res.body[0].message.trim()).to.be.equal("Missing parameter greeting in query.");
            done();
        });
  });
});
