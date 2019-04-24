import * as jsonapiSerializer from "jsonapi-serializer";

export const cinemaSerializer = new jsonapiSerializer.Serializer("cinemas", {
  attributes: ["name"]
});
