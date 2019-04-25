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

export const cinemaSchedulesSerializer = new jsonapiSerializer.Serializer("cinemaSchedulesSerializer", {
  attributes: ["name", "movie", "rooms"],
  movie: {
    ref: (cinema, movie) => {
      return movie.id;
    },
    attributes: ["title", "runtime", "format", "plot", "released-at"]
  },
  rooms: {
    ref: (cinema, rooms) => {
      return rooms.id;
    },
    attributes: ["name", "schedules"]
  },
  typeForAttribute: (attribute, record) => {
    if (attribute === "movie") { return "movies"; }
    return (record && record.type) ? record.type : attribute;
  }
});

export const cinemaDeserializer =  new jsonapiSerializer.Deserializer();
