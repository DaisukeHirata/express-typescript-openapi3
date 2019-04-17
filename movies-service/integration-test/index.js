/* eslint-env mocha */
const supertest = require("supertest")

describe("movies-service", () => {
  const api = supertest("http://localhost:8001/api")
  it("returns a 200 for a known movies", (done) => {
    api.get("/movies/premieres")
      .expect(200, done)
  })
})