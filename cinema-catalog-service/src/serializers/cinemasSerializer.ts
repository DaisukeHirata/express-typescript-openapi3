import * as jsonapiSerializer from "jsonapi-serializer";

export const cinemaSerializer = new jsonapiSerializer.Serializer("cinemas", {
  attributes: ["name"]
});

export const cinemaPremieresByIdSerializer = new jsonapiSerializer.Serializer("cinemaPremieresById", {
  attributes: ["name", "movies"],
  movies: {
    ref: (cinema, movie) => {
      return movie.id;
    },
    attributes: ["title", "runtime", "plot", "poster"]
  },
  typeForAttribute: (attribute, record) => {
    return (record && record.type) ? record.type : attribute;
  }
});

export const cinemaDeserializer =  new jsonapiSerializer.Deserializer();
