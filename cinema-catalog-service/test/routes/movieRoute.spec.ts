// import "mocha";
// import chaiHttp = require("chai-http");
// import * as chai from "chai";
// import { initApp } from "../../src/application";
// import { testContainer } from "../inversify.test.config";

// const expect = chai.expect;
// chai.use(chaiHttp);

// describe("Movies API", function () {
//   let app = null;

//   beforeEach(() => {
//     app = initApp(testContainer);
//   });

//   afterEach(() => {
//     app = null;
//   });

//   it("should return all movies", (done: () => void): void => {
//     this.timeout(20000);
//     chai.request(app)
//       .get("/api/movies")
//       .set("content-type", "application/json")
//       .send({})
//       .end((err: Error, res: any): void => {
//         expect(res.statusCode).to.be.equal(200);
//         expect(res.body.data).to.deep.include(
//           {
//             "type": "movies",
//             "id": "1",
//             "attributes": {
//               "title": "Assasins Creed",
//               "runtime": 100,
//               "format": "IMAX",
//               "plot": "Lorem ipsum dolor sit amet",
//               "released-at": "2018-12-01T00:00:00Z"
//             }
//           }
//         );
//         done();
//       });
//   });

//   it("should get movie premieres", (done: () => void): void => {
//     chai.request(app)
//       .get("/api/movies/premieres")
//       .set("content-type", "application/json")
//       .send({})
//       .end((err: Error, res: any): void => {
//         expect(res.statusCode).to.be.equal(200);
//         expect(res.body.data).to.deep.include(
//           {
//             "type": "movies",
//             "id": "1",
//             "attributes": {
//               "title": "Assasins Creed",
//               "runtime": 100,
//               "format": "IMAX",
//               "plot": "Lorem ipsum dolor sit amet",
//               "released-at": "2018-12-01T00:00:00Z"
//             }
//           }
//         );
//         done();
//       });
//   });

//   it("should return 200 for an known movie", (done: () => void): void => {
//     chai.request(app)
//       .get("/api/movies/1")
//       .set("content-type", "application/json")
//       .send({})
//       .end((err: Error, res: any): void => {
//         expect(res.statusCode).to.be.equal(200);
//         expect(res.body.data).to.deep.include(
//           {
//             "type": "movies",
//             "id": "1",
//             "attributes": {
//               "title": "Assasins Creed",
//               "runtime": 100,
//               "format": "IMAX",
//               "plot": "Lorem ipsum dolor sit amet",
//               "released-at": "2018-12-01T00:00:00Z"
//             }
//           }
//         );
//         done();
//       });
//   });
// });
