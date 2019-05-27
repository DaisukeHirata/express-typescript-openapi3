import * as jsonapiSerializer from "jsonapi-serializer";

export const cinemaSerializer = new jsonapiSerializer.Serializer("cinemas", {
  attributes: ["name", "latitude", "longitude"]
});

export const cinemaPremieresByIdSerializer = new jsonapiSerializer.Serializer("cinemaPremieresById", {
  attributes: ["name", "latitude", "longitude", "movies"],
  movies: {
    ref: (cinema, movie) => {
      return movie.id;
    },
    attributes: ["title", "genre", "runtime", "plot", "poster"]
  }
});

export const cinemaSchedulesSerializer = new jsonapiSerializer.Serializer("cinemaSchedulesSerializer", {
  attributes: ["name", "latitude", "longitude", "movies", "rooms"],
  movies: {
    ref: (cinema, movies) => {
      return movies.id;
    },
    attributes: ["title", "genre", "runtime", "format", "plot", "released-at"]
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
