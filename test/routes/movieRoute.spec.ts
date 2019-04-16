import chaiHttp = require("chai-http");
import { initApp } from "../../src/application";
import * as chai from "chai";
import { myContainer } from "../../src/inversify/inversify.config";
import "mocha";

const expect = chai.expect;
chai.use(chaiHttp);
const app = initApp(myContainer);

// class DummyMovieRepository implements IMovieRepository {

//   private testMovies = [{
//     id: "3",
//     title: "xXx: Reactivado",
//     format: "IMAX",
//     released_at: "2018-12-01T00:00:00Z"
//   }, {
//     id: "4",
//     title: "Resident Evil: Capitulo Final",
//     format: "IMAX",
//     released_at: "2018-12-01T00:00:00Z"
//   }, {
//     id: "1",
//     title: "Assasins Creed",
//     format: "IMAX",
//     released_at: "2018-12-01T00:00:00Z"
//   }];

//   public async getAllMovies(): P<any[]> {
//     const results = await mysql.query("SELECT id, title, runtime, format, plot, DATE_FORMAT(released_at, \'%Y-%m-%dT%TZ\') as released_at FROM movie");

//     await mysql.end();

//     return results;
//   }

//   public async getMoviePremieres(): P<any[]> {
//     // const currentDay = new Date();
//     const results = await mysql.query("SELECT id, title, runtime, format, plot, DATE_FORMAT(released_at, \'%Y-%m-%dT%TZ\') as released_at FROM movie");
//     console.log(results);
//     await mysql.end();

//     return results;
//   }

//   public async getMovieById(id: string): P<any> {
//     const results = await mysql.query(
//       "SELECT id, title, runtime, format, plot, DATE_FORMAT(released_at, \'%Y-%m-%dT%TZ\') as released_at FROM movie WHERE id = ?",
//       [id]
//     );

//     await mysql.end();

//     return results;
//   }
// }

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
