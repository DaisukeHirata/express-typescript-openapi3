import * as jsonapiSerializer from "jsonapi-serializer";

export const movieSerializer = new jsonapiSerializer.Serializer("movies", {
  attributes: ["title", "runtime", "format", "plot", "released_at"]
});

export const errorSerializer = jsonapiSerializer.Error;
