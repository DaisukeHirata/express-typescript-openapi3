import chaiHttp = require("chai-http");
import app from "../../src/application";
import * as chai from "chai";

const expect = chai.expect;
chai.use(chaiHttp);

describe("Movies API", function () {
  it("should return all movies", (done: () => void): void => {
    chai.request(app)
      .get("/api/movies")
      .set("content-type", "application/json")
      .send({})
      .end((err: Error, res: any): void => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.data).to.deep.include(
          {
            "type": "movies",
            "id": "1",
            "attributes": {
              "title": "AAA",
              "runtime": 101,
              "format": "IMAX",
              "plot": "plot 1",
              "released-at": "2015-04-01T00:00:00Z"
            }
          }
        );
        done();
      });
  });

  it("should get movie premieres", (done: () => void): void => {
    chai.request(app)
      .get("/api/movies/premieres")
      .set("content-type", "application/json")
      .send({})
      .end((err: Error, res: any): void => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.data).to.deep.include(
          {
            "type": "movies",
            "id": "1",
            "attributes": {
              "title": "AAA",
              "runtime": 101,
              "format": "IMAX",
              "plot": "plot 1",
              "released-at": "2015-04-01T00:00:00Z"
            }
          }
        );
        done();
      });
  });

  it("should return 200 for an known movie", (done: () => void): void => {
    chai.request(app)
      .get("/api/movies/1")
      .set("content-type", "application/json")
      .send({})
      .end((err: Error, res: any): void => {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body.data).to.deep.include(
          {
            "type": "movies",
            "id": "1",
            "attributes": {
              "title": "AAA",
              "runtime": 101,
              "format": "IMAX",
              "plot": "plot 1",
              "released-at": "2015-04-01T00:00:00Z"
            }
          }
        );
        done();
      });
  });
});
